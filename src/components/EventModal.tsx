import { CareerTrack, TwistModalType } from '../data/simulationData';

export interface ActiveTwist {
  type: TwistModalType;
  targetVenueName?: string;
  targetVenuePts?: number;
  lost100OnPatch?: boolean;
  delistedDuringPatch?: boolean;
  passedMidterm?: boolean;
  ballsAvailable?: number;
}

interface EventModalProps {
  twist: ActiveTwist;
  track: CareerTrack;
  hasPreprint: boolean;
  onScoopBurnBall: () => void;
  onScoopWithdraw: () => void;
  onAcceptMidtermPatch: () => void;
  onDelistPayOutOfPocket: () => void;
  onDelistRetract: () => void;
  onCartelAccept: () => void;
  onCartelDecline: () => void;
}

export function EventModal({
  twist,
  track,
  hasPreprint,
  onScoopBurnBall,
  onScoopWithdraw,
  onAcceptMidtermPatch,
  onDelistPayOutOfPocket,
  onDelistRetract,
  onCartelAccept,
  onCartelDecline,
}: EventModalProps) {
  const modalBoxBase =
    'bg-white w-full sm:max-w-[440px] md:max-w-[480px] max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-[26px] sm:rounded-[22px] px-5 pt-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.38)]';

  const safeBottomStyle = {
    paddingBottom: 'max(22px, env(safe-area-inset-bottom))',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="twist-modal-title"
      className="fixed inset-0 bg-[#140E0E]/75 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      {/* ROUTE 1: REVIEWER #2 & THE SCOOP */}
      {twist.type === 'SCOOP_TRAP' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#0A5EB0]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#0A5EB0] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · REVIEWER #2 &amp; THE SCOOP
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            11 Months Under Review... &amp; Scooped!
          </h2>
          <div className="text-[14px] leading-[1.5] text-[#3A3632] my-3 space-y-2.5">
            <p>
              Reviewer #2 at <strong>{twist.targetVenueName}</strong> demands 6
              months of new experiments—and a rival lab just published an almost
              identical paper.
            </p>
            <p>
              Because you <strong>didn&apos;t post a Preprint first</strong>,
              you have no public timestamp (DOI) proving you discovered it
              first.
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            {(twist.ballsAvailable ?? 0) > 0 && (
              <button
                type="button"
                onClick={onScoopBurnBall}
                className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer text-left"
              >
                <div>Burn 1 Action Ball on Major Revisions →</div>
                <div className="text-[12px] font-medium text-white/75 mt-0.5">
                  Keep your {twist.targetVenuePts} pts, lose 1 Ball &amp; -20%
                  Sanity
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={onScoopWithdraw}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#FFF0F0] border-[1.5px] border-[#EA6C6C] text-[#7D1818] hover:bg-[#FFE4E4] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Withdraw Manuscript &amp; Save Your Action Ball</div>
              <div className="text-[12px] font-medium text-[#7D1818]/80 mt-0.5">
                Lose -{twist.targetVenuePts} pts &amp; -15% Sanity (Scooped!)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 2: MID-TERM EVALUATION + MINISTERIAL PATCH */}
      {twist.type === 'MIDTERM_AND_PATCH' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#EA6C6C]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#B81D1D] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 2 CHECKPOINT · MINISTRY PATCH
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            {track === 'phd'
              ? 'Mid-Term PhD Review & Overnight Patch!'
              : 'Mid-Cycle Review & Overnight Patch!'}
          </h2>

          {/* Mid-term evaluation box */}
          <div
            className={`rounded-xl p-3 my-3 border text-[13.5px] leading-[1.45] ${
              twist.passedMidterm
                ? 'bg-[#EEF8F2] border-[#A7DEC0] text-[#184C31]'
                : 'bg-[#FFF3E0] border-[#F0C27B] text-[#663C00]'
            }`}
          >
            <div className="font-extrabold mb-0.5">
              {track === 'phd'
                ? 'Doctoral School · Mid-Term Evaluation'
                : 'Grant Agency & Faculty Progress Check'}
              : {twist.passedMidterm ? 'PASSED ✓' : 'WARNING ▲ (-15% Sanity)'}
            </div>
            {twist.passedMidterm ? (
              <span>
                The committee notes your point progress so far. Halfway there!
              </span>
            ) : (
              <span>
                Under 70 pts at mid-term! The commission warns:{' '}
                <em>
                  &ldquo;Open preprints and committees don&apos;t fill our
                  official evaluation form—hit 200 pts or lose funding.&rdquo;
                </em>
              </span>
            )}
          </div>

          <div className="text-[14px] leading-[1.5] text-[#1E1D1C] space-y-2.5">
            <p>
              <strong>Ministry Point List Edited Overnight:</strong>{' '}
              {twist.lost100OnPatch ? (
                <>
                  Your <strong>140-pt International Journal</strong> was{' '}
                  <strong className="text-[#B81D1D]">
                    cut down to 40 pts (-100 pts!)
                  </strong>
                  , while an obscure local journal jumped from 20 → 200 pts.
                </>
              ) : (
                <>
                  The <strong>140-pt International Journal</strong> was just{' '}
                  <strong className="text-[#B81D1D]">cut down to 40 pts</strong>
                  , while an obscure local journal jumped to 200 pts.
                </>
              )}
            </p>
            {twist.delistedDuringPatch && (
              <p className="p-2.5 rounded-xl bg-[#FFF0F0] border border-[#F3B7B7] text-[#7D1818] text-[13px]">
                <strong>Double Blow (Index Audit):</strong> Your Express Special
                Issue was also delisted (140 → 20 pts, -120 pts!) and the Grant
                Agency rejected the €2,500 publishing fee invoice.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onAcceptMidtermPatch}
            className="w-full min-h-[48px] rounded-[14px] py-3.5 px-4 text-[14.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all mt-4 cursor-pointer"
          >
            Accept Reality &amp; Enter Year 3 →
          </button>
        </div>
      )}

      {/* ROUTE 2: EXPRESS SPECIAL ISSUE DELISTING & PUBLISHING FEE REJECTION */}
      {twist.type === 'DELIST_APC' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#D97706]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#B45309] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · DELISTED &amp; FEE BILL
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            Journal Delisted &amp; €2,500 Invoice!
          </h2>
          <div className="text-[14px] leading-[1.5] text-[#3A3632] my-3 space-y-2.5">
            <p>
              Your <strong>14-day Express Special Issue</strong> was stripped
              from Web of Science! Its Ministry score crashed from{' '}
              <strong className="text-[#B81D1D]">140 → 20 pts (-120 pts)</strong>
              .
            </p>
            <p>
              Worse: the <strong>National Grant Agency (NCN)</strong> refuses to
              reimburse the €2,500 publishing fee (APC) for a grey-zone special
              issue, and the <strong>Promotion Board</strong> flags it on your
              CV.
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onDelistPayOutOfPocket}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Pay €2,500 Out of Pocket &amp; Keep 20 pts</div>
              <div className="text-[12px] font-medium text-white/75 mt-0.5">
                -25% Sanity &amp; Credibility (Budget wiped out)
              </div>
            </button>
            <button
              type="button"
              onClick={onDelistRetract}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#FFF7ED] border-[1.5px] border-[#F59E0B] text-[#78350F] hover:bg-[#FFEDD5] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Refuse to Pay &amp; Retract Paper</div>
              <div className="text-[12px] font-medium text-[#78350F]/80 mt-0.5">
                Lose remaining 20 pts &amp; -15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 3: CO-AUTHORSHIP CARTEL vs OPEN-ACCESS GRANT AUDIT */}
      {twist.type === 'CARTEL_OFFER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#5B21B6]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#5B21B6] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 DILEMMA · INBOX OFFER
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            The Co-Authorship Cartel Pact
          </h2>
          <div className="text-[14px] leading-[1.5] text-[#3A3632] my-3 space-y-2.5">
            <p>
              A senior professor slides into your inbox:{' '}
              <em>
                &ldquo;Put my name on your draft, and I&apos;ll add you to two
                of my papers. Instant <strong>+120 Ministry Points</strong>,
                zero extra work. Everybody does it for promotion!&rdquo;
              </em>
            </p>
            <p className="text-[13px] text-[#5C5752]">
              Meanwhile, an <strong>Open-Access Grant Audit (Plan S)</strong> is
              scheduled for Year 4:{' '}
              {hasPreprint ? (
                <strong className="text-[#2E8555]">
                  Your Preprint already satisfies the Open-Access rule!
                </strong>
              ) : (
                <span>
                  Paywall-only grants face an open-access compliance penalty.
                </span>
              )}
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onCartelAccept}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#3B1678] text-white hover:bg-[#4C1D95] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Accept the Pact (+120 PTS, 0 Balls)</div>
              <div className="text-[12px] font-medium text-white/75 mt-0.5">
                Instant spreadsheet boost · -45% Credibility (Retraction risk!)
              </div>
            </button>
            <button
              type="button"
              onClick={onCartelDecline}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#F7F5F2] border-[1.5px] border-[#D8CFC6] text-[#1E1D1C] hover:bg-[#EFEAE4] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Decline Pact &amp; Stay Clean for Grant Audit</div>
              <div className="text-[12px] font-medium text-[#5C5752] mt-0.5">
                +10% Credibility · Rely on your final Action Ball
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
