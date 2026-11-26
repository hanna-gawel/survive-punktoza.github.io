import { useEffect, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  ExternalLink,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  ACADEMIC_LIFE_FLASHES,
  ActionId,
  CAREER_TRACKS,
  CareerTrack,
  ENDINGS_CATALOG,
  EndingId,
  getActionsForTrack,
  GOAL_POINTS,
  MIDTERM_THRESHOLD,
  STORAGE_KEY_ENDINGS,
} from './data/simulationData';
import { CollectionModal } from './components/CollectionModal';
import { ActiveTwist, EventModal } from './components/EventModal';
import { GlossaryModal } from './components/GlossaryModal';
import { HiddenPrizeModal, PRIZE_THRESHOLD } from './components/HiddenPrizeModal';
import { ResultView } from './components/ResultView';
import { playTone } from './utils/sound';

type ScreenState = 'INTRO' | 'PLAYING' | 'RESULT';

const TOTAL_BALLS = 4;
const STORAGE_KEY_OA_WEEK = 'punktoza_oa_week_found_v1';
const STORAGE_KEY_CHRISTMAS = 'punktoza_christmas_dinner_v1';
const STORAGE_KEY_GUERRILLA = 'punktoza_guerrilla_oa_v1';

interface GameState {
  ballsLeft: number;
  points: number;
  visibility: number;
  credibility: number;
  knowledgePoints: number;
  picks: ActionId[];
  darkArtsUsed: string[];
  hasPreprint: boolean;
  has140: boolean;
  hasPaywall200: boolean;
  hasSpecial140: boolean;
  hasMonograph: boolean;
  hasSlowFormat: boolean;
  hasSalami: number;
  year1TwistResolved: boolean;
  isClone: boolean;
  usedTunnelVision: boolean;
  sabbaticalResolved: boolean;
  managerPracticumResolved: boolean;
  tookAdminRetreat: boolean;
  wasGatekeeper: boolean;
  usedArbitrage: boolean;
  isSubsidizer: boolean;
  nerfed: boolean;
  passedMidterm: boolean;
  wasLaundered: boolean;
  scoopResolved: boolean;
  wasScooped: boolean;
  specialDelisted: boolean;
  wasDelisted: boolean;
  year3TwistResolved: boolean;
  joinedCartel: boolean;
  oaWeekFound: boolean;
  christmasDinnerFound: boolean;
  guerrillaOaFound: boolean;
  cheatUnlocked: boolean;
}

const INITIAL_GAME: GameState = {
  ballsLeft: TOTAL_BALLS,
  points: 0,
  visibility: 0,
  credibility: 100,
  knowledgePoints: 0,
  picks: [],
  darkArtsUsed: [],
  hasPreprint: false,
  has140: false,
  hasPaywall200: false,
  hasSpecial140: false,
  hasMonograph: false,
  hasSlowFormat: false,
  hasSalami: 0,
  year1TwistResolved: false,
  isClone: false,
  usedTunnelVision: false,
  sabbaticalResolved: false,
  managerPracticumResolved: false,
  tookAdminRetreat: false,
  wasGatekeeper: false,
  usedArbitrage: false,
  isSubsidizer: false,
  nerfed: false,
  passedMidterm: false,
  wasLaundered: false,
  scoopResolved: false,
  wasScooped: false,
  specialDelisted: false,
  wasDelisted: false,
  year3TwistResolved: false,
  joinedCartel: false,
  oaWeekFound: false,
  christmasDinnerFound: false,
  guerrillaOaFound: false,
  cheatUnlocked: false,
};

interface ToastFeedback {
  lead: string;
  body: string;
  italicNote?: string;
  tone?: 'warn' | 'shield' | 'neutral';
}

function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

function addDarkArt(list: string[], label: string): string[] {
  return list.includes(label) ? list : [...list, label];
}

function loadUnlockedEndings(): EndingId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_ENDINGS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(ENDINGS_CATALOG.map((e) => e.id));
    return parsed.filter((id): id is EndingId => validIds.has(id));
  } catch {
    return [];
  }
}

function loadOaWeekEverFound(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY_OA_WEEK) === 'true';
  } catch {
    return false;
  }
}

function loadChristmasEverFound(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY_CHRISTMAS) === 'true';
  } catch {
    return false;
  }
}

function loadGuerrillaEverFound(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY_GUERRILLA) === 'true';
  } catch {
    return false;
  }
}

