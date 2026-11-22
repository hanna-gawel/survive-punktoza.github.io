import { Trophy } from 'lucide-react';
import {
  CAREER_TRACKS,
  CareerTrack,
  ENDINGS_CATALOG,
  EndingId,
} from '../data/simulationData';

export interface RunSummaryStats {
  endingId: EndingId;
  cheatUnlocked: boolean;
  points: number;
  visibility: number;
  credibility: number;
  hasPreprint: boolean;
  hasSalami: number;
  passedMidterm: boolean;
  ncnCompliant: boolean;
  track: CareerTrack;
  unlockedCount: number;
  isNewUnlock: boolean;
}

interface ResultViewProps {
  summary: RunSummaryStats;
  onUnlockCheat: () => void;
  onPlayAgain: () => void;
  onOpenCollection: () => void;
}

export function ResultView({
  summary,
  onUnlockCheat,
  onPlayAgain,
  onOpenCollection,
}: ResultViewProps) {
  const {
    endingId,
    cheatUnlocked,
    points,
    visibility,
    credibility,
    hasPreprint,
    hasSalami,
    passedMidterm,
    ncnCompliant,
    track,
    unlockedCount,
    isNewUnlock,
  } = summary;

  const trackInfo = CAREER_TRACKS[track];
  const canUseCheat = endingId !== 'hacker';

  return (
    <section aria-label="Evaluation Outcome">
      {/* New Trainer Card banner */}
      <div className="flex items-center justify-between gap-2 mb-2.5 text-[12px] font-semibold text-[#5C5752]">
        <span>
          {trackInfo.shortLabel} ·{' '}
          {passedMidterm ? 'Mid-Term Passed' : 'Mid-Term Warned'}
        </span>
        <button
          type="button"
          onClick={onOpenCollection}
          className="inline-flex items-center gap-1 font-bold text-[#1E1D1C] hover:text-[#0A5EB0] transition-colors cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-[#C98A1B]" aria-hidden="true" />
          <span className="tabular-nums">
            {unlockedCount}/{ENDINGS_CATALOG.length}
          </span>
          {isNewUnlock && (
            <span className="text-[#2E8555] font-extrabold">· NEW!</span>
          )}
        </button>
      </div>

      {/* ENDING 1: DUAL-TYPE SYSTEM HACKER */}
      {endingId === 'hacker' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 border-2 border-[#E8AC41]"
            style={{
              background: 'linear-gradient(155deg, #FFFDF7 0%, #FFF2C9 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#1E1D1C] text-[#F7D16A] mb-2.5">
              ⚡ DUAL-TYPE EVOLUTION
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
              {cheatUnlocked
                ? 'Dual-Type Evolution Unlocked!'
                : 'You Hacked Punktoza Cleanly!'}
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#3C352B]">
              You paired <strong>Preprints + Points</strong> to beat every trap
              in Polish academia:
            </p>
            <ul className="mt-2.5 grid gap-2">
              <li className="text-[13px] leading-[1.4] flex gap-2 items-start text-[#1E1D1C]">
                <span className="shrink-0" aria-hidden="true">
                  1️⃣
                </span>
                <span>
                  <strong>Preprint first</strong> → immutable DOI timestamp
                  (anti-scoop shield), NCN Plan S Green OA compliance, and 100%
                  LLM/OpenAIRE visibility.
                </span>
              </li>
              <li className="text-[13px] leading-[1.4] flex gap-2 items-start text-[#1E1D1C]">
                <span className="shrink-0" aria-hidden="true">
                  2️⃣
                </span>
                <span>
                  <strong>200-pt journal second</strong> → satisfies the
                  Ministry spreadsheet, Szkoła Doktorska, and RDN Habilitation.
                </span>
              </li>
            </ul>

            <StatTrio
              points={`${Math.max(200, points)}/200 ✓`}
              pointsColor="text-[#2E8555]"
              visibility="100% Live"
              visibilityColor="text-[#0A5EB0]"
              credibility={`${Math.max(75, credibility)}%`}
              credibilityColor="text-[#1E1D1C]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-center font-bold text-[#1E1D1C]">
            &ldquo;Collect the points if you must. But don&apos;t let your
            research become a ghost.&rdquo;
          </p>
        </>
      )}

      {/* ENDING 2: GHOST IN THE CACHE */}
      {endingId === 'ghost' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#8E2331]"
            style={{
              background: 'linear-gradient(165deg, #1E1B1B 0%, #4E1620 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#8E2331] text-white mb-2.5">
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
              web scrapers—LLMs &amp; OpenAIRE skip you, and{' '}
              <strong>
                NCN flags missing Plan S Open Access compliance
              </strong>
              .
            </p>

            <StatTrio
              points={`${points}/200 ✓`}
              pointsColor="text-[#7CE3A6]"
              visibility={`Ghost (${visibility}%)`}
              visibilityColor="text-[#FF8C94]"
              credibility={`${credibility}%`}
              credibilityColor="text-white"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
            Can you keep your 200 points <em>without</em> disappearing from the
            algorithmic future of science?
          </p>
        </>
      )}

      {/* ENDING 3: PAPER-MILL TYCOON (ROUTE 3) */}
      {endingId === 'cartel' && (
        <>
          <div
            className="rounded-[20px] px-[18px] py-5 mb-3.5 text-white border-2 border-[#7C3AED]"
            style={{
              background: 'linear-gradient(160deg, #1E1633 0%, #3B1678 100%)',
            }}
          >
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#7C3AED] text-white mb-2.5">
              🃏 CARTEL SCANDAL
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-white mb-1.5">
              Paper-Mill Tycoon:
              <br />
              Ministry Hero, Global Pariah!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-white/85 mt-1.5">
              The co-authorship pact catapulted you to{' '}
              <strong className="text-white">{points} points</strong>. Your
              department celebrates the spreadsheet windfall—until{' '}
              <strong className="text-white">
                Retraction Watch &amp; an AI integrity audit
              </strong>{' '}
              flag the citation ring during your RDN Habilitation review.
            </p>

            <StatTrio
              points={`${points}/200 ✓`}
              pointsColor="text-[#A7F3D0]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#DDD6FE]"
              credibility={`${credibility}% (Flagged)`}
              credibilityColor="text-[#FCA5A5]"
              dark={true}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
            <strong className="text-[#1E1D1C]">Perverse incentives:</strong>{' '}
            When evaluation counts raw points instead of open, verifiable
            research, gaming the metric beats doing science.
          </p>
        </>
      )}

      {/* ENDING 4: BANKRUPT & DELISTED (ROUTE 2) */}
      {endingId === 'delisted' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF7ED] border-2 border-[#F59E0B]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#B45309] text-white mb-2.5">
              💸 APC &amp; DELISTING TRAP
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
              Bankrupt &amp; Delisted!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#452103]">
              You gambled on the 14-day Express Special Issue for fast points.
              Clarivate delisted it mid-cycle (140 → 20 pts),{' '}
              <strong>NCN rejected the €2,500 APC invoice</strong>, and the RDN
              Habilitation panel questioned the venue.
            </p>

            <StatTrio
              points={`${points}/200`}
              pointsColor="text-[#B81D1D]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#1E1D1C]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#B45309]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
            <strong className="text-[#1E1D1C]">Key distinction:</strong>{' '}
            Pay-to-play Gold OA is not the same as free{' '}
            <strong>Preprints &amp; Diamond OA</strong>. Don&apos;t burn grant
            budgets chasing volatile point lists.
          </p>
        </>
      )}

      {/* ENDING 5: SCOOPED IN PEER REVIEW (ROUTE 1) */}
      {endingId === 'scooped' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#EFF6FF] border-2 border-[#0A5EB0]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#0A5EB0] text-white mb-2.5">
              ⏰ PRIORITY LOST
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
              Scooped in Peer Review!
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#1E3A5F]">
              Reviewer #2 stalled your manuscript for 11 months while a rival
              group published first. Because you waited for the journal instead
              of posting a <strong>Preprint with an immutable DOI</strong>, you
              lost both priority and the 200-point quota.
            </p>

            <StatTrio
              points={`${points}/200`}
              pointsColor="text-[#B81D1D]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0A5EB0]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1E1D1C]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
            <strong className="text-[#1E1D1C]">Tip for next run:</strong> Post
            an <strong>Open Preprint first</strong> to unlock the{' '}
            <strong>DOI Timestamp Shield</strong> before submitting to slow
            journals.
          </p>
        </>
      )}

      {/* ENDING 6: CONTRACT TERMINATED (PURE PUNKTOZA) */}
      {endingId === 'fired' && (
        <>
          <div className="rounded-[20px] px-[18px] py-5 mb-3.5 bg-[#FFF0F0] border-2 border-[#EA6C6C]">
            <div className="inline-block text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md bg-[#B81D1D] text-white mb-2.5">
              📉 EVALUATION FAILED
            </div>
            <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mb-1.5">
              {track === 'phd'
                ? 'Stipend Cut · PhD Extension Denied!'
                : 'Contract Terminated!'}
            </h2>
            <p className="text-[13.5px] leading-[1.48] text-[#3D1F1F]">
              {hasPreprint
                ? 'You followed the open-science ideal and shared preprints. AI, NCN Plan S & peers loved it — but the Ministry spreadsheet gives 0 points for preprints.'
                : 'Between committee grind, Ocena Śródokresowa pressure, and overnight ministerial point nerfs, you missed the 200-point quota.'}
            </p>

            <StatTrio
              points={`${points}/200`}
              pointsColor="text-[#B81D1D]"
              visibility={`${visibility}%`}
              visibilityColor="text-[#0A5EB0]"
              credibility={`${credibility}%`}
              credibilityColor="text-[#1E1D1C]"
              dark={false}
            />
          </div>

          <p className="text-[13.5px] leading-[1.48] text-[#5C5752]">
            <strong className="text-[#1E1D1C]">Now you feel Punktoza:</strong>{' '}
            Rational researchers don&apos;t avoid preprints because they dislike
            open science—they avoid them because the scoreboard pays{' '}
            <strong>zero survival points</strong>.
          </p>
        </>
      )}

      {/* NCN / Open Access Audit footnote */}
      <div className="mt-3 px-3 py-2 rounded-xl bg-white border border-[#EAE2DA] text-[12px] text-[#5C5752] flex items-center justify-between gap-2">
        <span>NCN Plan S Open-Access Audit:</span>
        <strong
          className={ncnCompliant ? 'text-[#2E8555]' : 'text-[#B81D1D]'}
        >
          {ncnCompliant ? 'Compliant (Green OA) ✓' : 'Non-Compliant ✕'}
        </strong>
      </div>

      {/* Cheat Code Button */}
      {canUseCheat && (
        <button
          type="button"
          onClick={onUnlockCheat}
          className="w-full rounded-[14px] py-[14px] px-[18px] text-[14px] font-bold text-[#1E1D1C] shadow-[0_8px_20px_rgba(228,158,50,0.35)] hover:brightness-[1.03] active:scale-[0.985] transition-all flex justify-center items-center gap-2 mt-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1C]"
          style={{
            background: 'linear-gradient(135deg, #F7D16A, #E49E32)',
          }}
        >
          ⚡ Use Cheat Code: Attach Preprint (Open API)
        </button>
      )}

      <div className="grid grid-cols-2 gap-2 mt-2.5">
        <button
          type="button"
          onClick={onPlayAgain}
          className="rounded-[14px] py-3 px-3 text-[13.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap"
        >
          ↻ Play Again
        </button>
        <button
          type="button"
          onClick={onOpenCollection}
          className="rounded-[14px] py-3 px-3 text-[13.5px] font-bold bg-transparent border-[1.5px] border-[#D8CFC6] text-[#1E1D1C] hover:bg-black/[0.03] active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap tabular-nums"
        >
          🏆 Endings ({unlockedCount}/6)
        </button>
      </div>

      <p className="text-center text-[11px] text-[#5C5752] mt-3.5 opacity-85">
        Show your Trainer Card to the person next to you!
      </p>
    </section>
  );
}

interface StatTrioProps {
  points: string;
  pointsColor: string;
  visibility: string;
  visibilityColor: string;
  credibility: string;
  credibilityColor: string;
  dark: boolean;
}

function StatTrio({
  points,
  pointsColor,
  visibility,
  visibilityColor,
  credibility,
  credibilityColor,
  dark,
}: StatTrioProps) {
  const boxCls = dark
    ? 'bg-white/10 border border-white/15 rounded-xl p-2 text-center text-white'
    : 'bg-white/90 rounded-xl p-2 text-center text-[#1E1D1C]';

  return (
    <div className="grid grid-cols-3 gap-2 mt-3.5">
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5">
          Ministry
        </div>
        <div className={`text-[14px] font-extrabold tabular-nums ${pointsColor}`}>
          {points}
        </div>
      </div>
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5">
          AI &amp; Open
        </div>
        <div
          className={`text-[14px] font-extrabold tabular-nums ${visibilityColor}`}
        >
          {visibility}
        </div>
      </div>
      <div className={boxCls}>
        <div className="text-[9.5px] uppercase font-bold opacity-75 mb-0.5">
          Credibility
        </div>
        <div
          className={`text-[14px] font-extrabold tabular-nums ${credibilityColor}`}
        >
          {credibility}
        </div>
      </div>
    </div>
  );
}
