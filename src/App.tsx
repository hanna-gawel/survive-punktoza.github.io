import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { ACADEMIC_ACTIONS, ActionId } from './data/simulationData';
import { playTone } from './utils/sound';

type ScreenState = 'INTRO' | 'PLAYING' | 'RESULT';

interface GameState {
  ballsLeft: number;
  points: number;
  visibility: number;
  picks: ActionId[];
  hasPreprint: boolean;
  has140: boolean;
  hasPaywall200: boolean;
  hasSalami: number;
  nerfed: boolean;
  cheatUnlocked: boolean;
}

const INITIAL_STATE: GameState = {
  ballsLeft: 3,
  points: 0,
  visibility: 0,
  picks: [],
  hasPreprint: false,
  has140: false,
  hasPaywall200: false,
  hasSalami: 0,
  nerfed: false,
  cheatUnlocked: false,
};

interface ToastFeedback {
  lead: string;
  body: string;
  italicNote?: string;
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('INTRO');
  const [game, setGame] = useState<GameState>(INITIAL_STATE);
  const [toast, setToast] = useState<ToastFeedback | null>(null);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [patchImpactLost100, setPatchImpactLost100] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [muted, setMuted] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearPendingTimers();
  }, []);

  const scheduleTimer = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const startGame = () => {
    clearPendingTimers();
    setGame(INITIAL_STATE);
    setToast(null);
    setShowPatchModal(false);
    setPatchImpactLost100(false);
    setIsShaking(false);
    setScreen('PLAYING');
    playTone('pick', muted);
  };

  const handlePick = (id: ActionId) => {
    if (game.ballsLeft <= 0 || showPatchModal) return;

    const actionMeta = ACADEMIC_ACTIONS.find((a) => a.id === id);
    if (!actionMeta) return;
    if (!actionMeta.repeatable && game.picks.includes(id)) return;

    const nextBallsLeft = game.ballsLeft - 1;
    let nextPoints = game.points;
    let nextVisibility = game.visibility;
    let nextHasPreprint = game.hasPreprint;
    let nextHas140 = game.has140;
    let nextHasPaywall200 = game.hasPaywall200;
    let nextHasSalami = game.hasSalami;
    let nextToast: ToastFeedback;

    if (id === 'preprint') {
      nextHasPreprint = true;
      nextVisibility = Math.min(100, nextVisibility + 55);
      nextToast = {
        lead: '⚡ +0 Ministry Points!',
        body: 'Your Dean asks:',
        italicNote: '"Great downloads, but where are the spreadsheet points?!"',
      };
    } else if (id === 'j140') {
      nextHas140 = true;
      const ptsAdded = game.nerfed ? 40 : 140;
      nextPoints += ptsAdded;
      nextVisibility = Math.min(100, nextVisibility + 10);
      nextToast = {
        lead: `📘 Caught! +${ptsAdded} pts added.`,
        body: 'Now waiting 18–24 months for the gatekeeper...',
      };
    } else if (id === 'dragon200') {
      nextHasPaywall200 = true;
      nextPoints += 200;
      nextVisibility = Math.min(100, nextVisibility + 5);
      nextToast = {
        lead: '🐉 +200 pts! Huge Ministry score!',
        body: 'Locked behind a $39.95 commercial paywall.',
      };
    } else if (id === 'salami') {
      nextHasSalami += 1;
      nextPoints += 70;
      nextVisibility = Math.min(100, nextVisibility + 5);
      nextToast = {
        lead: `🍕 +70 pts! Paper #${nextHasSalami} published.`,
        body: 'Zero scientific novelty, high efficiency.',
      };
    } else {
      nextPoints += 25;
      nextVisibility = Math.min(100, nextVisibility + 10);
      nextToast = {
        lead: '✈️ +25 pts!',
        body: 'Exhausted from committees & flights, tiny dent in the quota.',
      };
    }

    playTone('pick', muted);
    setToast(nextToast);

    const willTriggerPatch = nextBallsLeft === 1 && !game.nerfed;

    setGame({
      ...game,
      ballsLeft: nextBallsLeft,
      points: nextPoints,
      visibility: nextVisibility,
      picks: [...game.picks, id],
      hasPreprint: nextHasPreprint,
      has140: nextHas140,
      hasPaywall200: nextHasPaywall200,
      hasSalami: nextHasSalami,
    });

    if (willTriggerPatch) {
      scheduleTimer(() => {
        playTone('nerf', muted);
        setPatchImpactLost100(nextHas140);
        setGame((prev) => ({
          ...prev,
          nerfed: true,
          points: nextHas140 ? Math.max(0, prev.points - 100) : prev.points,
        }));
        if (nextHas140) {
          setIsShaking(true);
          scheduleTimer(() => setIsShaking(false), 500);
        }
        setShowPatchModal(true);
      }, 340);
    } else if (nextBallsLeft === 0) {
      scheduleTimer(() => {
        if (nextPoints < 200) {
          playTone('fail', muted);
        } else if (nextHasPreprint) {
          playTone('hack', muted);
        } else {
          playTone('win', muted);
        }
        setScreen('RESULT');
      }, 420);
    }
  };

  const handleUnlockCheat = () => {
    playTone('hack', muted);
    setGame((prev) => ({ ...prev, cheatUnlocked: true }));
  };

  const progressPct = Math.min(100, Math.round((game.points / 200) * 100));
  const usedCount = 3 - game.ballsLeft;
  const clampedVisibility = Math.min(100, game.visibility);

  const isHackerEnding =
    game.cheatUnlocked || (game.points >= 200 && game.hasPreprint);
  const isFiredEnding = !isHackerEnding && game.points < 200;
  const isGhostEnding = !isHackerEnding && game.points >= 200 && !game.hasPreprint;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-3.5 sm:p-6">
      <div className="grain-overlay" aria-hidden="true" />

      <main
        className={`relative z-10 w-full max-w-[460px] bg-[#FAF6F2] rounded-[26px] px-[18px] pt-5 pb-6 shadow-[0_20px_50px_rgba(45,20,20,0.22)] border border-white/65 transition-transform ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Subtle utility bar inside card */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#5C5752]">
            Interactive Simulation · Poland
          </span>
          <div className="flex items-center gap-1.5">
            {screen === 'PLAYING' && (
              <button
                type="button"
                onClick={startGame}
                title="Restart Cycle"
                aria-label="Restart Cycle"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C] cursor-pointer"
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
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#F7D16A] text-[#1E1D1C] mb-2.5">
              4-Year Academic Survival
            </div>
            <h1
              id="intro-title"
              className="text-[26px] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-2 text-balance"
            >
              Academic Pokémon Go:
              <br />
              Survive Punktoza
            </h1>
            <p className="text-[14.5px] leading-[1.48] text-[#5C5752]">
              You just heard why preprints are faster, open, and AI-ready. Now
              experience why rational researchers still avoid them.
            </p>

            <div className="bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl p-3.5 my-3.5">
              <strong className="block text-[13.5px] font-bold text-[#1E1D1C]">
                Your 4-Year Evaluation Rules:
              </strong>
              <ul className="mt-2 grid gap-2">
                <li className="text-[13.5px] leading-[1.4] flex gap-2.5 items-start text-[#1E1D1C]">
                  <span className="text-[16px] shrink-0" aria-hidden="true">
                    🎯
                  </span>
                  <span>
                    <strong>Goal:</strong> Reach{' '}
                    <strong>200 Ministerial Points</strong> to keep your job and
                    department funding.
                  </span>
                </li>
                <li className="text-[13.5px] leading-[1.4] flex gap-2.5 items-start text-[#1E1D1C]">
                  <span className="text-[16px] shrink-0" aria-hidden="true">
                    🔴
                  </span>
                  <span>
                    <strong>Ammo:</strong> You only have{' '}
                    <strong>3 Action Balls</strong> (time, budget &amp; sanity).
                  </span>
                </li>
                <li className="text-[13.5px] leading-[1.4] flex gap-2.5 items-start text-[#1E1D1C]">
                  <span className="text-[16px] shrink-0" aria-hidden="true">
                    📊
                  </span>
                  <span>
                    <strong>The Catch:</strong> Points come strictly from a
                    central government spreadsheet — not from peers reading your
                    work.
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={startGame}
              className="w-full rounded-[14px] py-[15px] px-[18px] text-[15px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-3 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C]"
            >
              Start 4-Year Cycle →
            </button>

            <p className="text-center text-[11px] text-[#5C5752] mt-3.5 opacity-85">
              Based on dr Hanna Gaweł&apos;s research · Jagiellonian University
            </p>
          </section>
        )}

        {/* SCREEN 2: GAMEPLAY */}
        {screen === 'PLAYING' && (
          <section aria-label="4-Year Evaluation Gameplay">
            {/* HUD */}
            <div className="bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl px-3.5 py-3 mb-3.5">
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
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#5C5752]"
                  aria-label={`${game.ballsLeft} of 3 Action Balls remaining`}
                >
                  <span>Balls:</span>
                  {[1, 2, 3].map((ballNum) => {
                    const isUsed = ballNum > game.ballsLeft;
                    return (
                      <div
                        key={ballNum}
                        className={`w-4 h-4 rounded-full border-2 border-[#1E1D1C] relative transition-all duration-200 ${
                          isUsed ? 'opacity-20 scale-80' : 'opacity-100 scale-100'
                        }`}
                        style={{
                          background:
                            'linear-gradient(to bottom, #EA6C6C 50%, #FFFFFF 50%)',
                        }}
                      >
                        <span className="absolute w-[5px] h-[5px] bg-white border-[1.5px] border-[#1E1D1C] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="w-full h-2.5 bg-[#EFE9E3] rounded-full overflow-hidden"
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
              </div>

              <div className="flex justify-between items-center mt-2 text-[11.5px] font-semibold text-[#5C5752] tabular-nums">
                <span>AI &amp; Human Visibility: {clampedVisibility}%</span>
                <span>
                  {game.ballsLeft > 0
                    ? `Pick ${usedCount + 1} of 3`
                    : 'Cycle Complete'}
                </span>
              </div>
            </div>

            {/* Feedback Toast */}
            {toast && (
              <div
                role="status"
                aria-live="polite"
                className="text-[12.5px] font-medium px-3 py-2.5 rounded-xl mb-3 bg-[#FFF5D6] border border-[#F0D47E] text-[#5E4306]"
              >
                <strong className="font-bold">{toast.lead}</strong> {toast.body}{' '}
                {toast.italicNote && <em>{toast.italicNote}</em>}
              </div>
            )}

            {/* Wild Academic Action Cards */}
            <div className="grid gap-2.5">
              {ACADEMIC_ACTIONS.map((item) => {
                const alreadyPicked =
                  !item.repeatable && game.picks.includes(item.id);
                const pickCount = game.picks.filter((p) => p === item.id).length;

                let badgeClasses =
                  'text-[11px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 tabular-nums ';
                if (item.badgeStyle === 'zero') {
                  badgeClasses += 'bg-[#FFF2C9] text-[#7C5800]';
                } else if (item.badgeStyle === 'high') {
                  badgeClasses += 'bg-[#1E1D1C] text-white';
                } else if (item.badgeStyle === 'mid') {
                  badgeClasses += 'bg-[#FCE0EA] text-[#8A1E46]';
                } else {
                  badgeClasses += 'bg-[#E3EFFB] text-[#0A5EB0]';
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={alreadyPicked || game.ballsLeft <= 0}
                    onClick={() => handlePick(item.id)}
                    className={`w-full bg-white border-[1.5px] border-[#EAE2DA] rounded-2xl px-3.5 py-3 flex items-center gap-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C] ${
                      alreadyPicked || game.ballsLeft <= 0
                        ? 'opacity-45 cursor-not-allowed'
                        : 'cursor-pointer hover:border-[#C7BBB0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-[0.985]'
                    }`}
                  >
                    <div
                      className={`w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[24px] shrink-0 ${item.avatarBg}`}
                      aria-hidden="true"
                    >
                      {item.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 mb-0.5">
                        <span className="text-[14.5px] font-extrabold text-[#1E1D1C] truncate">
                          {item.name}
                          {pickCount > 0 && item.repeatable && (
                            <span className="ml-1.5 text-[11px] font-bold text-[#5C5752]">
                              ×{pickCount}
                            </span>
                          )}
                        </span>

                        {item.id === 'j140' && game.nerfed ? (
                          <div className="flex items-center gap-1 shrink-0 tabular-nums">
                            <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#FFE2E2] text-[#B81D1D] line-through">
                              140
                            </span>
                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-[#B81D1D] text-white">
                              40 PTS!
                            </span>
                          </div>
                        ) : (
                          <span className={badgeClasses}>{item.badgeText}</span>
                        )}
                      </div>

                      <p className="text-[12px] leading-[1.35] text-[#5C5752]">
                        {alreadyPicked
                          ? 'Already in your Pokédex for this cycle.'
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
          <section aria-label="Evaluation Outcome">
            {isFiredEnding && (
              <>
                <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF0F0] border-2 border-[#EA6C6C]">
                  <span className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#B81D1D] text-white mb-2.5">
                    EVALUATION FAILED
                  </span>
                  <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
                    Contract Terminated!
                  </h2>
                  <p className="text-[14px] leading-[1.48] text-[#3D1F1F]">
                    {game.hasPreprint ? (
                      <>
                        You followed the open-science ideal and shared
                        preprints. AI &amp; peers loved it —{' '}
                        <strong>
                          but the Ministry spreadsheet says 0 points for
                          preprints.
                        </strong>
                      </>
                    ) : (
                      <>
                        Between committee grind and ministerial point nerfs, you
                        missed the 200-point quota.
                      </>
                    )}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                    <div className="bg-white/90 rounded-xl p-2.5 text-center text-[#1E1D1C]">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        Ministry Score
                      </div>
                      <div className="text-[17px] font-extrabold text-[#B81D1D] tabular-nums">
                        {game.points} / 200
                      </div>
                    </div>
                    <div className="bg-white/90 rounded-xl p-2.5 text-center text-[#1E1D1C]">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        AI &amp; Open Impact
                      </div>
                      <div className="text-[17px] font-extrabold tabular-nums">
                        {clampedVisibility}%
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
                  <strong className="text-[#1E1D1C]">
                    Now you feel Punktoza:
                  </strong>{' '}
                  Rational researchers don&apos;t avoid preprints because they
                  hate open science. They avoid them because the scoreboard
                  gives them <strong>zero survival points</strong>.
                </p>
              </>
            )}

            {isGhostEnding && (
              <>
                <div
                  className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#8E2331]"
                  style={{
                    background:
                      'linear-gradient(165deg, #1E1B1B 0%, #4E1620 100%)',
                  }}
                >
                  <span className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#8E2331] text-white mb-2.5">
                    GHOST STATUS UNLOCKED
                  </span>
                  <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
                    You Win Punktoza...
                    <br />
                    as a Ghost in the Cache!
                  </h2>
                  <p className="text-[14px] leading-[1.48] text-white/85 mt-1.5">
                    Your Dean is thrilled! You hit{' '}
                    <strong className="text-white">{game.points} points</strong>
                    {game.hasSalami > 1
                      ? ' by slicing your work into tiny pieces'
                      : ' behind a commercial paywall'}
                    .
                  </p>
                  <p className="text-[14px] leading-[1.48] text-white/85 mt-3">
                    <strong className="text-white">The cost:</strong> Paywalls
                    block web scrapers. LLMs &amp; OpenAIRE skip you completely.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                    <div className="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center text-white">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        Ministry Score
                      </div>
                      <div className="text-[17px] font-extrabold text-[#7CE3A6] tabular-nums">
                        {game.points} / 200 ✓
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center text-white">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        AI &amp; Open Impact
                      </div>
                      <div className="text-[17px] font-extrabold text-[#FF8C94] tabular-nums">
                        Ghost ({clampedVisibility}%)
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
                  Can you keep your 200 points <em>without</em> disappearing
                  from the algorithmic future of science?
                </p>
              </>
            )}

            {isHackerEnding && (
              <>
                <div
                  className="rounded-[20px] px-[18px] py-5 mb-3.5 border-2 border-[#E8AC41]"
                  style={{
                    background:
                      'linear-gradient(155deg, #FFFDF7 0%, #FFF2C9 100%)',
                  }}
                >
                  <span className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#1E1D1C] text-[#F7D16A] mb-2.5">
                    ⚡ CHEAT CODE ACTIVE
                  </span>
                  <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
                    {game.cheatUnlocked
                      ? 'Dual-Type Evolution Unlocked!'
                      : 'You Naturally Hacked the System!'}
                  </h2>
                  <p className="text-[14px] leading-[1.48] text-[#3C352B]">
                    You used the{' '}
                    <strong>Preprint as a Dual-Type Evolution</strong>:
                  </p>

                  <ul className="mt-2.5 grid gap-2">
                    <li className="text-[13.5px] leading-[1.4] flex gap-2.5 items-start text-[#1E1D1C]">
                      <span className="text-[16px] shrink-0" aria-hidden="true">
                        1️⃣
                      </span>
                      <span>
                        Upload <strong>Preprint first</strong> → instant DOI,
                        immutable timestamp, +12 mo citations &amp; Open API for
                        LLMs.
                      </span>
                    </li>
                    <li className="text-[13.5px] leading-[1.4] flex gap-2.5 items-start text-[#1E1D1C]">
                      <span className="text-[16px] shrink-0" aria-hidden="true">
                        2️⃣
                      </span>
                      <span>
                        Submit to the <strong>200-pt journal</strong> → collect
                        the Ministry points so the system leaves you alone.
                      </span>
                    </li>
                  </ul>

                  <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                    <div className="bg-white/90 rounded-xl p-2.5 text-center text-[#1E1D1C]">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        Ministry Score
                      </div>
                      <div className="text-[17px] font-extrabold text-[#2E8555] tabular-nums">
                        {Math.max(200, game.points)} / 200 ✓
                      </div>
                    </div>
                    <div className="bg-white/90 rounded-xl p-2.5 text-center text-[#1E1D1C]">
                      <div className="text-[10.5px] uppercase font-bold opacity-75 mb-0.5">
                        Open API &amp; AI
                      </div>
                      <div className="text-[17px] font-extrabold text-[#0A5EB0] tabular-nums">
                        100% Live ⚡
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[13.5px] leading-[1.48] text-center font-bold text-[#1E1D1C]">
                  &ldquo;Collect the points if you must. But don&apos;t let your
                  research become a ghost.&rdquo;
                </p>
              </>
            )}

            {/* Cheat Code Unlock CTA */}
            {(isFiredEnding || isGhostEnding) && (
              <button
                type="button"
                onClick={handleUnlockCheat}
                className="w-full rounded-[14px] py-[15px] px-[18px] text-[14.5px] font-bold text-[#1E1D1C] shadow-[0_8px_20px_rgba(228,158,50,0.35)] hover:brightness-[1.03] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C]"
                style={{
                  background: 'linear-gradient(135deg, #F7D16A, #E49E32)',
                }}
              >
                ⚡ Use Cheat Code: Attach Preprint (Open API)
              </button>
            )}

            <button
              type="button"
              onClick={startGame}
              className="w-full rounded-[14px] py-3 px-4 text-[14px] font-bold bg-transparent border-[1.5px] border-[#D8CFC6] text-[#1E1D1C] hover:bg-black/[0.03] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-2.5 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C]"
            >
              ↻ Play Again (Try Another Strategy)
            </button>

            <p className="text-center text-[11px] text-[#5C5752] mt-3.5 opacity-85">
              Show your Trainer Card to the person next to you!
            </p>
          </section>
        )}
      </main>

      {/* MINISTERIAL PATCH MODAL */}
      {showPatchModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="patch-modal-title"
          className="fixed inset-0 bg-[#140E0E]/72 backdrop-blur-[4px] flex justify-center items-center p-[18px] z-50"
        >
          <div className="bg-white max-w-[390px] w-full rounded-[22px] px-5 py-[22px] text-center border-[3px] border-[#EA6C6C] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <span className="inline-block bg-[#B81D1D] text-white text-[11px] font-extrabold tracking-[0.08em] px-2.5 py-1 rounded-md mb-2.5">
              BREAKING: MINISTERIAL PATCH UPDATE!
            </span>
            <h2
              id="patch-modal-title"
              className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
            >
              Spreadsheet Edited Overnight!
            </h2>

            {patchImpactLost100 ? (
              <div className="text-[14px] leading-[1.48] text-[#1E1D1C] my-3 space-y-3">
                <p>
                  A new Minister updated the point list overnight! Your{' '}
                  <strong>
                    140-pt International Journal was NERFED to 40 pts (-100
                    pts!)
                  </strong>
                  .
                </p>
                <p>
                  Meanwhile, an obscure local journal jumped from 20 → 200 pts.
                </p>
              </div>
            ) : (
              <div className="text-[14px] leading-[1.48] text-[#1E1D1C] my-3 space-y-3">
                <p>
                  A new Minister updated the point list overnight! The{' '}
                  <strong>
                    140-pt International Journal just got NERFED to 40 pts
                  </strong>
                  , while an obscure local journal jumped to 200 pts.
                </p>
                <p>1 Action Ball left — choose wisely!</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPatchModal(false)}
              className="w-full rounded-[14px] py-[15px] px-[18px] text-[15px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-4 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C]"
            >
              Accept Reality &amp; Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