function resolveEndingId(g: GameState): EndingId {
  if (g.cheatUnlocked) return 'hacker';
  if (g.wasLaundered) return 'laundered';
  if (g.isSubsidizer && !g.joinedCartel && !g.usedArbitrage) {
    return 'subsidizer';
  }
  if (g.points >= GOAL_POINTS) {
    if (g.joinedCartel) return 'cartel';
    if (g.tookAdminRetreat || g.wasGatekeeper) return 'admin';
    if (g.usedArbitrage) return 'arbitrage';
    if (g.isClone) return 'clone';
    if (g.darkArtsUsed.length >= 2) return 'darkarts';
    if (g.hasPreprint && g.darkArtsUsed.length === 0) return 'hacker';
    if (g.hasPreprint) return 'hacker';
    return 'ghost';
  }
  if (g.wasDelisted) return 'delisted';
  if (g.wasScooped) return 'scooped';
  return 'fired';
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('INTRO');
  const [track, setTrack] = useState<CareerTrack>('phd');
  const [game, setGame] = useState<GameState>(INITIAL_GAME);
  const [toast, setToast] = useState<ToastFeedback | null>(null);
  const [activeTwist, setActiveTwist] = useState<ActiveTwist | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [unlockedEndings, setUnlockedEndings] = useState<EndingId[]>(() =>
    loadUnlockedEndings()
  );
  const [oaWeekEverFound, setOaWeekEverFound] = useState<boolean>(() =>
    loadOaWeekEverFound()
  );
  const [christmasDinnerEverFound, setChristmasDinnerEverFound] =
    useState<boolean>(() => loadChristmasEverFound());
  const [guerrillaOaEverFound, setGuerrillaOaEverFound] = useState<boolean>(
    () => loadGuerrillaEverFound()
  );
  const [isNewUnlock, setIsNewUnlock] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showHiddenPrize, setShowHiddenPrize] = useState(false);
  const [openInfraMode, setOpenInfraMode] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearPendingTimers();
  }, []);

  // Lock background scroll while any modal/bottom-sheet is open on mobile/tablet
  const isAnyModalOpen =
    !!activeTwist || showCollection || showGlossary || showHiddenPrize;
  useEffect(() => {
    if (!isAnyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isAnyModalOpen]);

  // Smoothly return to top when switching screens on phones
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen]);

  const scheduleTimer = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const triggerShake = () => {
    setIsShaking(true);
    scheduleTimer(() => setIsShaking(false), 500);
  };

  const recordUnlockedEnding = (endingId: EndingId) => {
    setUnlockedEndings((prev) => {
      if (prev.includes(endingId)) {
        setIsNewUnlock(false);
        return prev;
      }
      const next = [...prev, endingId];
      setIsNewUnlock(true);
      try {
        window.localStorage.setItem(STORAGE_KEY_ENDINGS, JSON.stringify(next));
      } catch {
        // Ignore storage quota / private-mode errors
      }
      // Auto-celebrate the exact moment a player reaches the 8-ending Hidden Prize!
      if (prev.length < PRIZE_THRESHOLD && next.length >= PRIZE_THRESHOLD) {
        scheduleTimer(() => {
          playTone('hack', muted);
          setShowHiddenPrize(true);
        }, 650);
      }
      return next;
    });
  };

  const finishCycle = (finalState: GameState) => {
    const endingId = resolveEndingId(finalState);
    if (endingId === 'hacker') {
      playTone('hack', muted);
    } else if (
      endingId === 'ghost' ||
      endingId === 'cartel' ||
      endingId === 'darkarts' ||
      endingId === 'clone' ||
      endingId === 'admin' ||
      endingId === 'arbitrage'
    ) {
      playTone('win', muted);
    } else {
      playTone('fail', muted);
    }
    recordUnlockedEnding(endingId);
    setScreen('RESULT');
  };

  const startGame = (nextTrack?: CareerTrack) => {
    const chosenTrack = nextTrack ?? track;
    if (nextTrack && nextTrack !== track) {
      setTrack(nextTrack);
    }
    clearPendingTimers();
    const startingState: GameState = openInfraMode
      ? {
          ...INITIAL_GAME,
          hasPreprint: true,
          knowledgePoints: 50,
          visibility: 40,
        }
      : INITIAL_GAME;
    setGame(startingState);
    if (nextTrack && nextTrack !== track) {
      setToast({
        lead: `🔄 Switched to ${CAREER_TRACKS[chosenTrack].label}!`,
        body: openInfraMode
          ? 'Fresh 4-year cycle started with Open Infrastructure Mode active.'
          : CAREER_TRACKS[chosenTrack].stakesNote,
        tone: 'shield',
      });
    } else {
      setToast(
        openInfraMode
          ? {
              lead: '🏛️ Open Infrastructure Mode Active!',
              body: 'Preprints are built-in open infrastructure: DOI Priority Shield, +50 KP, and +100 Ministry recognition for Preprints & Slow Formats!',
              tone: 'shield',
            }
          : null
      );
    }
    setActiveTwist(null);
    setIsShaking(false);
    setIsNewUnlock(false);
    setScreen('PLAYING');
    playTone('pick', muted);
  };

  const handleResetCollection = () => {
    setUnlockedEndings([]);
    setOaWeekEverFound(false);
    setChristmasDinnerEverFound(false);
    setGuerrillaOaEverFound(false);
    setOpenInfraMode(false);
    setShowHiddenPrize(false);
    setIsNewUnlock(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY_ENDINGS);
      window.localStorage.removeItem(STORAGE_KEY_OA_WEEK);
      window.localStorage.removeItem(STORAGE_KEY_CHRISTMAS);
      window.localStorage.removeItem(STORAGE_KEY_GUERRILLA);
    } catch {
      // Ignore storage errors
    }
  };

  // --- HIDDEN ACADEMIC TREASURE: INTERNATIONAL OPEN ACCESS WEEK ---
  const handleDiscoverOaWeek = () => {
    if (game.oaWeekFound || activeTwist) return;
    playTone('hack', muted);
    setActiveTwist({ type: 'OA_WEEK_TREASURE' });
  };

  const handleClaimOaWeekTreasure = () => {
    playTone('hack', muted);
    setOaWeekEverFound(true);
    try {
      window.localStorage.setItem(STORAGE_KEY_OA_WEEK, 'true');
    } catch {
      // Ignore storage errors
    }

    const updated: GameState = {
      ...game,
      oaWeekFound: true,
      hasPreprint: true,
      knowledgePoints: game.knowledgePoints + 35,
      visibility: clamp(game.visibility + 25),
      credibility: clamp(game.credibility + 15),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🔓 International Open Access Week Attended! (+35 KP)',
      body: 'You gained +25% AI & Open Visibility, +15% Credibility, and a free Preprint Priority Shield (DOI)!',
      tone: 'shield',
    });

    if (screen === 'INTRO') {
      setScreen('PLAYING');
    }
  };

  const trackActions = getActionsForTrack(track);

  const handlePick = (id: ActionId) => {
    if (game.ballsLeft <= 0 || activeTwist) return;

    const actionMeta = trackActions.find((a) => a.id === id);
    if (!actionMeta) return;
    if (!actionMeta.repeatable && game.picks.includes(id)) return;

    const next: GameState = {
      ...game,
      ballsLeft: game.ballsLeft - 1,
      picks: [...game.picks, id],
    };

    let nextToast: ToastFeedback;
    let triggerScoopOnThisPick = false;
    let scoopVenueName = '';
    let scoopVenuePts = 0;

    if (id === 'preprint') {
      const infraPts = openInfraMode ? 100 : 0;
      next.hasPreprint = true;
      next.points += infraPts;
      next.knowledgePoints += 20;
      next.visibility = clamp(next.visibility + 55);
      next.credibility = clamp(next.credibility + 5);
      nextToast = {
        lead: openInfraMode
          ? '⚡ +100 Ministry Points (Open Infra!) · +20 KP · Priority Shield!'
          : '⚡ +0 Ministry Points · +20 KP · Priority Shield Active!',
        body: openInfraMode
          ? 'In a reformed system, open preprints count as first-class scholarly infrastructure.'
          : 'Your Dean frowns, but you unlocked a public timestamp (DOI) & Open-Access grant compliance.',
        tone: 'shield',
      };
    } else if (id === 'slowformat') {
      const slowPts = openInfraMode ? 120 : 20;
      next.hasSlowFormat = true;
      next.points += slowPts;
      next.knowledgePoints += 35;
      next.visibility = clamp(next.visibility + 45);
      next.credibility = clamp(next.credibility + 15);
      nextToast = {
        lead: `🧭 +${slowPts} Ministry Points · +35 Knowledge Points!`,
        body: openInfraMode
          ? 'Reformed evaluation rewards open datasets, textbooks & long-term science!'
          : 'Scholars worldwide adopt your open dataset & textbook, though the Ministry spreadsheet barely blinks.',
        tone: 'shield',
      };
    } else if (id === 'monograph') {
      next.hasMonograph = true;
      if (track === 'hybrid') {
        next.points += 115;
        next.credibility = clamp(next.credibility - 20);
        next.usedArbitrage = true;
        next.darkArtsUsed = addDarkArt(
          next.darkArtsUsed,
          'Whitepaper Laundering (NDA)'
        );
        nextToast = {
          lead: '📑 +115 pts! Corporate Whitepaper Laundered.',
          body: 'You slapped 3 pages of citations onto a paid client audit and blocked data checks behind an NDA Shield (-20% Credibility).',
          tone: 'warn',
        };
      } else {
        next.points += 120;
        next.credibility = clamp(next.credibility - 20);
        next.darkArtsUsed = addDarkArt(next.darkArtsUsed, 'Ghost Monograph');
        nextToast = {
          lead: '📚 +120 pts! Ghost Monograph printed (50 copies).',
          body: '40 copies sit in a university basement, zero citations—but the evaluation slot is filled! (-20% Credibility)',
          tone: 'warn',
        };
      }
    } else if (id === 'j140') {
      next.has140 = true;
      const ptsAdded = next.nerfed ? 40 : 140;
      next.points += ptsAdded;
      next.knowledgePoints += 5;
      next.visibility = clamp(next.visibility + 10);
      next.credibility = clamp(next.credibility - 5);

      if (next.hasPreprint && !next.scoopResolved) {
        next.scoopResolved = true;
        next.visibility = clamp(next.visibility + 15);
        next.credibility = clamp(next.credibility + 10);
        nextToast = {
          lead: `🛡️ Priority Shield Blocked Reviewer #2! (+${ptsAdded} pts)`,
          body: 'A rival tried to scoop you during peer review, but your Preprint timestamp proved you were first!',
          tone: 'shield',
        };
      } else {
        if (!next.hasPreprint && !next.scoopResolved) {
          triggerScoopOnThisPick = true;
          scoopVenueName = '140-pt International Journal';
          scoopVenuePts = ptsAdded;
        }
        nextToast = {
          lead: `📘 Submitted! +${ptsAdded} pts queued.`,
          body: 'Now waiting 18–24 months for the gatekeeper...',
          tone: 'warn',
        };
      }
    } else if (id === 'dragon200') {
      next.hasPaywall200 = true;
      next.points += 200;
      next.knowledgePoints += 5;
      next.visibility = clamp(next.visibility + 5);
      next.credibility = clamp(next.credibility - 10);

      if (next.hasPreprint && !next.scoopResolved) {
        next.scoopResolved = true;
        next.visibility = clamp(next.visibility + 15);
        next.credibility = clamp(next.credibility + 10);
        nextToast = {
          lead: '🛡️ +200 pts & Priority Shield Held!',
          body: 'The journal version is paywalled, but your Preprint beat Reviewer #2 and keeps funders & AI tools happy.',
          tone: 'shield',
        };
      } else {
        if (!next.hasPreprint && !next.scoopResolved) {
          triggerScoopOnThisPick = true;
          scoopVenueName = '200-pt Paywall Leviathan';
          scoopVenuePts = 200;
        }
        nextToast = {
          lead: '🐉 +200 pts! Huge Ministry score!',
          body: 'Locked behind a €39.95 paywall & fails Open-Access grant rules.',
          tone: 'warn',
        };
      }
    } else if (id === 'special140') {
      next.hasSpecial140 = true;
      next.points += 140;
      next.visibility = clamp(next.visibility + 15);
      next.credibility = clamp(next.credibility - 15);
      nextToast = {
        lead: '💸 +140 pts in 14 days!',
        body: 'Fastest peer review ever. €2,500 publishing fee (APC) sent to the Grant Agency...',
        tone: 'warn',
      };
    } else if (id === 'salami') {
      next.hasSalami += 1;
      next.points += 70;
      next.visibility = clamp(next.visibility + 5);
      next.credibility = clamp(next.credibility - 15);
      nextToast = {
        lead: `🍕 +70 pts! Salami Paper #${next.hasSalami} published.`,
        body: 'Zero novelty, high efficiency, -15% Credibility.',
        tone: 'warn',
      };
    } else {
      if (track === 'hybrid') {
        next.points += 45;
        next.credibility = clamp(next.credibility - 15);
        next.usedArbitrage = true;
        next.darkArtsUsed = addDarkArt(
          next.darkArtsUsed,
          '50% Tax-Break Parasite'
        );
        nextToast = {
          lead: '💼 +45 pts! 50% Tax Break (KUP) & Recycled Slides.',
          body: 'Kept your 1/4-time contract, database logins, and Dr. prestige for minimal effort (-15% Credibility).',
          tone: 'warn',
        };
      } else {
        next.points += 25;
        next.knowledgePoints += 5;
        next.visibility = clamp(next.visibility + 10);
        next.credibility = clamp(next.credibility - 10);
        nextToast = {
          lead: '✈️ +25 pts! (+5 KP)',
          body: 'Exhausted from flights & university committees (-10% Sanity).',
          tone: 'neutral',
        };
      }
    }

    playTone('pick', muted);
    setToast(nextToast);
    setGame(next);

    // Determine which plot twist triggers after this pick (at most 1 modal per turn)
    if (triggerScoopOnThisPick) {
      scheduleTimer(() => {
        playTone('nerf', muted);
        triggerShake();
        setActiveTwist({
          type: 'SCOOP_TRAP',
          targetVenueName: scoopVenueName,
          targetVenuePts: scoopVenuePts,
          ballsAvailable: next.ballsLeft,
        });
      }, 360);
    } else if (next.ballsLeft === 3 && !next.year1TwistResolved) {
      // Year 1 Lifecycle Storyline Twist
      scheduleTimer(() => {
        playTone('pick', muted);
        if (track === 'phd') {
          setActiveTwist({ type: 'LIFECYCLE_CLONE' });
        } else if (track === 'senior') {
          setActiveTwist({ type: 'LIFECYCLE_TUNNEL_VISION' });
        } else {
          setActiveTwist({ type: 'HYBRID_NDA_WHITEPAPER' });
        }
      }, 360);
    } else if (next.ballsLeft <= 2 && !next.nerfed) {
      // Year 2 Checkpoint + Overnight Patch + Slot Laundering / Mercenary / 50% KUP
      scheduleTimer(() => {
        playTone('nerf', muted);
        const passedMidterm = next.points >= MIDTERM_THRESHOLD;
        const lost100 = next.has140;
        const patchedState: GameState = {
          ...next,
          nerfed: true,
          passedMidterm,
          points: lost100 ? Math.max(0, next.points - 100) : next.points,
          credibility: passedMidterm
            ? next.credibility
            : clamp(next.credibility - 15),
        };
        if (lost100 || !passedMidterm) {
          triggerShake();
        }
        setGame(patchedState);
        setActiveTwist({
          type: 'MIDTERM_AND_PATCH',
          lost100OnPatch: lost100,
          passedMidterm,
        });
      }, 360);
    } else if (
      next.ballsLeft <= 1 &&
      next.hasSpecial140 &&
      !next.specialDelisted
    ) {
      scheduleTimer(() => {
        playTone('nerf', muted);
        triggerShake();
        const delistedState: GameState = {
          ...next,
          specialDelisted: true,
          wasDelisted: true,
          points: Math.max(0, next.points - 120),
        };
        setGame(delistedState);
        setActiveTwist({
          type: 'DELIST_APC',
        });
      }, 360);
    } else if (next.ballsLeft === 1 && !next.year3TwistResolved) {
      // Year 3 Lifecycle & Dark Arts Climax
      scheduleTimer(() => {
        playTone('pick', muted);
        if (track === 'senior') {
          setActiveTwist({ type: 'LIFECYCLE_ADMIN_GATEKEEPER' });
        } else if (track === 'hybrid') {
          setActiveTwist({ type: 'HYBRID_ARBITRAGE_SUBSIDIZER' });
        } else if (next.hasSlowFormat || next.hasSalami > 0) {
          setActiveTwist({ type: 'DARK_ARTS_FRANKENSTEIN' });
        } else if (
          next.hasMonograph ||
          next.has140 ||
          next.picks.includes('conf')
        ) {
          setActiveTwist({ type: 'DARK_ARTS_TOURISM' });
        } else {
          setActiveTwist({ type: 'CARTEL_OFFER' });
        }
      }, 360);
    } else if (next.ballsLeft === 0) {
      scheduleTimer(() => {
        finishCycle(next);
      }, 420);
    }
  };

  // --- YEAR 1 LIFECYCLE HANDLERS ---

  const handleCloneAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 60,
      credibility: clamp(game.credibility - 15),
      year1TwistResolved: true,
      isClone: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Pre-Defense Clone'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🧬 Pre-Defense "Clone" Mode Activated! (+60 pts)',
      body: 'Your supervisor beams with pride—zero originality, safe stipend (-15% Credibility).',
      tone: 'warn',
    });
  };

  const handleCloneInnovate = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 25,
      visibility: clamp(game.visibility + 15),
      credibility: clamp(game.credibility + 10),
      year1TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '💡 Kept Original Research Instincts! (+25 KP · +15% AI & Open)',
      body: 'Zero instant points, and your supervisor looks nervous about external reviewers.',
      tone: 'shield',
    });
  };

  const handleTunnelVisionAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 75,
      credibility: clamp(game.credibility - 20),
      year1TwistResolved: true,
      usedTunnelVision: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Habilitation Tunnel Vision'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🎯 Habilitation Tunnel Vision Locked! (+75 pts)',
      body: 'Dropped student mentorship & outreach to grind the RDN checklist (-20% Credibility).',
      tone: 'warn',
    });
  };

  const handleTunnelVisionMentor = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 30,
      visibility: clamp(game.visibility + 10),
      credibility: clamp(game.credibility + 15),
      year1TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🌱 Mentored Students & Read Across Fields! (+30 KP)',
      body: 'Real academic impact (+15% Credibility), zero spreadsheet points.',
      tone: 'shield',
    });
  };

  const handleHybridNdaAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 85,
      credibility: clamp(game.credibility - 25),
      year1TwistResolved: true,
      usedArbitrage: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'The NDA Shield'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🛡️ "NDA Shield" Deployed! (+85 pts)',
      body: 'Blocked reviewers from seeing raw corporate data behind client confidentiality (-25% Credibility).',
      tone: 'warn',
    });
  };

  const handleHybridWhitepaperAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 75,
      credibility: clamp(game.credibility - 20),
      year1TwistResolved: true,
      usedArbitrage: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Whitepaper Laundering'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '📑 Whitepaper Laundered! (+75 pts)',
      body: 'Double-dipped a paid commercial report as "original research" (-20% Credibility).',
      tone: 'warn',
    });
  };

  const handleHybridOpenData = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 30,
      visibility: clamp(game.visibility + 20),
      credibility: clamp(game.credibility + 15),
      year1TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🔓 Shared Anonymized Open Data & Code! (+30 KP)',
      body: 'Transparent methodology & +20% AI Visibility—no NDA smoke screen.',
      tone: 'shield',
    });
  };

  // --- SCOOP, MID-TERM & DELISTING HANDLERS ---

  const handleScoopBurnBall = () => {
    playTone('nerf', muted);
    const updated: GameState = {
      ...game,
      ballsLeft: Math.max(0, game.ballsLeft - 1),
      credibility: clamp(game.credibility - 20),
      scoopResolved: true,
      wasScooped: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🔥 Burned 1 Action Ball on Major Revisions!',
      body: 'Points salvaged, but 6 months of crunch cost -20% Sanity.',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  const handleScoopWithdraw = () => {
    playTone('fail', muted);
    const lostPts = activeTwist?.targetVenuePts ?? 140;
    const withdrew140 = activeTwist?.targetVenueName?.includes('140');
    const updated: GameState = {
      ...game,
      points: Math.max(0, game.points - lostPts),
      has140: withdrew140 ? false : game.has140,
      hasPaywall200: !withdrew140 ? false : game.hasPaywall200,
      credibility: clamp(game.credibility - 15),
      scoopResolved: true,
      wasScooped: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: `⏰ Scooped! Withdrew manuscript (-${lostPts} pts).`,
      body: 'You saved your Action Ball, but lost priority to the rival lab.',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  const handleAcceptMidtermPatch = () => {
    setActiveTwist(null);
    if (game.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(game), 320);
    } else if (track === 'senior' && !game.sabbaticalResolved) {
      scheduleTimer(() => {
        playTone('hack', muted);
        setActiveTwist({ type: 'SENIOR_SABBATICAL' });
      }, 280);
    } else if (track === 'hybrid' && !game.managerPracticumResolved) {
      scheduleTimer(() => {
        playTone('pick', muted);
        setActiveTwist({ type: 'HYBRID_MANAGER_PRACTICUM' });
      }, 280);
    }
  };

  const handleAcceptSlotLaundering = () => {
    const updated: GameState = {
      ...game,
      wasLaundered: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Slot Laundering (N-Number)'),
    };
    setGame(updated);
    setActiveTwist(null);
    finishCycle(updated);
  };

  const handleAcceptTaxBreakParasite = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 60,
      credibility: clamp(game.credibility - 20),
      usedArbitrage: true,
      darkArtsUsed: addDarkArt(
        game.darkArtsUsed,
        '50% KUP / Prestige Parasite'
      ),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '💼 50% Tax-Break (KUP) Fractional Deal Signed! (+60 pts)',
      body: 'Recycled lectures, university database logins & Dr. prestige secured (-20% Credibility).',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    } else if (track === 'hybrid' && !updated.managerPracticumResolved) {
      scheduleTimer(() => {
        playTone('pick', muted);
        setActiveTwist({ type: 'HYBRID_MANAGER_PRACTICUM' });
      }, 320);
    }
  };

  // --- SENIOR SABBATICAL, HIDDEN CHRISTMAS DINNER & HYBRID BOSS PRACTICUM HANDLERS ---

  const handleSabbaticalRestoreBall = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      ballsLeft: Math.min(TOTAL_BALLS, game.ballsLeft + 1),
      credibility: clamp(game.credibility + 25),
      knowledgePoints: game.knowledgePoints + 20,
      sabbaticalResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🌴 Academic Sabbatical! +1 Action Ball Reclaimed & Energy Restored!',
      body: 'You withdrew 1 spent Action Ball back to your pouch, gained +25% Credibility/Energy & +20 KP.',
      tone: 'shield',
    });
  };

  const handleSabbaticalOpenWrite = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 80,
      knowledgePoints: game.knowledgePoints + 30,
      visibility: clamp(game.visibility + 25),
      hasPreprint: true,
      sabbaticalResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '⚡ Sabbatical Open Synthesis Published! (+80 pts · +30 KP)',
      body: 'Rested mind, +25% AI & Open Visibility, and a free Preprint Priority Shield (DOI)!',
      tone: 'shield',
    });
  };

  const handleDiscoverChristmasDinner = () => {
    if (game.christmasDinnerFound || activeTwist) return;
    playTone('hack', muted);
    setActiveTwist({ type: 'CHRISTMAS_DINNER' });
  };

  const handleChristmasWisdomOpen = () => {
    playTone('hack', muted);
    setChristmasDinnerEverFound(true);
    try {
      window.localStorage.setItem(STORAGE_KEY_CHRISTMAS, 'true');
    } catch {
      // Ignore storage errors
    }
    const updated: GameState = {
      ...game,
      christmasDinnerFound: true,
      hasPreprint: true,
      knowledgePoints: game.knowledgePoints + 30,
      credibility: clamp(game.credibility + 20),
      visibility: clamp(game.visibility + 15),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🥟 Christmas Dumpling Wisdom Received! (+30 KP · +20% Credibility)',
      body: 'Your senior colleague’s advice activated a free Preprint Priority Shield (DOI) & +15% AI Visibility!',
      tone: 'shield',
    });
  };

  const handleChristmasCollabPaper = () => {
    playTone('win', muted);
    setChristmasDinnerEverFound(true);
    try {
      window.localStorage.setItem(STORAGE_KEY_CHRISTMAS, 'true');
    } catch {
      // Ignore storage errors
    }
    const updated: GameState = {
      ...game,
      christmasDinnerFound: true,
      points: game.points + 45,
      knowledgePoints: game.knowledgePoints + 15,
      credibility: clamp(game.credibility + 10),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🤝 Symposium Essay Co-Authored Over Dumplings! (+45 pts · +15 KP)',
      body: 'Rare, genuine Institute mentorship (+10% Credibility).',
      tone: 'shield',
    });
  };

  // --- EXTRA REWARD: HONORARY SCI-HUB GUERRILLA OPEN-ACCESS USER ---

  const handleDiscoverGuerrillaOa = () => {
    if (game.guerrillaOaFound || activeTwist) return;
    playTone('hack', muted);
    setActiveTwist({ type: 'GUERRILLA_OA_AWARD' });
  };

  const handleGuerrillaOaAccept = () => {
    playTone('hack', muted);
    setGuerrillaOaEverFound(true);
    try {
      window.localStorage.setItem(STORAGE_KEY_GUERRILLA, 'true');
    } catch {
      // Ignore storage errors
    }
    const updated: GameState = {
      ...game,
      guerrillaOaFound: true,
      knowledgePoints: game.knowledgePoints + 25,
      visibility: clamp(game.visibility + 20),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🗝️ Honorary Sci-Hub Guerrilla Open-Access User Unlocked! (+25 KP)',
      body: 'The Raven & Key emblem is now stamped on your Trainer Card (+20% AI & Open).',
      tone: 'shield',
    });
  };

  const handleGuerrillaOaAdvocate = () => {
    playTone('hack', muted);
    setGuerrillaOaEverFound(true);
    try {
      window.localStorage.setItem(STORAGE_KEY_GUERRILLA, 'true');
    } catch {
      // Ignore storage errors
    }
    const updated: GameState = {
      ...game,
      guerrillaOaFound: true,
      hasPreprint: true,
      knowledgePoints: game.knowledgePoints + 35,
      visibility: clamp(game.visibility + 20),
      credibility: clamp(game.credibility + 10),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🗝️ Honorary Sci-Hub Guerrilla OA Award + Open Preprints! (+35 KP)',
      body: 'Raven & Key Award claimed (+20% AI & Open · +10% Credibility · Free Preprint Shield)!',
      tone: 'shield',
    });
  };

  const handleManagerSignBlindly = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 90,
      credibility: clamp(game.credibility - 30),
      usedArbitrage: true,
      managerPracticumResolved: true,
      darkArtsUsed: addDarkArt(
        game.darkArtsUsed,
        'Rubber-Stamped Boss Practicum'
      ),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🤝 Rubber-Stamped Your Corporate Boss’s Practicum (+90 pts)',
      body: 'Monday’s performance review is safe—academic integrity took a -30% Credibility hit.',
      tone: 'warn',
    });
  };

  const handleManagerEnforceRigor = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 40,
      credibility: clamp(game.credibility + 25),
      visibility: clamp(game.visibility + 15),
      managerPracticumResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🎓 Made Your Corporate Boss Teach & Grade! (+40 KP · +25% Credibility)',
      body: 'Tense Monday standup—legendary respect from students and colleagues!',
      tone: 'shield',
    });
  };

  const handleManagerOpenWorkshop = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 55,
      knowledgePoints: game.knowledgePoints + 25,
      credibility: clamp(game.credibility + 10),
      visibility: clamp(game.visibility + 15),
      managerPracticumResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '📊 Co-Led an Anonymized Open Case Seminar! (+55 pts · +25 KP)',
      body: 'You banned the sales pitch and bridged industry & academia with real rigor (+10% Credibility).',
      tone: 'shield',
    });
  };

  const handleDelistVoucherEconomy = () => {
    playTone('nerf', muted);
    const updated: GameState = {
      ...game,
      credibility: clamp(game.credibility - 25),
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Review-Voucher Economy'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🎟️ Review-Voucher Economy Activated (-25% Credibility).',
      body: 'You churned 10 rushed 48h peer reviews to shave off the delisted journal fee.',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  const handleDelistApcLaunderingGrant = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 60,
      credibility: clamp(game.credibility - 30),
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'APC-Laundering Grant'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🏦 APC-Laundering Grant Approved! (+60 pts salvaged)',
      body: 'Half-finished research funded purely to cover publishing fees (-30% Credibility).',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  const handleDelistRetract = () => {
    playTone('fail', muted);
    const updated: GameState = {
      ...game,
      points: Math.max(0, game.points - 20),
      credibility: clamp(game.credibility - 10),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '📄 Paper retracted (-20 remaining pts).',
      body: 'You refused dark arts and saved €2,500, though you lost an Action Ball.',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  // --- YEAR 3 DARK ARTS & LIFECYCLE HANDLERS ---

  const handleCartelAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 120,
      credibility: clamp(game.credibility - 45),
      year3TwistResolved: true,
      joinedCartel: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Guest Editor Quid Pro Quo'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🃏 Guest Editor Quid Pro Quo Signed! +120 Ministry Points!',
      body: 'Special Issue slots traded across universities — Credibility tanked (-45%).',
      tone: 'warn',
    });
  };

  const handleCartelDecline = () => {
    playTone('pick', muted);
    const updated: GameState = {
      ...game,
      credibility: clamp(game.credibility + 10),
      knowledgePoints: game.knowledgePoints + 10,
      year3TwistResolved: true,
      joinedCartel: false,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '✓ Declined Quid Pro Quo (+10% Credibility · +10 KP).',
      body: '1 Action Ball left for Year 4 — finish strong!',
      tone: 'shield',
    });
  };

  const handleTourismAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 100,
      credibility: clamp(game.credibility - 30),
      year3TwistResolved: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Discipline Tourism'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🗺️ Discipline Tourism Complete! +100 Ministry Points!',
      body: 'Your sociology draft is now officially "Engineering & Management" (-30% Credibility).',
      tone: 'warn',
    });
  };

  const handleFlatteryAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 65,
      credibility: clamp(game.credibility - 20),
      year3TwistResolved: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Promotion-Board Flattery'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '💐 Preemptive Promotion-Board Flattery! +65 pts!',
      body: '15 irrelevant citations of senior panel professors added as review insurance (-20% Credibility).',
      tone: 'warn',
    });
  };

  const handleTourismDecline = () => {
    playTone('pick', muted);
    const updated: GameState = {
      ...game,
      credibility: clamp(game.credibility + 15),
      knowledgePoints: game.knowledgePoints + 15,
      year3TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '✓ Refused Bureaucratic Loopholes (+15% Credibility · +15 KP).',
      body: '1 Action Ball left for Year 4 — make it count!',
      tone: 'shield',
    });
  };

  const handleFrankensteinAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 110,
      credibility: clamp(game.credibility - 35),
      year3TwistResolved: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Frankenstein Cycle'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🧟 "Frankenstein" Habilitation Cycle Stitched! +110 pts!',
      body: '6 unrelated old papers glued under "Selected Aspects of X in the Context of Y" (-35% Credibility).',
      tone: 'warn',
    });
  };

  const handleSlowFormatDefend = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 35,
      visibility: clamp(game.visibility + 25),
      credibility: clamp(game.credibility + 15),
      year3TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🧭 Defended Slow Formats! (+35 KP · +25% AI & Open)',
      body: 'Zero extra Ministry points, but you refused to let textbooks & datasets go extinct.',
      tone: 'shield',
    });
  };

  const handleAdminRetreatAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 115,
      credibility: clamp(game.credibility - 30),
      year3TwistResolved: true,
      tookAdminRetreat: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Administrative Retreat'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🏛️ Administrative Retreat Complete! (+115 pts)',
      body: 'You became Vice-Dean and quietly outsourced actual lab output to junior staff (-30% Credibility).',
      tone: 'warn',
    });
  };

  const handleLegacyGatekeeperAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 95,
      credibility: clamp(game.credibility - 35),
      year3TwistResolved: true,
      wasGatekeeper: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Legacy Gatekeeper'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🧱 Legacy Gatekeeper Activated! (+95 pts)',
      body: 'Blocked computational methods & interdisciplinary hires to protect your 1990s turf (-35% Credibility).',
      tone: 'warn',
    });
  };

  const handleSeniorSupportJuniors = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 35,
      visibility: clamp(game.visibility + 20),
      credibility: clamp(game.credibility + 15),
      year3TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🤝 Backed Junior Scholars & Open Methods! (+35 KP)',
      body: 'Real mentorship & interdisciplinary renewal (+20% AI & Open, +15% Credibility).',
      tone: 'shield',
    });
  };

  const handleTitleArbitrageAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 105,
      credibility: clamp(game.credibility - 35),
      year3TwistResolved: true,
      usedArbitrage: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'Title Arbitrage'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '💼 Title Arbitrage Activated! (+105 pts)',
      body: 'Charged premium corporate fees with your Dr. title while dismissing methodology on campus (-35% Credibility).',
      tone: 'warn',
    });
  };

  const handleSubsidizerAccept = () => {
    playTone('pick', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 55,
      knowledgePoints: game.knowledgePoints + 15,
      credibility: clamp(game.credibility - 10),
      year3TwistResolved: true,
      isSubsidizer: true,
      darkArtsUsed: addDarkArt(game.darkArtsUsed, 'The Subsidizer Trap'),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🪙 Self-Funded Research from Corporate Salary (+55 pts · +15 KP)',
      body: 'Generous—yet quietly absorbing unpaid overtime helps universities avoid reforming unlivable pay.',
      tone: 'warn',
    });
  };

  const handleHybridReformRefuse = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      knowledgePoints: game.knowledgePoints + 25,
      credibility: clamp(game.credibility + 15),
      year3TwistResolved: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '⚖️ Demanded Fair Pay & Methodological Rigor (+25 KP)',
      body: 'No arbitrage, no unpaid subsidizing—1 Action Ball left for Year 4!',
      tone: 'shield',
    });
  };

  const handleUnlockCheat = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      cheatUnlocked: true,
      hasPreprint: true,
      knowledgePoints: Math.max(25, game.knowledgePoints + 20),
    };
    setGame(updated);
    recordUnlockedEnding('hacker');
  };

  // Derived HUD metrics
  const progressPct = Math.min(
    100,
    Math.round((game.points / GOAL_POINTS) * 100)
  );
  const currentYear = Math.min(TOTAL_BALLS, TOTAL_BALLS - game.ballsLeft + 1);
  const clampedVisibility = clamp(game.visibility);
  const clampedCredibility = clamp(game.credibility);
  const credibilityStateLabel =
    clampedCredibility >= 70
      ? 'Healthy'
      : clampedCredibility >= 40
        ? 'Strained'
        : 'Critical';

  const currentFlashIndex = Math.min(
    ACADEMIC_LIFE_FLASHES[track].length - 1,
    game.picks.length
  );
  const currentFlash = ACADEMIC_LIFE_FLASHES[track][currentFlashIndex];
  const currentEndingId = resolveEndingId(game);

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-start sm:justify-center safe-shell">
      <div className="bg-mesh-backdrop" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <main
        className={`relative z-10 w-full max-w-[520px] md:max-w-[760px] bg-[#FAF8FC] rounded-[24px] sm:rounded-[28px] px-4 py-4 sm:px-6 sm:py-6 shadow-[0_20px_50px_rgba(28,16,52,0.24)] border border-white/75 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <a
            href="https://otvorenaveda.cvtisr.sk/slovak-open-science-forum-2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] sm:text-[11.5px] font-bold tracking-[0.05em] uppercase text-[#5A5468] hover:text-[#6D44B8] transition-colors min-w-0 truncate"
          >
            <span className="truncate">
              <span className="hidden sm:inline">
                Slovak Open Science Forum 2026
              </span>
              <span className="sm:hidden">SOSF 2026</span>
            </span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-75" aria-hidden="true" />
          </a>

          <div className="flex items-center gap-1.5 shrink-0">
            {unlockedEndings.length >= PRIZE_THRESHOLD && (
              <button
                type="button"
                onClick={() => setShowHiddenPrize(true)}
                title="Open Hidden 8-Ending Sovereign Scholar Prize"
                aria-label="Open Hidden Sovereign Scholar Prize"
                className="inline-flex items-center justify-center gap-1 min-h-[40px] px-2.5 py-1.5 rounded-xl text-[11.5px] font-extrabold text-white prize-foil shadow-xs active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap"
              >
                <Award className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Prize</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowGlossary(true)}
              aria-label="Open glossary of terms, dark arts, and lifecycles"
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl text-[12px] font-bold text-[#0D8A85] bg-white/90 border border-[#E4DCF0] hover:bg-white active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Guide</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCollection(true)}
              aria-label={`Trainer Card Collection: ${unlockedEndings.length} of ${ENDINGS_CATALOG.length} endings unlocked`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl text-[12px] font-bold text-[#1C1926] bg-white/90 border border-[#E4DCF0] hover:bg-white active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap tabular-nums"
            >
              <Trophy className="w-3.5 h-3.5 text-[#E86F3A]" aria-hidden="true" />
              <span>
                {unlockedEndings.length}/{ENDINGS_CATALOG.length}
              </span>
            </button>

            {screen === 'PLAYING' && (
              <button
                type="button"
                onClick={() => startGame()}
                title="Restart Cycle"
                aria-label="Restart Cycle"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#5A5468] hover:text-[#1C1926] hover:bg-[#EDE6F7]/70 active:scale-[0.97] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#5A5468] hover:text-[#1C1926] hover:bg-[#EDE6F7]/70 active:scale-[0.97] transition-all cursor-pointer"
            >
              {muted ? (
                <VolumeX className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* SCREEN 1: INTRO */}
        {screen === 'INTRO' && (
          <section aria-labelledby="intro-title">
            {/* Conference Presentation Context Banner */}
            <div
              className="rounded-2xl p-3.5 mb-3.5 border border-[#DDD3EC]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(242,236,254,0.92) 0%, rgba(255,243,232,0.92) 55%, rgba(227,248,245,0.92) 100%)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.07em] text-[#6D44B8]">
                  Interactive Companion to the Talk
                </span>
                <a
                  href="https://otvorenaveda.cvtisr.sk/slovak-open-science-forum-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0D8A85] hover:underline"
                >
                  <span>Slovak Open Science Forum 2026</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
              <div className="text-[14px] sm:text-[15px] font-extrabold leading-[1.3] text-[#1C1926]">
                &ldquo;Preprints as Open Infrastructures: Rethinking Academic
                Dissemination, Peer Review, and Scholarly Autonomy&rdquo;
              </div>
              <div className="text-[12px] text-[#5A5468] mt-1">
                <strong className="text-[#1C1926]">dr Hanna Gaweł</strong> ·
                Institute of Information Studies, Jagiellonian University in
                Kraków
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div
                className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md text-[#1C1926]"
                style={{
                  background: 'linear-gradient(120deg, #D5B8FF, #FFBE8A, #86EAE2)',
                }}
              >
                Lifecycle Edition · {ENDINGS_CATALOG.length} Endings
              </div>
              {openInfraMode && (
                <span className="text-[11px] font-extrabold uppercase tracking-[0.05em] px-2.5 py-1 rounded-md bg-[#0D8A85] text-white">
                  ⚡ Open Infrastructure Mode ON
                </span>
              )}
            </div>

            <h1
              id="intro-title"
              className="text-[24px] sm:text-[28px] md:text-[31px] leading-[1.14] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-2 text-balance"
            >
              Academic Pokémon Go:
              <br />
              Survive Punktoza
            </h1>
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.5] text-[#5A5468] max-w-[64ch]">
              Experience firsthand why Poland&apos;s point-based evaluation (
              <strong>Punktoza</strong>) distorts dissemination, peer review,
              and scholarly autonomy—and how <strong>open preprints</strong> can
              hack the trap!
            </p>

            {/* Responsive 2-column body on tablets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4 my-4 items-stretch">
              {/* 3-Lifecycle Track selector */}
              <div className="bg-white border-[1.5px] border-[#E8E1F0] rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[12.5px] font-bold text-[#1C1926]">
                      Choose Your Lifecycle:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowGlossary(true)}
                      className="text-[12px] font-bold text-[#0D8A85] hover:underline cursor-pointer"
                    >
                      Guide &amp; Sins →
                    </button>
                  </div>
                  <div
                    className="grid grid-cols-3 gap-1 p-1 bg-[#EDE7F5] rounded-xl"
                    role="tablist"
                    aria-label="Academic Lifecycle Track"
                  >
                    {(['phd', 'senior', 'hybrid'] as CareerTrack[]).map((t) => {
                      const active = track === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setTrack(t)}
                          className={`min-h-[42px] py-2 px-1.5 rounded-lg text-[11.5px] sm:text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-white text-[#1C1926] shadow-xs'
                              : 'text-[#5A5468] hover:text-[#1C1926]'
                          }`}
                        >
                          {CAREER_TRACKS[t].shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="text-[10.5px] font-extrabold uppercase tracking-[0.06em] text-[#6D44B8] mb-0.5">
                    {CAREER_TRACKS[track].badge}
                  </div>
                  <p className="text-[12.5px] leading-[1.45] text-[#5A5468]">
                    {CAREER_TRACKS[track].stakesNote}
                  </p>
                </div>
              </div>

              {/* Rules summary */}
              <div className="bg-white border-[1.5px] border-[#E8E1F0] rounded-2xl p-3.5">
                <strong className="block text-[13px] font-bold text-[#1C1926]">
                  Your 4-Year Evaluation Rules:
                </strong>
                <ul className="mt-2 grid gap-2">
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1C1926]">
                    <span className="shrink-0" aria-hidden="true">
                      🎯
                    </span>
                    <span>
                      <strong>Goal:</strong> Hit{' '}
                      <strong>{GOAL_POINTS} Ministry Points</strong> (
                      {MIDTERM_THRESHOLD}+ by Year 2 Mid-Term) while balancing
                      Credibility &amp;{' '}
                      <strong>Knowledge Points (KP)</strong>.
                    </span>
                  </li>
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1C1926]">
                    <span className="shrink-0" aria-hidden="true">
                      🟠
                    </span>
                    <span>
                      <strong>Twists Every Year:</strong> Each track triggers
                      its own dilemmas—from cloning &amp; turf wars to NDAs
                      &amp; tax breaks.
                    </span>
                  </li>
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1C1926]">
                    <span className="shrink-0" aria-hidden="true">
                      🏆
                    </span>
                    <span>
                      <strong>Hidden Prize:</strong> Unlock{' '}
                      <strong>{PRIZE_THRESHOLD} Endings</strong> (
                      {Math.min(PRIZE_THRESHOLD, unlockedEndings.length)}/
                      {PRIZE_THRESHOLD}) to open the secret conference reward!
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startGame()}
              className="w-full min-h-[52px] rounded-[14px] py-3.5 px-5 text-[15px] sm:text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(109,68,184,0.28)] hover:brightness-[1.06] active:scale-[0.985] transition-all flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap"
              style={{
                background:
                  'linear-gradient(135deg, #221A36, #6D44B8 65%, #0D8A85)',
              }}
            >
              Start 4-Year Cycle ({CAREER_TRACKS[track].shortLabel}) →
            </button>

            <div className="text-center text-[11px] text-[#5A5468] mt-3.5 opacity-90 flex items-center justify-center gap-x-2 gap-y-1 flex-wrap">
              <span>hanna.gawel@uj.edu.pl</span>
              <span aria-hidden="true">·</span>
              <span>Bluesky: @hannagawel.bsky.social</span>
              <span aria-hidden="true">·</span>
              <span>ORCID: 0000-0001-5714-0459</span>
              <button
                type="button"
                onClick={handleDiscoverOaWeek}
                title="Psst... curious open-science scholar?"
                aria-label="Secret Open Access Week academic treasure"
                className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[12px] hover:bg-[#E3F8F5] transition-colors cursor-pointer"
              >
                🔓
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 2: GAMEPLAY */}
        {screen === 'PLAYING' && (
          <section aria-label="4-Year Evaluation Gameplay">
            {/* Compact Lifecycle Switcher directly in the second panel */}
            <div
              className={`rounded-2xl px-3 py-2 mb-2.5 border ${
                unlockedEndings.length >= 4 &&
                unlockedEndings.length < PRIZE_THRESHOLD
                  ? 'bg-gradient-to-r from-[#F2ECFE] via-[#FFF4EB] to-[#E6F8F5] border-[#C5B3EE]'
                  : 'bg-white border-[#E8E1F0]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold text-[#5A5468]">
                  {unlockedEndings.length >= 4 &&
                  unlockedEndings.length < PRIZE_THRESHOLD
                    ? '✨ 4+ Endings! Switch Lifecycle:'
                    : 'Lifecycle:'}
                </span>
                <div
                  className="grid grid-cols-3 gap-1 p-0.5 bg-[#EDE7F5] rounded-xl flex-1 sm:flex-initial sm:min-w-[280px]"
                  role="tablist"
                  aria-label="Switch Academic Lifecycle"
                >
                  {(['phd', 'senior', 'hybrid'] as CareerTrack[]).map((t) => {
                    const active = track === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          if (t !== track) {
                            startGame(t);
                          }
                        }}
                        className={`min-h-[34px] py-1 px-2 rounded-lg text-[11px] sm:text-[11.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-white text-[#1C1926] shadow-xs'
                            : 'text-[#5A5468] hover:text-[#1C1926]'
                        }`}
                      >
                        {CAREER_TRACKS[t].shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* HUD */}
            <div className="bg-white border-[1.5px] border-[#E8E1F0] rounded-2xl px-3.5 py-3 mb-3">
              <div className="flex justify-between items-center mb-2 gap-2">
                <div className="text-[15px] font-extrabold text-[#1C1926]">
                  Ministry Score:{' '}
                  <span
                    className="text-[#0D8A85] tabular-nums"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {game.points}
                  </span>{' '}
                  <span className="text-[#5A5468] font-bold tabular-nums">
                    / {GOAL_POINTS}
                  </span>
                </div>

                <div
                  className="flex items-center gap-1 text-[11.5px] font-bold text-[#5A5468]"
                  aria-label={`${game.ballsLeft} of ${TOTAL_BALLS} Action Balls remaining`}
                >
                  <span className="mr-0.5">Balls:</span>
                  {[1, 2, 3, 4].map((ballNum) => {
                    const isUsed = ballNum > game.ballsLeft;
                    return (
                      <div
                        key={ballNum}
                        className={`w-[15px] h-[15px] rounded-full border-2 border-[#1C1926] relative transition-all duration-200 ${
                          isUsed ? 'opacity-20 scale-80' : 'opacity-100 scale-100'
                        }`}
                        style={{
                          background:
                            'linear-gradient(to bottom, #F47C48 50%, #FFFFFF 50%)',
                        }}
                      >
                        <span className="absolute w-[4.5px] h-[4.5px] bg-white border-[1.5px] border-[#1C1926] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar with subtle 140-pt Mid-Term marker */}
              <div
                className="relative w-full h-2.5 bg-[#EFEAF7] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={game.points}
                aria-valuemin={0}
                aria-valuemax={GOAL_POINTS}
              >
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progressPct}%`,
                    background:
                      game.points >= GOAL_POINTS
                        ? 'linear-gradient(90deg, #0D8A85, #34D399)'
                        : 'linear-gradient(90deg, #F9844A, #9D72F3, #24B8B0)',
                  }}
                />
                {!game.nerfed && (
                  <div
                    title={`Year 2 Mid-Term Threshold (${MIDTERM_THRESHOLD} pts)`}
                    className="absolute top-0 bottom-0 w-[2px] bg-[#1C1926]/35"
                    style={{ left: '35%' }}
                  />
                )}
              </div>

              {/* 4-stat compact HUD footer */}
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mt-2 text-[11.5px] font-semibold text-[#5A5468] tabular-nums">
                <span>AI &amp; Open: {clampedVisibility}%</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#6D44B8] font-bold">
                  Knowledge: {game.knowledgePoints} KP
                </span>
                <span aria-hidden="true">·</span>
                <span
                  className={
                    clampedCredibility < 40
                      ? 'text-[#C43A2B] font-bold'
                      : clampedCredibility < 70
                        ? 'text-[#D95B26] font-bold'
                        : 'text-[#1C1926]'
                  }
                >
                  Credibility: {clampedCredibility}% ({credibilityStateLabel})
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {game.ballsLeft > 0
                    ? `Yr ${currentYear}/${TOTAL_BALLS}`
                    : 'Done'}
                </span>
              </div>

              {/* Live Academic Life Bulletin */}
              <div className="mt-2 pt-2 border-t border-[#EFEAF7] flex items-start gap-1.5 text-[11.5px] leading-[1.38] text-[#5A5468]">
                <Radio
                  className="w-3.5 h-3.5 text-[#E86F3A] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{currentFlash}</span>
              </div>

              {/* Active Preprint Shield / OA Week / Guerrilla OA status line */}
              {(game.hasPreprint ||
                game.oaWeekFound ||
                game.guerrillaOaFound) && (
                <div className="mt-1.5 pt-1.5 border-t border-[#EFEAF7] flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-bold text-[#0D8A85]">
                  {game.hasPreprint && (
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        Priority Shield Active (DOI) · Open-Access Rule Met
                      </span>
                    </span>
                  )}
                  <div className="inline-flex flex-wrap items-center gap-2">
                    {game.oaWeekFound && (
                      <span className="inline-flex items-center gap-1 text-[#6D44B8]">
                        <Sparkles
                          className="w-3 h-3 shrink-0"
                          aria-hidden="true"
                        />
                        <span>OA Week Scholar</span>
                      </span>
                    )}
                    {game.guerrillaOaFound && (
                      <span className="inline-flex items-center gap-1 text-[#B54712]">
                        <span aria-hidden="true">🗝️</span>
                        <span>Honorary Guerrilla OA</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Toast */}
            {toast && (
              <div
                role="status"
                aria-live="polite"
                className={`text-[12.5px] font-medium px-3 py-2 rounded-xl mb-2.5 border ${
                  toast.tone === 'shield'
                    ? 'bg-[#E6F8F5] border-[#8ADBD2] text-[#0C5E5A]'
                    : 'bg-[#FFF3E6] border-[#F4AE7A] text-[#6E2D0B]'
                }`}
              >
                <strong className="font-bold">{toast.lead}</strong> {toast.body}{' '}
                {toast.italicNote && <em>{toast.italicNote}</em>}
              </div>
            )}

            {/* Wild Academic Action Cards (1-col mobile, 2-col tablet/desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              {trackActions.map((item) => {
                const alreadyPicked =
                  !item.repeatable && game.picks.includes(item.id);
                const pickCount = game.picks.filter((p) => p === item.id).length;

                let badgeClasses =
                  'text-[10.5px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 tabular-nums ';
                if (item.badgeStyle === 'zero') {
                  badgeClasses += 'bg-[#E1F7F4] text-[#0B6E69]';
                } else if (item.badgeStyle === 'slow') {
                  badgeClasses += 'bg-[#E3F5FF] text-[#0B5D8A]';
                } else if (item.badgeStyle === 'high') {
                  badgeClasses += 'bg-[#1C1926] text-white';
                } else if (item.badgeStyle === 'express') {
                  badgeClasses += 'bg-[#FFEBD9] text-[#B54712]';
                } else if (item.badgeStyle === 'dark') {
                  badgeClasses += 'bg-[#EFE6FE] text-[#5B32A8]';
                } else if (item.badgeStyle === 'mid') {
                  badgeClasses += 'bg-[#F5E9FF] text-[#6D44B8]';
                } else {
                  badgeClasses += 'bg-[#E5F6F5] text-[#0D736F]';
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={
                      alreadyPicked || game.ballsLeft <= 0 || !!activeTwist
                    }
                    onClick={() => handlePick(item.id)}
                    className={`w-full min-h-[72px] bg-white border-[1.5px] border-[#E8E1F0] rounded-2xl px-3.5 py-3 flex items-start sm:items-center gap-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D44B8] ${
                      alreadyPicked || game.ballsLeft <= 0
                        ? 'opacity-45 cursor-not-allowed'
                        : 'cursor-pointer hover:border-[#B9A7EA] hover:shadow-[0_4px_14px_rgba(109,68,184,0.09)] active:scale-[0.985]'
                    }`}
                  >
                    <div
                      className={`w-[44px] h-[44px] rounded-[13px] flex items-center justify-center text-[22px] shrink-0 ${item.avatarBg}`}
                      aria-hidden="true"
                    >
                      {item.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[13.5px] sm:text-[14px] leading-snug font-extrabold text-[#1C1926]">
                          {item.name}
                          {pickCount > 0 && item.repeatable && (
                            <span className="ml-1 text-[11px] font-bold text-[#5A5468]">
                              ×{pickCount}
                            </span>
                          )}
                        </span>

                        {item.id === 'j140' && game.nerfed ? (
                          <div className="flex items-center gap-1 shrink-0 tabular-nums">
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FFE2E2] text-[#C43A2B] line-through">
                              140
                            </span>
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#C43A2B] text-white">
                              40 PTS!
                            </span>
                          </div>
                        ) : item.id === 'special140' && game.specialDelisted ? (
                          <div className="flex items-center gap-1 shrink-0 tabular-nums">
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FFE2E2] text-[#C43A2B] line-through">
                              140
                            </span>
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#D95B26] text-white">
                              DELISTED
                            </span>
                          </div>
                        ) : (
                          <span className={badgeClasses}>{item.badgeText}</span>
                        )}
                      </div>

                      <p className="text-[12px] leading-[1.38] text-[#5A5468]">
                        {alreadyPicked
                          ? 'Already attempted in this 4-year cycle.'
                          : item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtle footer with hidden Open Access Week, Christmas Dinner & Raven/Key triggers */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center">
              {!game.oaWeekFound && (
                <button
                  type="button"
                  onClick={handleDiscoverOaWeek}
                  className="text-[11px] font-semibold text-[#5A5468]/80 hover:text-[#0D8A85] transition-colors cursor-pointer"
                >
                  Tip: Open-science events happen every October 🔓
                </button>
              )}
              {game.picks.length >= 1 && !game.christmasDinnerFound && (
                <button
                  type="button"
                  onClick={handleDiscoverChristmasDinner}
                  className="text-[11px] font-semibold text-[#5A5468]/85 hover:text-[#D95B26] transition-colors cursor-pointer"
                >
                  🥟 Warm dumplings at the Institute Christmas Dinner...
                </button>
              )}
              {game.picks.length >= 1 && !game.guerrillaOaFound && (
                <button
                  type="button"
                  onClick={handleDiscoverGuerrillaOa}
                  className="text-[11px] font-semibold text-[#5A5468]/85 hover:text-[#6D44B8] transition-colors cursor-pointer"
                >
                  🗝️ Locked out of the university library VPN at 23:45...
                </button>
              )}
            </div>
          </section>
        )}

        {/* SCREEN 3: RESULTS */}
        {screen === 'RESULT' && (
          <ResultView
            summary={{
              endingId: currentEndingId,
              cheatUnlocked: game.cheatUnlocked,
              points: game.points,
              visibility: clampedVisibility,
              credibility: clampedCredibility,
              knowledgePoints: game.knowledgePoints,
              darkArtsUsed: game.darkArtsUsed,
              hasPreprint: game.hasPreprint,
              hasSalami: game.hasSalami,
              passedMidterm: game.passedMidterm,
              ncnCompliant: game.hasPreprint || game.cheatUnlocked,
              oaWeekFound: game.oaWeekFound,
              guerrillaOaFound: game.guerrillaOaFound,
              track,
              unlockedCount: unlockedEndings.length,
              isNewUnlock,
            }}
            onUnlockCheat={handleUnlockCheat}
            onPlayAgain={() => startGame()}
            onSelectTrack={(nextTrack) => setTrack(nextTrack)}
            onOpenCollection={() => setShowCollection(true)}
            onOpenPrize={() => setShowHiddenPrize(true)}
          />
        )}
      </main>

      {/* PLOT-TWIST EVENT MODAL */}
      {activeTwist && (
        <EventModal
          twist={activeTwist}
          track={track}
          hasPreprint={game.hasPreprint}
          onScoopBurnBall={handleScoopBurnBall}
          onScoopWithdraw={handleScoopWithdraw}
          onCloneAccept={handleCloneAccept}
          onCloneInnovate={handleCloneInnovate}
          onTunnelVisionAccept={handleTunnelVisionAccept}
          onTunnelVisionMentor={handleTunnelVisionMentor}
          onHybridNdaAccept={handleHybridNdaAccept}
          onHybridWhitepaperAccept={handleHybridWhitepaperAccept}
          onHybridOpenData={handleHybridOpenData}
          onAcceptMidtermPatch={handleAcceptMidtermPatch}
          onAcceptSlotLaundering={handleAcceptSlotLaundering}
          onAcceptTaxBreakParasite={handleAcceptTaxBreakParasite}
          onDelistVoucherEconomy={handleDelistVoucherEconomy}
          onDelistApcLaunderingGrant={handleDelistApcLaunderingGrant}
          onDelistRetract={handleDelistRetract}
          onCartelAccept={handleCartelAccept}
          onCartelDecline={handleCartelDecline}
          onTourismAccept={handleTourismAccept}
          onFlatteryAccept={handleFlatteryAccept}
          onTourismDecline={handleTourismDecline}
          onFrankensteinAccept={handleFrankensteinAccept}
          onSlowFormatDefend={handleSlowFormatDefend}
          onAdminRetreatAccept={handleAdminRetreatAccept}
          onLegacyGatekeeperAccept={handleLegacyGatekeeperAccept}
          onSeniorSupportJuniors={handleSeniorSupportJuniors}
          onTitleArbitrageAccept={handleTitleArbitrageAccept}
          onSubsidizerAccept={handleSubsidizerAccept}
          onHybridReformRefuse={handleHybridReformRefuse}
          onSabbaticalRestoreBall={handleSabbaticalRestoreBall}
          onSabbaticalOpenWrite={handleSabbaticalOpenWrite}
          onChristmasWisdomOpen={handleChristmasWisdomOpen}
          onChristmasCollabPaper={handleChristmasCollabPaper}
          onManagerSignBlindly={handleManagerSignBlindly}
          onManagerEnforceRigor={handleManagerEnforceRigor}
          onManagerOpenWorkshop={handleManagerOpenWorkshop}
          onClaimOaWeekTreasure={handleClaimOaWeekTreasure}
          onGuerrillaOaAccept={handleGuerrillaOaAccept}
          onGuerrillaOaAdvocate={handleGuerrillaOaAdvocate}
        />
      )}

      {/* TRAINER CARD COLLECTION MODAL */}
      {showCollection && (
        <CollectionModal
          unlocked={unlockedEndings}
          oaWeekEverFound={oaWeekEverFound}
          christmasDinnerEverFound={christmasDinnerEverFound}
          guerrillaOaEverFound={guerrillaOaEverFound}
          onOpenPrize={() => setShowHiddenPrize(true)}
          onClose={() => setShowCollection(false)}
          onResetCollection={handleResetCollection}
        />
      )}

      {/* HIDDEN 8-ENDING PRIZE MODAL */}
      {showHiddenPrize && (
        <HiddenPrizeModal
          unlockedCount={unlockedEndings.length}
          oaWeekEverFound={oaWeekEverFound}
          openInfraMode={openInfraMode}
          onToggleOpenInfraMode={() => setOpenInfraMode((v) => !v)}
          onClose={() => setShowHiddenPrize(false)}
        />
      )}

      {/* GLOSSARY MODAL */}
      {showGlossary && (
        <GlossaryModal
          oaWeekFound={game.oaWeekFound}
          onDiscoverOaWeek={handleDiscoverOaWeek}
          onClose={() => setShowGlossary(false)}
        />
      )}
    </div>
  );
}
