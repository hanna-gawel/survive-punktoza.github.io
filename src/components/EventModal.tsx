import { CareerTrack, TwistModalType } from '../data/simulationData';

export interface ActiveTwist {
  type: TwistModalType;
  /** Route 1: which venue was targeted by Reviewer #2 */
  targetVenueName?: string;
  targetVenuePts?: number;
  /** Year 2: whether player had 140-pt journal when Ministerial Patch hit */
  lost100OnPatch?: boolean;
  /** Year 2: whether player also got delisted during Year 2 patch */
  delistedDuringPatch?: boolean;
  /** Year 2: whether player passed the 70-pt Szkoła Doktorska / NCN mid-term bar */
  passedMidterm?: boolean;
  /** Route 1: remaining balls check so we don't offer "burn ball" if 0 left */
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
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="twist-modal-title"
      className="fixed inset-0 bg-[#140E0E]/75 backdrop-blur-[4px] flex justify-center items-center p-4 z-50"
    >
      {/* ROUTE 1: REVIEWER #2 & THE SCOOP */}
      {twist.type === 'SCOOP_TRAP' && (
        <div className="bg-white max-w-[410px] w-full rounded-[22px] px-5 py-5 text-left border-[3px] border-[#0A5EB0] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
          <div className="inline-block bg-[#0A5EB0] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · REVIEWER #2 &amp; THE SCOOP
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            11 Months Under Review... &amp; Scooped!
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#3A3632] my-3 space-y-2.5">
            <p>
              Reviewer #2 at <strong>{twist.targetVenueName}</strong> demands 6
              months of new experiments—and a rival lab just dropped an almost
              identical paper.
            </p>
            <p>
              Because you <strong>didn&apos;t post a Preprint first</strong>,
              you have no public DOI timestamp proving priority.
            </p>
          </div>

          <div className="grid gap-2 mt-4">
            {(twist.ballsAvailable ?? 0) > 0 && (
              <button
                type="button"
                onClick={onScoopBurnBall}
                className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer text-left"
              >
                <div>Burn 1 Action Ball on Major Revisions →</div>
                <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                  Keep your {twist.targetVenuePts} pts, lose 1 Ball &amp; -20%
                  Sanity
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={onScoopWithdraw}
              className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#FFF0F0] border-[1.5px] border-[#EA6C6C] text-[#7D1818] hover:bg-[#FFE4E4] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Withdraw Manuscript &amp; Save Your Action Ball</div>
              <div className="text-[11.5px] font-medium text-[#7D1818]/80 mt-0.5">
                Lose -{twist.targetVenuePts} pts &amp; -15% Sanity (Scooped!)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 2: SZKOŁA DOKTORSKA MID-TERM EVALUATION + MINISTERIAL PATCH */}
      {twist.type === 'MIDTERM_AND_PATCH' && (
        <div className="bg-white max-w-[410px] w-full rounded-[22px] px-5 py-5 text-left border-[3px] border-[#EA6C6C] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
          <div className="inline-block bg-[#B81D1D] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 2 CHECKPOINT · PATCH UPDATE
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            {track === 'phd'
              ? 'Ocena Śródokresowa & Overnight Patch!'
              : 'NCN Mid-Term Check & Overnight Patch!'}
          </h2>

          {/* Mid-term evaluation box */}
          <div
            className={`rounded-xl p-3 my-3 border text-[13px] leading-[1.42] ${
              twist.passedMidterm
                ? 'bg-[#EEF8F2] border-[#A7DEC0] text-[#184C31]'
                : 'bg-[#FFF3E0] border-[#F0C27B] text-[#663C00]'
            }`}
          >
            <div className="font-extrabold mb-0.5">
              {track === 'phd'
                ? 'Szkoła Doktorska · Ocena Śródokresowa'
                : 'Mid-Cycle NCN & Faculty Review'}
              : {twist.passedMidterm ? 'PASSED ✓' : 'WARNING ▲ (-15% Sanity)'}
            </div>
            {twist.passedMidterm ? (
              <span>
                Committee notes your spreadsheet momentum so far. Halfway there!
              </span>
            ) : (
              <span>
                Under 70 pts at mid-term! The commission warns:{' '}
                <em>
                  &ldquo;Open preprints and committees don&apos;t fill our
                  doctoral evaluation form—hit 200 pts or lose funding.&rdquo;
                </em>
              </span>
            )}
          </div>

          <div className="text-[13.5px] leading-[1.46] text-[#1E1D1C] space-y-2.5">
            <p>
              <strong>Ministerial Spreadsheet Edited Overnight:</strong>{' '}
              {twist.lost100OnPatch ? (
                <>
                  Your <strong>140-pt International Journal</strong> was{' '}
                  <strong className="text-[#B81D1D]">
                    NERFED to 40 pts (-100 pts!)
                  </strong>
                  , while an obscure local journal jumped 20 → 200 pts.
                </>
              ) : (
                <>
                  The <strong>140-pt International Journal</strong> just got{' '}
                  <strong className="text-[#B81D1D]">NERFED to 40 pts</strong>,
                  while an obscure local journal jumped to 200 pts.
                </>
              )}
            </p>
            {twist.delistedDuringPatch && (
              <p className="p-2.5 rounded-xl bg-[#FFF0F0] border border-[#F3B7B7] text-[#7D1818] text-[12.5px]">
                <strong>Double Blow (Clarivate Audit):</strong> Your Express
                Special Issue was also flagged &amp; delisted (140 → 20 pts,
                -120 pts!) and NCN rejected the €2,500 APC invoice.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onAcceptMidtermPatch}
            className="w-full rounded-[14px] py-3.5 px-4 text-[14.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all mt-4 cursor-pointer"
          >
            Accept Reality &amp; Enter Year 3 →
          </button>
        </div>
      )}

      {/* ROUTE 2: EXPRESS SPECIAL ISSUE DELISTING & NCN APC REJECTION */}
      {twist.type === 'DELIST_APC' && (
        <div className="bg-white max-w-[410px] w-full rounded-[22px] px-5 py-5 text-left border-[3px] border-[#D97706] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
          <div className="inline-block bg-[#B45309] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · DELISTED &amp; APC BILL
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            Clarivate Delisting &amp; €2,500 Invoice!
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#3A3632] my-3 space-y-2.5">
            <p>
              Your <strong>14-day Express Special Issue</strong> was stripped
              from Web of Science! Its Ministry score crashed from{' '}
              <strong className="text-[#B81D1D]">140 → 20 pts (-120 pts)</strong>
              .
            </p>
            <p>
              Worse: <strong>NCN refuses to reimburse</strong> the €2,500 APC
              for a grey-zone special issue, and the{' '}
              <strong>RDN Habilitation Committee</strong> flags it on your CV.
            </p>
          </div>

          <div className="grid gap-2 mt-4">
            <button
              type="button"
              onClick={onDelistPayOutOfPocket}
              className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Pay €2,500 Out of Pocket &amp; Keep 20 pts</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                -25% Sanity &amp; Credibility (Budget wiped out)
              </div>
            </button>
            <button
              type="button"
              onClick={onDelistRetract}
              className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#FFF7ED] border-[1.5px] border-[#F59E0B] text-[#78350F] hover:bg-[#FFEDD5] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Refuse to Pay &amp; Retract Paper</div>
              <div className="text-[11.5px] font-medium text-[#78350F]/80 mt-0.5">
                Lose remaining 20 pts &amp; -15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 3: CO-AUTHORSHIP CARTEL vs NCN PLAN S AUDIT */}
      {twist.type === 'CARTEL_OFFER' && (
        <div className="bg-white max-w-[410px] w-full rounded-[22px] px-5 py-5 text-left border-[3px] border-[#5B21B6] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
          <div className="inline-block bg-[#5B21B6] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 DILEMMA · INBOX OFFER
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1E1D1C]"
          >
            The Co-Authorship Cartel Pact
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#3A3632] my-3 space-y-2.5">
            <p>
              A senior professor slides into your inbox:{' '}
              <em>
                &ldquo;Put my name on your draft, and I&apos;ll add you to two
                of my papers. Instant <strong>+120 Ministry Points</strong>,
                zero extra work. Everybody does it for habilitation!&rdquo;
              </em>
            </p>
            <p className="text-[12.5px] text-[#5C5752]">
              Meanwhile, an <strong>NCN Plan S Open-Access Audit</strong> is
              scheduled for Year 4:{' '}
              {hasPreprint ? (
                <strong className="text-[#2E8555]">
                  Your Preprint already satisfies NCN Green OA!
                </strong>
              ) : (
                <span>
                  Paywall-only grants face an open-access compliance penalty.
                </span>
              )}
            </p>
          </div>

          <div className="grid gap-2 mt-4">
            <button
              type="button"
              onClick={onCartelAccept}
              className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#3B1678] text-white hover:bg-[#4C1D95] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Accept the Pact (+120 PTS, 0 Balls)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Instant spreadsheet boost · -45% Credibility (Retraction risk!)
              </div>
            </button>
            <button
              type="button"
              onClick={onCartelDecline}
              className="w-full rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#F7F5F2] border-[1.5px] border-[#D8CFC6] text-[#1E1D1C] hover:bg-[#EFEAE4] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Decline Pact &amp; Stay Clean for NCN Audit</div>
              <div className="text-[11.5px] font-medium text-[#5C5752] mt-0.5">
                +10% Credibility · Rely on your final Action Ball
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
