import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  RotateCcw,
  ShieldCheck,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  ACADEMIC_ACTIONS,
  ActionId,
  CAREER_TRACKS,
  CareerTrack,
  ENDINGS_CATALOG,
  EndingId,
  STORAGE_KEY_ENDINGS,
} from './data/simulationData';
import { CollectionModal } from './components/CollectionModal';
import { ActiveTwist, EventModal } from './components/EventModal';
import { GlossaryModal } from './components/GlossaryModal';
import { ResultView } from './components/ResultView';
import { playTone } from './utils/sound';

type ScreenState = 'INTRO' | 'PLAYING' | 'RESULT';

const TOTAL_BALLS = 4;

interface GameState {
  ballsLeft: number;
  points: number;
  visibility: number;
  credibility: number;
  picks: ActionId[];
  hasPreprint: boolean;
  has140: boolean;
  hasPaywall200: boolean;
  hasSpecial140: boolean;
  hasSalami: number;
  nerfed: boolean;
  passedMidterm: boolean;
  scoopResolved: boolean;
  wasScooped: boolean;
  specialDelisted: boolean;
  wasDelisted: boolean;
  cartelResolved: boolean;
  joinedCartel: boolean;
  cheatUnlocked: boolean;
}

const INITIAL_GAME: GameState = {
  ballsLeft: TOTAL_BALLS,
  points: 0,
  visibility: 0,
  credibility: 100,
  picks: [],
  hasPreprint: false,
  has140: false,
  hasPaywall200: false,
  hasSpecial140: false,
  hasSalami: 0,
  nerfed: false,
  passedMidterm: false,
  scoopResolved: false,
  wasScooped: false,
  specialDelisted: false,
  wasDelisted: false,
  cartelResolved: false,
  joinedCartel: false,
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

function resolveEndingId(g: GameState): EndingId {
  if (g.cheatUnlocked) return 'hacker';
  if (g.points >= 200) {
    if (g.joinedCartel) return 'cartel';
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
  const [isNewUnlock, setIsNewUnlock] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearPendingTimers();
  }, []);

  // Lock background scroll while any modal/bottom-sheet is open on mobile/tablet
  const isAnyModalOpen = !!activeTwist || showCollection || showGlossary;
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
      return next;
    });
  };

  const finishCycle = (finalState: GameState) => {
    const endingId = resolveEndingId(finalState);
    if (endingId === 'hacker') {
      playTone('hack', muted);
    } else if (endingId === 'ghost' || endingId === 'cartel') {
      playTone('win', muted);
    } else {
      playTone('fail', muted);
    }
    recordUnlockedEnding(endingId);
    setScreen('RESULT');
  };

  const startGame = () => {
    clearPendingTimers();
    setGame(INITIAL_GAME);
    setToast(null);
    setActiveTwist(null);
    setIsShaking(false);
    setIsNewUnlock(false);
    setScreen('PLAYING');
    playTone('pick', muted);
  };

  const handleResetCollection = () => {
    setUnlockedEndings([]);
    setIsNewUnlock(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY_ENDINGS);
    } catch {
      // Ignore storage errors
    }
  };

  const handlePick = (id: ActionId) => {
    if (game.ballsLeft <= 0 || activeTwist) return;

    const actionMeta = ACADEMIC_ACTIONS.find((a) => a.id === id);
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
      next.hasPreprint = true;
      next.visibility = clamp(next.visibility + 55);
      next.credibility = clamp(next.credibility + 5);
      nextToast = {
        lead: '⚡ +0 Ministry Points · Priority Shield Active!',
        body: 'Your Dean frowns, but you unlocked a public timestamp (DOI) & Open-Access grant compliance.',
        tone: 'shield',
      };
    } else if (id === 'j140') {
      next.has140 = true;
      const ptsAdded = next.nerfed ? 40 : 140;
      next.points += ptsAdded;
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
      next.points += 25;
      next.visibility = clamp(next.visibility + 10);
      next.credibility = clamp(next.credibility - 10);
      nextToast = {
        lead: '✈️ +25 pts!',
        body: 'Exhausted from flights & university committees (-10% Sanity).',
        tone: 'neutral',
      };
    }

    playTone('pick', muted);
    setToast(nextToast);
    setGame(next);

    // Determine which plot twist triggers after this pick (at most 1 modal per turn)
    if (next.ballsLeft <= 2 && !next.nerfed) {
      scheduleTimer(() => {
        playTone('nerf', muted);
        const passedMidterm = next.points >= 70;
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
    } else if (triggerScoopOnThisPick) {
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
    } else if (next.ballsLeft === 1 && !next.cartelResolved) {
      scheduleTimer(() => {
        playTone('pick', muted);
        setActiveTwist({
          type: 'CARTEL_OFFER',
        });
      }, 360);
    } else if (next.ballsLeft === 0) {
      scheduleTimer(() => {
        finishCycle(next);
      }, 420);
    }
  };

  // --- PLOT TWIST HANDLERS ---

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
    }
  };

  const handleDelistPayOutOfPocket = () => {
    playTone('nerf', muted);
    const updated: GameState = {
      ...game,
      credibility: clamp(game.credibility - 25),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '💸 Paid €2,500 out of pocket for 20 pts!',
      body: 'Budget wiped out and the Promotion Board flagged the delisted journal.',
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
      credibility: clamp(game.credibility - 15),
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '📄 Paper retracted (-20 remaining pts).',
      body: 'Saved €2,500, but lost an Action Ball & took a credibility hit.',
      tone: 'warn',
    });
    if (updated.ballsLeft === 0) {
      scheduleTimer(() => finishCycle(updated), 380);
    }
  };

  const handleCartelAccept = () => {
    playTone('win', muted);
    const updated: GameState = {
      ...game,
      points: game.points + 120,
      credibility: clamp(game.credibility - 45),
      cartelResolved: true,
      joinedCartel: true,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '🃏 Cartel Pact Signed! +120 Ministry Points!',
      body: 'Spreadsheet looks amazing — Credibility tanked (-45%).',
      tone: 'warn',
    });
  };

  const handleCartelDecline = () => {
    playTone('pick', muted);
    const updated: GameState = {
      ...game,
      credibility: clamp(game.credibility + 10),
      cartelResolved: true,
      joinedCartel: false,
    };
    setGame(updated);
    setActiveTwist(null);
    setToast({
      lead: '✓ Declined Co-Authorship Cartel (+10% Credibility).',
      body: '1 Action Ball left for Year 4 — finish strong!',
      tone: 'shield',
    });
  };

  const handleUnlockCheat = () => {
    playTone('hack', muted);
    const updated: GameState = {
      ...game,
      cheatUnlocked: true,
      hasPreprint: true,
    };
    setGame(updated);
    recordUnlockedEnding('hacker');
  };

  // Derived HUD metrics
  const progressPct = Math.min(100, Math.round((game.points / 200) * 100));
  const currentYear = Math.min(TOTAL_BALLS, TOTAL_BALLS - game.ballsLeft + 1);
  const clampedVisibility = clamp(game.visibility);
  const clampedCredibility = clamp(game.credibility);
  const credibilityStateLabel =
    clampedCredibility >= 70
      ? 'Healthy'
      : clampedCredibility >= 40
        ? 'Strained'
        : 'Critical';

  const currentEndingId = resolveEndingId(game);

  return (
    <div className="relative min-h-dvh w-full flex flex-col items-center justify-start sm:justify-center safe-shell">
      <div className="bg-mesh-backdrop" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <main
        className={`relative z-10 w-full max-w-[520px] md:max-w-[740px] bg-[#FAF6F2] rounded-[24px] sm:rounded-[28px] px-4 py-4 sm:px-6 sm:py-6 shadow-[0_20px_50px_rgba(45,20,20,0.22)] border border-white/65 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.06em] uppercase text-[#5C5752] min-w-0 truncate">
            <span className="hidden sm:inline">
              Academic Simulation · Poland
            </span>
            <span className="sm:hidden">Poland · Simulation</span>
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowGlossary(true)}
              aria-label="Open glossary of terms and abbreviations"
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl text-[12px] font-bold text-[#0A5EB0] bg-white/85 border border-[#E5DDD5] hover:bg-white active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Terms</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCollection(true)}
              aria-label={`Trainer Card Collection: ${unlockedEndings.length} of ${ENDINGS_CATALOG.length} endings unlocked`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl text-[12px] font-bold text-[#1E1D1C] bg-white/85 border border-[#E5DDD5] hover:bg-white active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap tabular-nums"
            >
              <Trophy className="w-3.5 h-3.5 text-[#C98A1B]" aria-hidden="true" />
              <span>
                {unlockedEndings.length}/{ENDINGS_CATALOG.length}
              </span>
            </button>

            {screen === 'PLAYING' && (
              <button
                type="button"
                onClick={startGame}
                title="Restart Cycle"
                aria-label="Restart Cycle"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 active:scale-[0.97] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 active:scale-[0.97] transition-all cursor-pointer"
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
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#F7D16A] text-[#1E1D1C] mb-2">
              Extended Edition · 6 Endings
            </div>
            <h1
              id="intro-title"
              className="text-[24px] sm:text-[28px] md:text-[32px] leading-[1.14] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-2 text-balance"
            >
              Academic Pokémon Go:
              <br />
              Survive Punktoza
            </h1>
            <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#5C5752] max-w-[60ch]">
              In Poland, <strong>Punktoza</strong> (&ldquo;point-itis&rdquo;)
              means researchers keep their jobs strictly by collecting points
              from a central Ministry journal spreadsheet. Survive 4 years of{' '}
              <strong>Reviewer #2</strong>, <strong>delisted journals</strong>,
              and <strong>Open-Access audits</strong>!
            </p>

            {/* Responsive 2-column body on tablets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4 my-4 items-stretch">
              {/* Track selector */}
              <div className="bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[12.5px] font-bold text-[#1E1D1C]">
                      Choose Your Track:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowGlossary(true)}
                      className="text-[12px] font-bold text-[#0A5EB0] hover:underline cursor-pointer"
                    >
                      Glossary →
                    </button>
                  </div>
                  <div
                    className="grid grid-cols-2 gap-1 p-1 bg-[#EDE6DE] rounded-xl"
                    role="tablist"
                    aria-label="Academic Track"
                  >
                    {(['phd', 'habilitation'] as CareerTrack[]).map((t) => {
                      const active = track === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setTrack(t)}
                          className={`min-h-[42px] py-2 px-2.5 rounded-lg text-[12.5px] sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-white text-[#1E1D1C] shadow-xs'
                              : 'text-[#5C5752] hover:text-[#1E1D1C]'
                          }`}
                        >
                          {CAREER_TRACKS[t].shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-[12.5px] leading-[1.45] text-[#5C5752] mt-2.5">
                  {CAREER_TRACKS[track].stakesNote}
                </p>
              </div>

              {/* Rules summary */}
              <div className="bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl p-3.5">
                <strong className="block text-[13px] font-bold text-[#1E1D1C]">
                  Your 4-Year Evaluation Rules:
                </strong>
                <ul className="mt-2 grid gap-2">
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1E1D1C]">
                    <span className="shrink-0" aria-hidden="true">
                      🎯
                    </span>
                    <span>
                      <strong>Goal:</strong> Hit{' '}
                      <strong>200 Ministry Points</strong> (70+ by Year 2
                      Mid-Term) without losing Credibility.
                    </span>
                  </li>
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1E1D1C]">
                    <span className="shrink-0" aria-hidden="true">
                      🔴
                    </span>
                    <span>
                      <strong>Ammo:</strong> You have{' '}
                      <strong>4 Action Balls</strong> (1 per year) for time,
                      budget &amp; sanity.
                    </span>
                  </li>
                  <li className="text-[13px] leading-[1.42] flex gap-2 items-start text-[#1E1D1C]">
                    <span className="shrink-0" aria-hidden="true">
                      🏆
                    </span>
                    <span>
                      <strong>Collect:</strong> Unlock all{' '}
                      <strong>6 Trainer Card Endings</strong> (
                      {unlockedEndings.length}/6 discovered).
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={startGame}
              className="w-full min-h-[52px] rounded-[14px] py-3.5 px-5 text-[15px] sm:text-[16px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              Start 4-Year Cycle →
            </button>

            <p className="text-center text-[11.5px] text-[#5C5752] mt-3.5 opacity-85">
              Based on Dr. Hanna Gaweł&apos;s research · Jagiellonian University
            </p>
          </section>
        )}

        {/* SCREEN 2: GAMEPLAY */}
        {screen === 'PLAYING' && (
          <section aria-label="4-Year Evaluation Gameplay">
            {/* HUD */}
            <div className="bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl px-3.5 py-3 mb-3">
              <div className="flex justify-between items-center mb-2 gap-2">
                <div className="text-[15px] font-extrabold text-[#1E1D1C]">
                  Ministry Score:{' '}
                  <span
                    className="text-[#0A5EB0] tabular-nums"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {game.points}
                  </span>{' '}
                  <span className="text-[#5C5752] font-bold tabular-nums">
                    / 200
                  </span>
                </div>

                <div
                  className="flex items-center gap-1 text-[11.5px] font-bold text-[#5C5752]"
                  aria-label={`${game.ballsLeft} of ${TOTAL_BALLS} Action Balls remaining`}
                >
                  <span className="mr-0.5">Balls:</span>
                  {[1, 2, 3, 4].map((ballNum) => {
                    const isUsed = ballNum > game.ballsLeft;
                    return (
                      <div
                        key={ballNum}
                        className={`w-[15px] h-[15px] rounded-full border-2 border-[#1E1D1C] relative transition-all duration-200 ${
                          isUsed ? 'opacity-20 scale-80' : 'opacity-100 scale-100'
                        }`}
                        style={{
                          background:
                            'linear-gradient(to bottom, #EA6C6C 50%, #FFFFFF 50%)',
                        }}
                      >
                        <span className="absolute w-[4.5px] h-[4.5px] bg-white border-[1.5px] border-[#1E1D1C] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar with subtle 70-pt Mid-Term marker */}
              <div
                className="relative w-full h-2.5 bg-[#EFE9E3] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={game.points}
                aria-valuemin={0}
                aria-valuemax={200}
              >
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progressPct}%`,
                    background:
                      game.points >= 200
                        ? 'linear-gradient(90deg, #2E8555, #47B87B)'
                        : 'linear-gradient(90deg, #F4A97B, #0A5EB0)',
                  }}
                />
                {!game.nerfed && (
                  <div
                    title="Year 2 Mid-Term Threshold (70 pts)"
                    className="absolute top-0 bottom-0 w-[2px] bg-[#1E1D1C]/35"
                    style={{ left: '35%' }}
                  />
                )}
              </div>

              {/* 3-stat compact HUD footer */}
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mt-2 text-[11.5px] font-semibold text-[#5C5752] tabular-nums">
                <span>AI &amp; Open: {clampedVisibility}%</span>
                <span aria-hidden="true">·</span>
                <span
                  className={
                    clampedCredibility < 40
                      ? 'text-[#B81D1D] font-bold'
                      : clampedCredibility < 70
                        ? 'text-[#B45309] font-bold'
                        : 'text-[#1E1D1C]'
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

              {/* Active Preprint Shield status line */}
              {game.hasPreprint && (
                <div className="mt-2 pt-1.5 border-t border-[#F0E9E2] flex items-center gap-1.5 text-[11px] font-bold text-[#2E8555]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    Priority Shield Active (DOI) · Open-Access Rule Met
                  </span>
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
                    ? 'bg-[#EEF8F2] border-[#A7DEC0] text-[#184C31]'
                    : 'bg-[#FFF5D6] border-[#F0D47E] text-[#5E4306]'
                }`}
              >
                <strong className="font-bold">{toast.lead}</strong> {toast.body}{' '}
                {toast.italicNote && <em>{toast.italicNote}</em>}
              </div>
            )}

            {/* Wild Academic Action Cards (1-col mobile, 2-col tablet/desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              {ACADEMIC_ACTIONS.map((item) => {
                const alreadyPicked =
                  !item.repeatable && game.picks.includes(item.id);
                const pickCount = game.picks.filter((p) => p === item.id).length;

                let badgeClasses =
                  'text-[10.5px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 tabular-nums ';
                if (item.badgeStyle === 'zero') {
                  badgeClasses += 'bg-[#FFF2C9] text-[#7C5800]';
                } else if (item.badgeStyle === 'high') {
                  badgeClasses += 'bg-[#1E1D1C] text-white';
                } else if (item.badgeStyle === 'express') {
                  badgeClasses += 'bg-[#FFF3E0] text-[#B45309]';
                } else if (item.badgeStyle === 'mid') {
                  badgeClasses += 'bg-[#FCE0EA] text-[#8A1E46]';
                } else {
                  badgeClasses += 'bg-[#E3EFFB] text-[#0A5EB0]';
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={alreadyPicked || game.ballsLeft <= 0 || !!activeTwist}
                    onClick={() => handlePick(item.id)}
                    className={`w-full min-h-[72px] bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl px-3.5 py-3 flex items-start sm:items-center gap-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C] ${
                      alreadyPicked || game.ballsLeft <= 0
                        ? 'opacity-45 cursor-not-allowed'
                        : 'cursor-pointer hover:border-[#C7BBB0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-[0.985]'
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
                        <span className="text-[14px] leading-snug font-extrabold text-[#1E1D1C]">
                          {item.name}
                          {pickCount > 0 && item.repeatable && (
                            <span className="ml-1 text-[11px] font-bold text-[#5C5752]">
                              ×{pickCount}
                            </span>
                          )}
                        </span>

                        {item.id === 'j140' && game.nerfed ? (
                          <div className="flex items-center gap-1 shrink-0 tabular-nums">
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FFE2E2] text-[#B81D1D] line-through">
                              140
                            </span>
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#B81D1D] text-white">
                              40 PTS!
                            </span>
                          </div>
                        ) : item.id === 'special140' && game.specialDelisted ? (
                          <div className="flex items-center gap-1 shrink-0 tabular-nums">
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FFE2E2] text-[#B81D1D] line-through">
                              140
                            </span>
                            <span className="text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#B45309] text-white">
                              DELISTED
                            </span>
                          </div>
                        ) : (
                          <span className={badgeClasses}>{item.badgeText}</span>
                        )}
                      </div>

                      <p className="text-[12px] leading-[1.38] text-[#5C5752]">
                        {alreadyPicked
                          ? 'Already attempted in this 4-year cycle.'
                          : item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
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
              hasPreprint: game.hasPreprint,
              hasSalami: game.hasSalami,
              passedMidterm: game.passedMidterm,
              ncnCompliant: game.hasPreprint || game.cheatUnlocked,
              track,
              unlockedCount: unlockedEndings.length,
              isNewUnlock,
            }}
            onUnlockCheat={handleUnlockCheat}
            onPlayAgain={startGame}
            onOpenCollection={() => setShowCollection(true)}
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
          onAcceptMidtermPatch={handleAcceptMidtermPatch}
          onDelistPayOutOfPocket={handleDelistPayOutOfPocket}
          onDelistRetract={handleDelistRetract}
          onCartelAccept={handleCartelAccept}
          onCartelDecline={handleCartelDecline}
        />
      )}

      {/* TRAINER CARD COLLECTION MODAL */}
      {showCollection && (
        <CollectionModal
          unlocked={unlockedEndings}
          onClose={() => setShowCollection(false)}
          onResetCollection={handleResetCollection}
        />
      )}

      {/* GLOSSARY MODAL */}
      {showGlossary && (
        <GlossaryModal onClose={() => setShowGlossary(false)} />
      )}
    </div>
  );
}
