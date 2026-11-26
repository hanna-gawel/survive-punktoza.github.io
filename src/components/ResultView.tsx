import { Award, Sparkles, Trophy } from 'lucide-react';
import {
  CAREER_TRACKS,
  CareerTrack,
  ENDINGS_CATALOG,
  EndingId,
} from '../data/simulationData';
import { CrowKeyEmblem } from './CrowKeyEmblem';
import { PRIZE_THRESHOLD } from './HiddenPrizeModal';

export interface RunSummaryStats {
  endingId: EndingId;
  cheatUnlocked: boolean;
  points: number;
  visibility: number;
  credibility: number;
  knowledgePoints: number;
  darkArtsUsed: string[];
  hasPreprint: boolean;
  hasSalami: number;
  passedMidterm: boolean;
  ncnCompliant: boolean;
  oaWeekFound: boolean;
  guerrillaOaFound: boolean;
  track: CareerTrack;
  unlockedCount: number;
  isNewUnlock: boolean;
}

interface ResultViewProps {
  summary: RunSummaryStats;
  onUnlockCheat: () => void;
  onPlayAgain: () => void;
  onSelectTrack: (nextTrack: CareerTrack) => void;
  onOpenCollection: () => void;
  onOpenPrize: () => void;
}

export function ResultView({
  summary,
  onUnlockCheat,
  onPlayAgain,
  onSelectTrack,
  onOpenCollection,
  onOpenPrize,
}: ResultViewProps) {
  const {
    endingId,
    cheatUnlocked,
    points,
    visibility,
    credibility,
    knowledgePoints,
    darkArtsUsed,
    hasPreprint,
    hasSalami,
    passedMidterm,
    ncnCompliant,
    oaWeekFound,
    guerrillaOaFound,
    track,
    unlockedCount,
    isNewUnlock,
  } = summary;

  const trackInfo = CAREER_TRACKS[track];
  const canUseCheat = endingId !== 'hacker';

  return (
    <section aria-label="Evaluation Outcome">
      {/* Top status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 text-[12px] font-semibold text-[#5A5468]">
        <span>
          {trackInfo.label} ·{' '}
          {endingId === 'laundered'
            ? 'Removed at Year 2'
            : passedMidterm
              ? 'Mid-Term Passed'
              : 'Mid-Term Warned'}
        </span>
        <button
          type="button"
          onClick={onOpenCollection}
          className="inline-flex items-center gap-1 font-bold text-[#1C1926] hover:text-[#6D44B8] transition-colors cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-[#E86F3A]" aria-hidden="true" />
          <span className="tabular-nums">
            {unlockedCount}/{ENDINGS_CATALOG.length}
          </span>
          {isNewUnlock && (
            <span className="text-[#0D8A85] font-extrabold">· NEW!</span>
          )}
        </button>
      </div>

      {/* OA Week Treasure Stamp */}
      {oaWeekFound && (
        <div className="mb-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#E3F8F5] via-[#F2ECFE] to-[#FFF2E5] border border-[#96DDD6] flex items-center justify-between gap-2 text-[12px]">
          <span className="inline-flex items-center gap-1.5 font-extrabold text-[#0C5E5A]">
            <Sparkles
              className="w-3.5 h-3.5 text-[#0D8A85] shrink-0"
              aria-hidden="true"
            />
            <span>Hidden Treasure Stamp: Open Access Week Scholar</span>
          </span>
          <strong className="text-[#6D44B8] tabular-nums shrink-0">
            {knowledgePoints} KP
          </strong>
        </div>
      )}

      {/* Honorary Sci-Hub Guerrilla Open-Access User Award Stamp */}
      {guerrillaOaFound && (
        <div className="mb-2.5 px-3 py-2 rounded-xl bg-[#221A36] text-white border border-[#8B5CF6]/60 flex items-center gap-2.5 text-[12px]">
          <CrowKeyEmblem className="w-9 h-9 shrink-0" />
          <div className="min-w-0">
            <div className="text-[9.5px] font-extrabold uppercase tracking-[0.07em] text-[#FFB574]">
              🗝️ Extra Award · Raven Perched on Books with Key
            </div>
            <div className="font-extrabold text-white leading-tight">
              Honorary Sci-Hub Guerrilla Open-Access User
            </div>
          </div>
        </div>
      )}

      {/* 8-Ending Hidden Prize Banner */}
      {unlockedCount >= PRIZE_THRESHOLD && (
        <button
          type="button"
          onClick={onOpenPrize}
          className="w-full mb-3 px-3.5 py-2.5 rounded-xl prize-foil text-white border border-white/50 shadow-[0_8px_20px_rgba(109,68,184,0.25)] hover:brightness-[1.04] active:scale-[0.985] transition-all flex items-center justify-between gap-2 text-[12.5px] font-extrabold cursor-pointer"
        >
          <span className="inline-flex items-center gap-1.5">
            <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Hidden Prize Unlocked ({unlockedCount} Endings!)</span>
          </span>
          <span className="underline whitespace-nowrap">Open Pass →</span>
        </button>
      )}

      {/* ENDING 1: DUAL-TYPE SYSTEM HACKER */}
      {endingId === 'hacker' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 border-2 border-[#24B8B0]"
            style={{
              background:
                'linear-gradient(150deg, #F0FDFB 0%, #F4EEFF 52%, #FFF3E6 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#1C1926] text-[#5CE1D8] mb-2.5">
              ⚡ DUAL-TYPE EVOLUTION
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              {cheatUnlocked
                ? 'Dual-Type Evolution Unlocked!'
                : 'You Hacked Punktoza Cleanly!'}
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#352F42]">
              You paired <strong>Preprints + Points</strong> to beat the
              evaluation algorithm without resorting to dark arts, cloning, or
              title arbitrage:
            </p>
            <ul className="mt-2.5 grid gap-2">
              <li className="text-[13px] leading-[1.4] flex gap-2 items-start text-[#1C1926]">
                <span className="shrink-0" aria-hidden="true">
                  1️⃣
                </span>
                <span>
                  <strong>Preprint first</strong> → permanent timestamp (DOI)
                  blocking scoops, free Open-Access compliance (Plan S), and
                  100% visibility to AI tools &amp; peers.
                </span>
              </li>
              <li className="text-[13px] leading-[1.4] flex gap-2 items-start text-[#1C1926]">
                <span className="shrink-0" aria-hidden="true">
                  2️⃣
                </span>
                <span>
                  <strong>200-pt journals second</strong> → satisfies the
                  Ministry spreadsheet, Doctoral School, and Promotion Board.
                </span>
              </li>
            </ul>

            <StatQuad
              points={`${Math.max(400, points)}/400 ✓`}
              pointsColor="text-[#0D8A85]"
              visibility="100% Live"
              visibilityColor="text-[#6D44B8]"
              credibility={`${Math.max(75, credibility)}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${Math.max(25, knowledgePoints)} KP`}
              kpColor="text-[#D95B26]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-center font-bold text-[#1C1926]">
            &ldquo;Collect the points if you must. But don&apos;t let your
            research become a ghost.&rdquo;
          </p>
        </>
      )}

      {/* ENDING 2: GHOST IN THE CACHE */}
      {endingId === 'ghost' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#9B6EF3]"
            style={{
              background:
                'linear-gradient(160deg, #1E182B 0%, #3F2159 60%, #5B2848 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#E86F3A] text-white mb-2.5">
              👻 GHOST STATUS UNLOCKED
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              You Win Punktoza...
              <br />
              as a Ghost in the Cache!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              Your Dean is thrilled! You hit{' '}
              <strong className="text-white">{points} points</strong>
              {hasSalami > 1
                ? ' by slicing one idea into tiny repetitive papers'
                : ' behind a commercial paywall'}
              .
            </p>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-2.5">
              <strong className="text-white">The cost:</strong> Paywalls block
              web crawlers—AI tools &amp; open catalogs skip you, and the{' '}
              <strong>
                Grant Agency flags missing Open-Access compliance
              </strong>
              .
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#5CE1D8]"
              visibility={`Ghost (${visibility}%)`}
              visibilityColor="text-[#FFAC81]"
              credibility={`${credibility}%`}
              credibilityColor="text-white"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#D4BBFF]"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            Can you keep your 400 points <em>without</em> disappearing from the
            algorithmic future of science?
          </p>
        </>
      )}

      {/* ENDING 3: SUPERVISOR'S CARBON COPY (PRE-DEFENSE CLONE) */}
      {endingId === 'clone' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#F4EEFF] border-2 border-[#8B5CF6]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#6D44B8] text-white mb-2.5">
              🧬 PURE ACADEMIA · THE PRE-DEFENSE CLONE
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              Supervisor&apos;s Carbon Copy!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#352F42]">
              You hit <strong>{points} points</strong> and defended smoothly by
              cloning your supervisor&apos;s exact 2004 methodology. Zero
              hostile reviews, uninterrupted stipend—and zero original thought.
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#0D8A85]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#6D44B8]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#D95B26]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Institutional risk:</strong> When
            one hostile review can erase your only paycheck, Punktoza rewards
            cloning over discovery.
          </p>
        </>
      )}

      {/* ENDING 4: BUREAUCRATIC TURF LORD (ADMIN RETREAT / LEGACY GATEKEEPER) */}
      {endingId === 'admin' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#FF9E64]"
            style={{
              background:
                'linear-gradient(155deg, #24193A 0%, #4A2875 62%, #6E324F 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#FF9E64] text-[#1C1926] mb-2.5">
              🏛️ PURE ACADEMIA · TERRITORIAL DEFENSE
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              Bureaucratic Turf Lord!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              With <strong className="text-white">{points} points</strong> and{' '}
              <strong className="text-[#FFCC9E]">
                {darkArtsUsed.join(', ')}
              </strong>
              , you escaped the point treadmill into university bureaucracy—
              outsourcing real research to junior staff while blocking modern
              methods that threaten your 1990s framework.
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#5CE1D8]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#D4BBFF]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#FFAC81]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-white"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Senior pathology:</strong> Once
            tenure is secured, Punktoza mutates from a climbing ladder into a
            weapon for territorial defense.
          </p>
        </>
      )}

      {/* ENDING 5: HYBRID TITLE ARBITRAGEUR */}
      {endingId === 'arbitrage' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#24B8B0]"
            style={{
              background:
                'linear-gradient(155deg, #122833 0%, #145B63 55%, #4A2A7A 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#5CE1D8] text-[#1C1926] mb-2.5">
              💼 HYBRID LIFECYCLE · TWO-WORLD ARBITRAGE
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              Corporate Title Arbitrageur!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              You conquered both worlds (
              <strong className="text-white">{points} pts</strong>) via{' '}
              <strong className="text-[#5CE1D8]">
                {darkArtsUsed.join(', ')}
              </strong>
              : charging premium corporate rates with your{' '}
              <strong className="text-white">Dr.</strong> title while shielding
              case studies behind client NDAs, recycling slides, and claiming
              Poland&apos;s 50% creative-cost tax break!
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#5CE1D8]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#D4BBFF]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#FFAC81]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-white"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Credibility arbitrage:</strong>{' '}
            When academia is only half your paycheck, the temptation shifts from
            survival to exploiting the gap between campus and industry.
          </p>
        </>
      )}

      {/* ENDING 6: THE NOBLE SUBSIDIZER (SYSTEMIC COMPLICITY) */}
      {endingId === 'subsidizer' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF6EC] border-2 border-[#E86F3A]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#D95B26] text-white mb-2.5">
              🪙 HYBRID LIFECYCLE · SYSTEMIC COMPLICITY
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              The Noble Subsidizer!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#4A220A]">
              You stayed ethical and funded your own conferences, software, and
              unpaid evening research out of your corporate salary. Your papers
              are solid—yet by quietly absorbing the cost of unlivable
              university wages, you helped the system avoid ever reforming
              academic pay.
            </p>

            <StatQuad
              points={`${points}/400`}
              pointsColor="text-[#D95B26]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0D8A85]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#6D44B8]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">The hidden trap:</strong> Not
            every pathology is malicious—treating academia as an expensive hobby
            subsidizes a broken wage model.
          </p>
        </>
      )}

      {/* ENDING 7: GRANDMASTER OF BUREAUCRATIC DARK ARTS */}
      {endingId === 'darkarts' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#FF9E64]"
            style={{
              background:
                'linear-gradient(155deg, #211635 0%, #4C247D 58%, #155E63 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#FF9E64] text-[#1C1926] mb-2.5">
              🧙‍♂️ ALGORITHM REVERSE-ENGINEERED
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              Grandmaster of Bureaucratic Dark Arts!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              You hit <strong className="text-white">{points} points</strong> by
              mastering the hidden loopholes of Polish evaluation:{' '}
              <strong className="text-[#FFCC9E]">
                {darkArtsUsed.join(', ')}
              </strong>
              . Your spreadsheet is immaculate—while real scholarship sits
              untouched in a basement.
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#5CE1D8]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#D4BBFF]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#FFAC81]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-white"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Goodhart&apos;s Law:</strong>{' '}
            When a measure becomes a target, it ceases to be a good measure—and
            breeds an entire underground economy of dark arts.
          </p>
        </>
      )}

      {/* ENDING 8: PAPER-MILL TYCOON */}
      {endingId === 'cartel' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#A78BFA]"
            style={{
              background: 'linear-gradient(160deg, #1E1533 0%, #52248C 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#A78BFA] text-[#1C1926] mb-2.5">
              🃏 GUEST EDITOR CARTEL SCANDAL
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              Paper-Mill Tycoon:
              <br />
              Ministry Hero, Global Pariah!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              Trading Special Issue slots and co-authorships rocketed you to{' '}
              <strong className="text-white">{points} points</strong>. Your
              department celebrates—until{' '}
              <strong className="text-white">
                integrity watchdogs &amp; Retraction Watch
              </strong>{' '}
              expose the quid pro quo ring during your promotion review.
            </p>

            <StatQuad
              points={`${points}/400 ✓`}
              pointsColor="text-[#5CE1D8]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#DDD6FE]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#FFAC81]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-white"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Perverse incentives:</strong>{' '}
            When evaluation counts raw points instead of open, verifiable
            research, trading favors beats doing science.
          </p>
        </>
      )}

      {/* ENDING 9: ERASED FROM THE N-NUMBER */}
      {endingId === 'laundered' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#F4EEFF] border-2 border-[#8B5CF6]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#6D44B8] text-white mb-2.5">
              🧹 SLOT LAUNDERED · N-NUMBER GYMNASTICS
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              Erased from the Evaluation Denominator!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#352F42]">
              You signed the &ldquo;Teaching-Only&rdquo; transfer at Year 2.
              Overnight, the faculty&apos;s average score magically jumped—not
              because anyone did better science, but because your department{' '}
              <strong>removed you from the N-number denominator</strong> while
              hiring a 1/4-time mercenary star to pad the top!
            </p>

            <StatQuad
              points={`${points}/400`}
              pointsColor="text-[#6D44B8]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0D8A85]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#D95B26]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">
              Structural dark arts:
            </strong>{' '}
            This quiet contract gymnastics rarely makes headlines, yet it
            reshapes entire departments right before evaluation closes.
          </p>
        </>
      )}

      {/* ENDING 10: BANKRUPT & DELISTED */}
      {endingId === 'delisted' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF4EB] border-2 border-[#E86F3A]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#D95B26] text-white mb-2.5">
              💸 FEE &amp; DELISTING TRAP
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              Bankrupt &amp; Delisted!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#4A220A]">
              You gambled on the 14-day Express Special Issue for fast points.
              Web of Science delisted it mid-cycle (140 → 20 pts), the{' '}
              <strong>Grant Agency rejected the €2,500 publishing fee</strong>,
              and even review vouchers couldn&apos;t save your quota.
            </p>

            <StatQuad
              points={`${points}/400`}
              pointsColor="text-[#C43A2B]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0D8A85]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#D95B26]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#6D44B8]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Key distinction:</strong>{' '}
            Pay-to-play commercial Open Access is not the same as free{' '}
            <strong>Preprints &amp; Diamond OA</strong>. Don&apos;t burn grant
            budgets chasing volatile point lists.
          </p>
        </>
      )}

      {/* ENDING 11: SCOOPED IN PEER REVIEW */}
      {endingId === 'scooped' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#E8FAF8] border-2 border-[#24B8B0]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#0D8A85] text-white mb-2.5">
              ⏰ PRIORITY LOST
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              Scooped in Peer Review!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#0E4A47]">
              Reviewer #2 stalled your manuscript for 11 months while a rival
              group published first. Because you waited for the journal instead
              of posting a{' '}
              <strong>Preprint with a permanent timestamp (DOI)</strong>, you
              lost both priority and the 400-point quota.
            </p>

            <StatQuad
              points={`${points}/400`}
              pointsColor="text-[#C43A2B]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0D8A85]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#6D44B8]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Tip for next run:</strong> Post
            an <strong>Open Preprint first</strong> (or find the hidden{' '}
            <strong>Open Access Week</strong> treasure!) to unlock the{' '}
            <strong>Priority Timestamp Shield</strong>.
          </p>
        </>
      )}

      {/* ENDING 12: CONTRACT TERMINATED (PURE PUNKTOZA) */}
      {endingId === 'fired' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF1EE] border-2 border-[#F08A55]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#C43A2B] text-white mb-2.5">
              📉 EVALUATION FAILED
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926] mb-1.5">
              {track === 'phd'
                ? 'Stipend Cut · PhD Extension Denied!'
                : track === 'hybrid'
                  ? 'Fractional Contract Not Renewed!'
                  : 'Contract Terminated!'}
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#451D17]">
              {hasPreprint || knowledgePoints >= 35
                ? `You earned ${knowledgePoints} real Knowledge Points through open science, mentorship, and slow formats—peers and AI loved it, but the Ministry spreadsheet gives almost zero survival points for them.`
                : 'Between committee grind, Mid-Term Evaluation pressure, and overnight ministerial point cuts, you missed the 400-point quota.'}
            </p>

            <StatQuad
              points={`${points}/400`}
              pointsColor="text-[#C43A2B]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0D8A85]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1C1926]"
              kp={`${knowledgePoints} KP`}
              kpColor="text-[#6D44B8]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5A5468]">
            <strong className="text-[#1C1926]">Now you feel Punktoza:</strong>{' '}
            Rational researchers don&apos;t avoid preprints, mentorship, or slow
            science because they dislike open knowledge—they avoid them because
            the scoreboard pays <strong>zero survival points</strong>.
          </p>
        </>
      )}

      {/* Open Access Audit footnote */}
      <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1F0] text-[12.5px] sm:text-[13px] text-[#5A5468] flex flex-wrap items-center justify-between gap-2">
        <span>Funder Open-Access Audit (Plan S):</span>
        <strong className={ncnCompliant ? 'text-[#0D8A85]' : 'text-[#C43A2B]'}>
          {ncnCompliant ? 'Compliant (Free Copy) ✓' : 'Non-Compliant ✕'}
        </strong>
      </div>

      {/* Cheat Code Button */}
      {canUseCheat && (
        <button
          type="button"
          onClick={onUnlockCheat}
          className="w-full min-h-[50px] rounded-[14px] py-3.5 px-4 text-[14px] sm:text-[15px] font-bold text-[#1C1926] shadow-[0_8px_20px_rgba(232,111,58,0.28)] hover:brightness-[1.03] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1926]"
          style={{
            background: 'linear-gradient(135deg, #FFB574, #F5844A)',
          }}
        >
          ⚡ Use Cheat Code: Attach Preprint (Open Access)
        </button>
      )}

      {/* Lifecycle Switcher for Next Run (highlighted after 4+ endings) */}
      <div
        className={`mt-3 rounded-2xl p-3 border ${
          unlockedCount >= 4 && unlockedCount < PRIZE_THRESHOLD
            ? 'bg-gradient-to-r from-[#F2ECFE] via-[#FFF4EB] to-[#E6F8F5] border-[#C5B3EE]'
            : 'bg-white border-[#E8E1F0]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
          <span className="text-[11.5px] font-extrabold text-[#1C1926]">
            {unlockedCount >= 4 && unlockedCount < PRIZE_THRESHOLD
              ? '✨ 4+ Endings Unlocked! Switch Lifecycle for New Endings:'
              : 'Lifecycle for Next Run:'}
          </span>
          <span className="text-[10.5px] font-bold uppercase tracking-[0.05em] text-[#6D44B8]">
            {CAREER_TRACKS[track].badge}
          </span>
        </div>
        <div
          className="grid grid-cols-3 gap-1 p-1 bg-[#EDE7F5] rounded-xl"
          role="tablist"
          aria-label="Switch Academic Lifecycle for next run"
        >
          {(['phd', 'senior', 'hybrid'] as CareerTrack[]).map((t) => {
            const active = track === t;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectTrack(t)}
                className={`min-h-[38px] py-1.5 px-1.5 rounded-lg text-[11.5px] sm:text-[12px] font-bold transition-all cursor-pointer whitespace-nowrap ${
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

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-2.5">
        <button
          type="button"
          onClick={onPlayAgain}
          className="min-h-[48px] rounded-[14px] py-3 px-3 sm:px-4 text-[13px] sm:text-[14px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap"
        >
          ↻ Play ({CAREER_TRACKS[track].shortLabel})
        </button>
        <button
          type="button"
          onClick={onOpenCollection}
          className="min-h-[48px] rounded-[14px] py-3 px-3 sm:px-4 text-[13px] sm:text-[14px] font-bold bg-transparent border-[1.5px] border-[#D5CBE6] text-[#1C1926] hover:bg-[#F2ECFE]/60 active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap tabular-nums"
        >
          🏆 Endings ({unlockedCount}/{ENDINGS_CATALOG.length})
        </button>
      </div>

      <p className="text-center text-[11.5px] text-[#5A5468] mt-3.5 opacity-85">
        Show your Trainer Card to the person next to you!
      </p>
    </section>
  );
}

interface StatQuadProps {
  points: string;
  pointsColor: string;
  visibility: string;
  visibilityColor: string;
  credibility: string;
  credibilityColor: string;
  kp: string;
  kpColor: string;
  dark: boolean;
}

function StatQuad({
  points,
  pointsColor,
  visibility,
  visibilityColor,
  credibility,
  credibilityColor,
  kp,
  kpColor,
  dark,
}: StatQuadProps) {
  const boxCls = dark
    ? 'bg-white/10 border border-white/15 rounded-xl px-1.5 py-2 sm:p-2.5 text-center text-white min-w-0'
    : 'bg-white/90 rounded-xl px-1.5 py-2 sm:p-2.5 text-center text-[#1C1926] min-w-0';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-3.5">
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5 truncate">
          Ministry
        </div>
        <div
          className={`text-[13px] sm:text-[14px] font-extrabold tabular-nums leading-tight ${pointsColor}`}
        >
          {points}
        </div>
      </div>
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5 truncate">
          AI &amp; Open
        </div>
        <div
          className={`text-[13px] sm:text-[14px] font-extrabold tabular-nums leading-tight ${visibilityColor}`}
        >
          {visibility}
        </div>
      </div>
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5 truncate">
          Credibility
        </div>
        <div
          className={`text-[13px] sm:text-[14px] font-extrabold tabular-nums leading-tight ${credibilityColor}`}
        >
          {credibility}
        </div>
      </div>
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5 truncate">
          Knowledge
        </div>
        <div
          className={`text-[13px] sm:text-[14px] font-extrabold tabular-nums leading-tight ${kpColor}`}
        >
          {kp}
        </div>
      </div>
    </div>
  );
}
