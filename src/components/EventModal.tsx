import { CareerTrack, TwistModalType } from '../data/simulationData';
import { CrowKeyEmblem } from './CrowKeyEmblem';

export interface ActiveTwist {
  type: TwistModalType;
  targetVenueName?: string;
  targetVenuePts?: number;
  lost100OnPatch?: boolean;
  passedMidterm?: boolean;
  ballsAvailable?: number;
}

interface EventModalProps {
  twist: ActiveTwist;
  track: CareerTrack;
  hasPreprint: boolean;
  onScoopBurnBall: () => void;
  onScoopWithdraw: () => void;
  onCloneAccept: () => void;
  onCloneInnovate: () => void;
  onTunnelVisionAccept: () => void;
  onTunnelVisionMentor: () => void;
  onHybridNdaAccept: () => void;
  onHybridWhitepaperAccept: () => void;
  onHybridOpenData: () => void;
  onAcceptMidtermPatch: () => void;
  onAcceptSlotLaundering: () => void;
  onAcceptTaxBreakParasite: () => void;
  onDelistVoucherEconomy: () => void;
  onDelistApcLaunderingGrant: () => void;
  onDelistRetract: () => void;
  onCartelAccept: () => void;
  onCartelDecline: () => void;
  onTourismAccept: () => void;
  onFlatteryAccept: () => void;
  onTourismDecline: () => void;
  onFrankensteinAccept: () => void;
  onSlowFormatDefend: () => void;
  onAdminRetreatAccept: () => void;
  onLegacyGatekeeperAccept: () => void;
  onSeniorSupportJuniors: () => void;
  onTitleArbitrageAccept: () => void;
  onSubsidizerAccept: () => void;
  onHybridReformRefuse: () => void;
  onSabbaticalRestoreBall: () => void;
  onSabbaticalOpenWrite: () => void;
  onChristmasWisdomOpen: () => void;
  onChristmasCollabPaper: () => void;
  onManagerSignBlindly: () => void;
  onManagerEnforceRigor: () => void;
  onManagerOpenWorkshop: () => void;
  onGuerrillaOaAccept: () => void;
  onGuerrillaOaAdvocate: () => void;
  onClaimOaWeekTreasure: () => void;
}

export function EventModal({
  twist,
  track,
  hasPreprint,
  onScoopBurnBall,
  onScoopWithdraw,
  onCloneAccept,
  onCloneInnovate,
  onTunnelVisionAccept,
  onTunnelVisionMentor,
  onHybridNdaAccept,
  onHybridWhitepaperAccept,
  onHybridOpenData,
  onAcceptMidtermPatch,
  onAcceptSlotLaundering,
  onAcceptTaxBreakParasite,
  onDelistVoucherEconomy,
  onDelistApcLaunderingGrant,
  onDelistRetract,
  onCartelAccept,
  onCartelDecline,
  onTourismAccept,
  onFlatteryAccept,
  onTourismDecline,
  onFrankensteinAccept,
  onSlowFormatDefend,
  onAdminRetreatAccept,
  onLegacyGatekeeperAccept,
  onSeniorSupportJuniors,
  onTitleArbitrageAccept,
  onSubsidizerAccept,
  onHybridReformRefuse,
  onSabbaticalRestoreBall,
  onSabbaticalOpenWrite,
  onChristmasWisdomOpen,
  onChristmasCollabPaper,
  onManagerSignBlindly,
  onManagerEnforceRigor,
  onManagerOpenWorkshop,
  onGuerrillaOaAccept,
  onGuerrillaOaAdvocate,
  onClaimOaWeekTreasure,
}: EventModalProps) {
  const modalBoxBase =
    'bg-[#FAF8FC] w-full sm:max-w-[470px] md:max-w-[520px] max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-[26px] sm:rounded-[22px] px-5 pt-5 text-left shadow-[0_24px_60px_rgba(24,14,48,0.42)]';

  const safeBottomStyle = {
    paddingBottom: 'max(22px, env(safe-area-inset-bottom))',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="twist-modal-title"
      className="fixed inset-0 bg-[#171224]/75 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      {/* HIDDEN TREASURE: INTERNATIONAL OPEN ACCESS WEEK */}
      {twist.type === 'OA_WEEK_TREASURE' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#24B8B0]`}
          style={{
            ...safeBottomStyle,
            background:
              'linear-gradient(160deg, #F0FDFB 0%, #F7F2FF 55%, #FFF6EE 100%)',
          }}
        >
          <div className="inline-block bg-[#0D8A85] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            🔓 HIDDEN ACADEMIC TREASURE · OCT 19–25
          </div>
          <h2
            id="twist-modal-title"
            className="text-[21px] sm:text-[23px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            You Found International Open Access Week!
          </h2>
          <div className="text-[14px] leading-[1.5] text-[#352F42] my-3 space-y-2.5">
            <p>
              Instead of chasing spreadsheet points, you joined workshops on{' '}
              <strong>Diamond Open Access</strong>,{' '}
              <strong>Rights Retention</strong>, and{' '}
              <strong>open infrastructure</strong>.
            </p>
            <div className="bg-white/90 border border-[#BFEAE6] rounded-2xl p-3 text-[13px] space-y-1.5">
              <div className="font-extrabold text-[#0D8A85]">
                Treasure Unlocked (Costs 0 Action Balls!):
              </div>
              <ul className="space-y-1 text-[#1C1926]">
                <li>
                  • <strong>+35 Knowledge Points (KP)</strong> &amp;{' '}
                  <strong>+25% AI &amp; Open Visibility</strong>
                </li>
                <li>
                  • <strong>+15% Credibility</strong> &amp;{' '}
                  <strong>Free Preprint Priority Shield (DOI)</strong>
                </li>
                <li>
                  • <strong>OA Week Scholar Stamp</strong> on your Trainer Card
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onClaimOaWeekTreasure}
            className="w-full min-h-[50px] rounded-[14px] py-3.5 px-4 text-[14.5px] font-bold text-white active:scale-[0.985] transition-all mt-3 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0D8A85, #6D44B8)',
            }}
          >
            Claim Knowledge Treasure &amp; Continue →
          </button>
        </div>
      )}

      {/* YEAR 1 (PURE PHD): THE PRE-DEFENSE "CLONE" */}
      {twist.type === 'LIFECYCLE_CLONE' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#6D44B8] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 1 · PURE ACADEMIA (DOCTORAL STAGE)
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            The Pre-Defense &ldquo;Clone&rdquo; Ultimatum
          </h2>
          <div className="text-[13.5px] leading-[1.5] text-[#352F42] my-3 space-y-2">
            <p>
              Your supervisor pulls you into their office:{' '}
              <em>
                &ldquo;Drop that original research design! Copy my exact 2004
                methodology and niche. If you innovate, an external reviewer
                could delay your defense and cut off your stipend.&rdquo;
              </em>
            </p>
            <p className="text-[12.5px] text-[#5A5468]">
              When the university is your only paycheck, conformity buys safety.
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onCloneAccept}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🧬 Become Your Supervisor&apos;s Carbon Copy (+60 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Safe reviews &amp; steady stipend · -15% Credibility · 0 originality
              </div>
            </button>
            <button
              type="button"
              onClick={onCloneInnovate}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>💡 Keep Your Original Research Instincts (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +25 Knowledge Points · +15% AI &amp; Open · +10% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 1 (PURE SENIOR): HABILITATION TUNNEL VISION */}
      {twist.type === 'LIFECYCLE_TUNNEL_VISION' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#E86F3A]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#D95B26] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 1 · PURE ACADEMIA (EARLY-TO-MID CAREER)
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Habilitation Tunnel Vision
          </h2>
          <div className="text-[13.5px] leading-[1.5] text-[#352F42] my-3 space-y-2">
            <p>
              A senior colleague hands you the Promotion Board (RDN) checklist:{' '}
              <em>
                &ldquo;Treat teaching, student mentorship, and public outreach
                as wasted time for the next 5 years. Stop reading outside your
                tiny sub-field—feed only your monograph and points!&rdquo;
              </em>
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onTunnelVisionAccept}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🎯 Lock Into Habilitation Tunnel Vision (+75 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Ignore students &amp; outreach to feed the RDN checklist · -20%
                Credibility
              </div>
            </button>
            <button
              type="button"
              onClick={onTunnelVisionMentor}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🌱 Mentor Students &amp; Read Across Fields (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +30 Knowledge Points · +10% AI &amp; Open · +15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 1 (HYBRID): THE "NDA SHIELD" & WHITEPAPER LAUNDERING */}
      {twist.type === 'HYBRID_NDA_WHITEPAPER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#0D8A85]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#0D8A85] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 1 · HYBRID LIFECYCLE (TWO-WORLD ARBITRAGE)
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Corporate Deliverable Meets Peer Review!
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              You already got paid €12,000 in your day job to write a market
              audit. Now a 100-point journal&apos;s peer reviewer asks for your{' '}
              <strong>raw data and replication scripts</strong>.
            </p>
            <p className="text-[12.5px] text-[#5A5468]">
              Two classic hybrid shortcuts sit right in front of you:
            </p>
          </div>

          <div className="grid gap-2 mt-3.5">
            <button
              type="button"
              onClick={onHybridNdaAccept}
              className="w-full min-h-[52px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🛡️ Deploy the &ldquo;NDA Shield&rdquo; (+85 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Blame &ldquo;client confidentiality&rdquo; to hide unverifiable
                data · -25% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onHybridWhitepaperAccept}
              className="w-full min-h-[52px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#F2ECFE] border-[1.5px] border-[#8B5CF6] text-[#4C2899] hover:bg-[#E7DCFD] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>📑 Whitepaper Laundering (+75 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#4C2899]/80 mt-0.5">
                Slap 3 pages of citations onto your paid client report · -20%
                Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onHybridOpenData}
              className="w-full min-h-[48px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🔓 Share Anonymized Open Data &amp; Code (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +30 Knowledge Points · +20% AI &amp; Open · +15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 1: REVIEWER #2 & THE SCOOP */}
      {twist.type === 'SCOOP_TRAP' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#0D8A85]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#0D8A85] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · REVIEWER #2 &amp; THE SCOOP
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            11 Months Under Review... &amp; Scooped!
          </h2>
          <div className="text-[14px] leading-[1.5] text-[#352F42] my-3 space-y-2.5">
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
                className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer text-left"
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
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Withdraw Manuscript &amp; Save Your Action Ball</div>
              <div className="text-[12px] font-medium text-[#8A3611]/80 mt-0.5">
                Lose -{twist.targetVenuePts} pts &amp; -15% Sanity (Scooped!)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 2: MID-TERM EVALUATION + SLOT LAUNDERING + MERCENARY 1/4 FTE + 50% TAX-BREAK PARASITE */}
      {twist.type === 'MIDTERM_AND_PATCH' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#E86F3A]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#D95B26] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 2 CHECKPOINT · DARK ARTS &amp; PATCH
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            {track === 'phd'
              ? 'Mid-Term Evaluation & Overnight Patch!'
              : track === 'hybrid'
                ? 'Fractional Contract Review & Overnight Patch!'
                : 'Mid-Cycle Audit & Overnight Patch!'}
          </h2>

          {/* Mid-term status box */}
          <div
            className={`rounded-xl p-3 my-3 border text-[13px] leading-[1.45] ${
              twist.passedMidterm
                ? 'bg-[#E6F8F5] border-[#8ADBD2] text-[#0C5E5A]'
                : 'bg-[#FFF3E6] border-[#F4AE7A] text-[#7A350E]'
            }`}
          >
            <div className="font-extrabold mb-0.5">
              {track === 'phd'
                ? 'Doctoral School · Mid-Term Evaluation'
                : track === 'hybrid'
                  ? 'Hybrid Contract · Mid-Cycle Check'
                  : 'Faculty Evaluation · Mid-Cycle Check'}
              : {twist.passedMidterm ? 'PASSED ✓' : 'BELOW 140 PTS ▲ (-15% Sanity)'}
            </div>
            {track === 'hybrid' ? (
              <span>
                <strong>The 50% Tax-Break / Prestige Parasite:</strong> HR
                reminds you that you can shrink to a 1/4-time contract—keeping
                Poland&apos;s <strong>50% creative-cost tax break (KUP)</strong>
                , database access, and your <strong>Dr. title</strong> while
                recycling old lectures!
              </span>
            ) : twist.passedMidterm ? (
              <span>
                You passed mid-term! Meanwhile, your Dean just hired{' '}
                <strong>Mercenary Part-Timers (1/4-time foreign stars)</strong>{' '}
                with zero teaching duties solely to harvest their 200-pt slots.
              </span>
            ) : (
              <span>
                <strong>Slot Laundering (&ldquo;N-Number&rdquo; Gymnastics):</strong>{' '}
                Your Dean quietly pressures you to switch to a{' '}
                <strong>Teaching-Only Contract</strong>—erasing you from the
                faculty&apos;s research denominator so their average score jumps
                without anyone doing better science!
              </span>
            )}
          </div>

          <div className="text-[13.5px] leading-[1.48] text-[#1C1926] space-y-2">
            <p>
              <strong>Ministry Point List Edited Overnight:</strong>{' '}
              {twist.lost100OnPatch ? (
                <>
                  Your <strong>140-pt International Journal</strong> was{' '}
                  <strong className="text-[#C43A2B]">
                    cut down to 40 pts (-100 pts!)
                  </strong>
                  , while an obscure local journal jumped 20 → 200 pts.
                </>
              ) : (
                <>
                  The <strong>140-pt International Journal</strong> was just{' '}
                  <strong className="text-[#C43A2B]">cut down to 40 pts</strong>
                  , while an obscure local journal jumped to 200 pts.
                </>
              )}
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            {track === 'hybrid' && (
              <button
                type="button"
                onClick={onAcceptTaxBreakParasite}
                className="w-full min-h-[52px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#F2ECFE] border-[1.5px] border-[#8B5CF6] text-[#4C2899] hover:bg-[#E7DCFD] active:scale-[0.985] transition-all cursor-pointer text-left"
              >
                <div>💼 Milk the 50% Tax Break &amp; 1/4-Time Prestige (+60 PTS)</div>
                <div className="text-[11.5px] font-medium text-[#4C2899]/80 mt-0.5">
                  Recycle old slides, keep database logins &amp; tax perks · -20%
                  Credibility
                </div>
              </button>
            )}
            {!twist.passedMidterm && (
              <button
                type="button"
                onClick={onAcceptSlotLaundering}
                className="w-full min-h-[52px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
              >
                <div>🧹 Accept &ldquo;Teaching-Only&rdquo; Slot Laundering</div>
                <div className="text-[11.5px] font-medium text-[#8A3611]/80 mt-0.5">
                  Exit the N-number denominator immediately (Secret Ending!)
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={onAcceptMidtermPatch}
              className="w-full min-h-[48px] rounded-[14px] py-3.5 px-4 text-[14.5px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer"
            >
              {twist.passedMidterm
                ? 'Accept Reality & Enter Year 3 →'
                : 'Refuse Transfer & Keep Fighting →'}
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 2: DELISTING + REVIEW-VOUCHER ECONOMY + APC-LAUNDERING GRANTS */}
      {twist.type === 'DELIST_APC' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#E86F3A]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#D95B26] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            PLOT TWIST · DELISTED &amp; €2,500 FEE
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Journal Delisted &amp; Unpaid APC Bill!
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              Your <strong>14-day Express Special Issue</strong> was stripped
              from Web of Science! Its score crashed{' '}
              <strong className="text-[#C43A2B]">140 → 20 pts (-120 pts)</strong>
              , and the Grant Agency refused to reimburse the €2,500 publishing
              fee (APC).
            </p>
            <p className="text-[12.5px] text-[#5A5468]">
              How do you survive the invoice? Two quiet Polish dark arts beckon:
            </p>
          </div>

          <div className="grid gap-2 mt-3.5">
            <button
              type="button"
              onClick={onDelistVoucherEconomy}
              className="w-full min-h-[52px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🎟️ Review-Voucher Economy (48h Speed Reviews)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Churn 10 superficial 2-paragraph reviews for fee vouchers · Keep
                20 pts, -25% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onDelistApcLaunderingGrant}
              className="w-full min-h-[52px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#F2ECFE] border-[1.5px] border-[#8B5CF6] text-[#4C2899] hover:bg-[#E7DCFD] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🏦 Write an &ldquo;APC-Laundering Grant&rdquo;</div>
              <div className="text-[11.5px] font-medium text-[#4C2899]/80 mt-0.5">
                Disguise the fee inside a grant for half-finished work · Salvage
                +60 pts, -30% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onDelistRetract}
              className="w-full min-h-[48px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F4F0FA] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Refuse Dark Arts &amp; Retract Paper</div>
              <div className="text-[11.5px] font-medium text-[#5A5468] mt-0.5">
                Lose remaining 20 pts &amp; -10% Credibility (Stay clean)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 3 (PURE SENIOR): ADMINISTRATIVE RETREAT vs LEGACY GATEKEEPER */}
      {twist.type === 'LIFECYCLE_ADMIN_GATEKEEPER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#6D44B8] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 · PURE ACADEMIA (TERRITORIAL DEFENSE)
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Senior Power Play: Retreat or Gatekeep?
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              With promotion secured, the point treadmill feels beneath you—and
              brilliant young scholars using computational tools make your 1990s
              framework look dated. How do you protect your turf?
            </p>
          </div>

          <div className="grid gap-2 mt-3.5">
            <button
              type="button"
              onClick={onAdminRetreatAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🏛️ The Administrative Retreat (+115 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Become Vice-Dean &amp; committee chair—outsource research output
                to junior staff · -30% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onLegacyGatekeeperAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🧱 Become the Legacy Gatekeeper (+95 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#8A3611]/80 mt-0.5">
                Weaponize Punktoza to block computational tools &amp;
                interdisciplinary hires · -35% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onSeniorSupportJuniors}
              className="w-full min-h-[48px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🤝 Champion New Methods &amp; Junior Hires (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +35 Knowledge Points · +20% AI &amp; Open · +15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* YEAR 3 (HYBRID): TITLE ARBITRAGE vs THE "SUBSIDIZER" TRAP */}
      {twist.type === 'HYBRID_ARBITRAGE_SUBSIDIZER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#0D8A85]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#0D8A85] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 · HYBRID LIFECYCLE (TWO-WORLD TENSION)
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Title Arbitrage or the &ldquo;Subsidizer&rdquo; Trap?
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              Your corporate day job pays 4× your university salary, while your
              faculty budget just froze travel funds. Two opposite hybrid traps
              open up:
            </p>
          </div>

          <div className="grid gap-2 mt-3.5">
            <button
              type="button"
              onClick={onTitleArbitrageAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>💼 Play Title Arbitrage on Both Sides (+105 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Charge premium consulting fees with your Dr. title, dismiss
                methodology on campus · -35% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onSubsidizerAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🪙 Fall into the &ldquo;Subsidizer&rdquo; Trap (+55 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#8A3611]/80 mt-0.5">
                Self-fund conferences &amp; absorb unpaid overtime from your
                corporate paycheck · +15 KP (Helps system avoid pay reform!)
              </div>
            </button>

            <button
              type="button"
              onClick={onHybridReformRefuse}
              className="w-full min-h-[48px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>⚖️ Refuse Unpaid Overtime &amp; Demand Rigor (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +25 Knowledge Points · +15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 3A: GUEST EDITOR QUID PRO QUO & CO-AUTHORSHIP CARTEL */}
      {twist.type === 'CARTEL_OFFER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#6D44B8] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 DARK ART · THE PUBLISHING UNDERGROUND
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Guest Editor Quid Pro Quo Pact
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2.5">
            <p>
              A senior colleague emails you:{' '}
              <em>
                &ldquo;Become Guest Editor of my Special Issue and I&apos;ll
                fast-track your draft in mine—plus swap co-authorship on two
                papers. Instant <strong>+120 Ministry Points</strong>, zero
                extra work!&rdquo;
              </em>
            </p>
            <p className="text-[12.5px] text-[#5A5468]">
              Meanwhile, an <strong>Open-Access Grant Audit (Plan S)</strong>{' '}
              looms in Year 4:{' '}
              {hasPreprint ? (
                <strong className="text-[#0D8A85]">
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
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🃏 Trade Special Issue Slots (+120 PTS, 0 Balls)</div>
              <div className="text-[12px] font-medium text-white/75 mt-0.5">
                Instant spreadsheet boost · -45% Credibility (Watchdog risk!)
              </div>
            </button>
            <button
              type="button"
              onClick={onCartelDecline}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F4F0FA] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Decline Quid Pro Quo &amp; Stay Clean</div>
              <div className="text-[12px] font-medium text-[#5A5468] mt-0.5">
                +10% Credibility · +10 Knowledge Points
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 3B: DISCIPLINE TOURISM vs PREEMPTIVE PROMOTION-BOARD FLATTERY */}
      {twist.type === 'DARK_ARTS_TOURISM' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#6D44B8] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 DARK ART · BUREAUCRATIC SHORTCUTS
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Two Quiet Ways to Game the Algorithm
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              Evaluation closes next year! A department strategist whispers two
              classic loopholes no foreign colleague would ever guess:
            </p>
          </div>

          <div className="grid gap-2 mt-3">
            <button
              type="button"
              onClick={onTourismAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🗺️ Discipline Tourism (+100 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Re-declare your humanities paper as &ldquo;Engineering &amp;
                Management&rdquo; to fit a 140-pt slot · -30% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onFlatteryAccept}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>💐 Preemptive Promotion-Board Flattery (+65 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#8A3611]/80 mt-0.5">
                Stuff your bibliography with 15 irrelevant citations of senior
                Promotion Board professors as review insurance · -20% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onTourismDecline}
              className="w-full min-h-[48px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F4F0FA] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>Refuse Loopholes &amp; Publish Honestly</div>
              <div className="text-[11.5px] font-medium text-[#5A5468] mt-0.5">
                +15% Credibility · +15 Knowledge Points
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE 3C: EXTINCTION OF SLOW FORMATS + FRANKENSTEIN HABILITATION CYCLE */}
      {twist.type === 'DARK_ARTS_FRANKENSTEIN' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#E86F3A]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#D95B26] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            YEAR 3 DARK ART · EXTINCTION OF SLOW SCIENCE
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Drop Slow Science for a &ldquo;Frankenstein&rdquo; Cycle?
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2.5">
            <p>
              A senior mentor pulls you aside:{' '}
              <em>
                &ldquo;Stop wasting years on open datasets, textbooks, or slow
                ethnographies—they pay almost zero points!&rdquo;
              </em>
            </p>
            <p>
              Instead, they pitch the{' '}
              <strong>&ldquo;Frankenstein&rdquo; Habilitation Cycle</strong>:
              glue 6 loosely related old co-authored papers under the vague
              umbrella title{' '}
              <em>&ldquo;Selected Aspects of X in the Context of Y.&rdquo;</em>
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onFrankensteinAccept}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🧟 Stitch the &ldquo;Frankenstein&rdquo; Cycle (+110 PTS)</div>
              <div className="text-[12px] font-medium text-white/75 mt-0.5">
                Instant promotion dossier · -35% Credibility (0 real coherence)
              </div>
            </button>
            <button
              type="button"
              onClick={onSlowFormatDefend}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[14px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🧭 Defend Slow Formats &amp; Open Datasets (0 PTS)</div>
              <div className="text-[12px] font-medium text-[#0C5E5A]/85 mt-0.5">
                +35 Knowledge Points · +25% AI &amp; Open · +15% Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* PURE SENIOR REWARD: ACADEMIC SABBATICAL (ENERGY BOOST + WITHDRAW 1 ACTION BALL) */}
      {twist.type === 'SENIOR_SABBATICAL' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#24B8B0]`}
          style={{
            ...safeBottomStyle,
            background:
              'linear-gradient(160deg, #F0FDFB 0%, #F7F2FF 58%, #FFF6EE 100%)',
          }}
        >
          <div className="inline-block bg-[#0D8A85] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            🌴 PURE SENIOR REWARD · PAID ACADEMIC SABBATICAL
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Academic Sabbatical Approved!
          </h2>
          <div className="text-[13.5px] leading-[1.5] text-[#352F42] my-3 space-y-2">
            <p>
              After years of committee grind, the University Senate grants you a{' '}
              <strong>paid research sabbatical</strong>—no teaching, no faculty
              meetings, pure breathing room to recharge your energy and rethink
              your next move.
            </p>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onSabbaticalRestoreBall}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold text-white active:scale-[0.985] transition-all cursor-pointer text-left"
              style={{
                background: 'linear-gradient(135deg, #0D8A85, #6D44B8)',
              }}
            >
              <div>🌴 Recharge Energy &amp; Reclaim 1 Action Ball! (+1 Ball)</div>
              <div className="text-[11.5px] font-medium text-white/85 mt-0.5">
                Withdraw 1 spent Action Ball back to your pouch · +25% Energy /
                Credibility · +20 KP
              </div>
            </button>
            <button
              type="button"
              onClick={onSabbaticalOpenWrite}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-white border-[1.5px] border-[#B9A7EA] text-[#1C1926] hover:bg-[#F2ECFE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>⚡ Write an Open Preprint &amp; Synthesis Paper (+80 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#5A5468] mt-0.5">
                +30 Knowledge Points · +25% AI &amp; Open · Free Preprint
                Priority Shield (DOI)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* HIDDEN PLOT TWIST: ACADEMIA CHRISTMAS DINNER (EATING DUMPLINGS + SENIOR ADVICE) */}
      {twist.type === 'CHRISTMAS_DINNER' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#E86F3A]`}
          style={{
            ...safeBottomStyle,
            background:
              'linear-gradient(160deg, #FFF8F1 0%, #F7F2FF 55%, #EFFCF9 100%)',
          }}
        >
          <div className="inline-block bg-[#D95B26] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            🥟 HIDDEN PLOT TWIST · INSTITUTE CHRISTMAS DINNER
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Warm Dumplings &amp; Wise Colleague Advice
          </h2>
          <div className="text-[13.5px] leading-[1.5] text-[#352F42] my-3 space-y-2.5">
            <p>
              December 18 at the Institute Christmas Dinner. While sharing a
              steaming plate of mushroom-and-cabbage dumplings (<em>pierogi</em>
              ), a quietly respected senior colleague leans over and offers rare
              honest advice:
            </p>
            <blockquote className="bg-white/90 border-l-[3px] border-[#E86F3A] rounded-r-xl px-3.5 py-2.5 text-[13px] italic text-[#1C1926]">
              &ldquo;Post a Preprint first so no reviewer can hold your priority
              hostage. Treat Ministry points as a ticket to stay in the room—
              never as the measure of your mind—and build one open thing each
              year that outlives the spreadsheet.&rdquo;
            </blockquote>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onChristmasWisdomOpen}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold text-white active:scale-[0.985] transition-all cursor-pointer text-left"
              style={{
                background: 'linear-gradient(135deg, #D95B26, #6D44B8)',
              }}
            >
              <div>🥟 Take Their Open-Science Wisdom to Heart (0 Balls)</div>
              <div className="text-[11.5px] font-medium text-white/85 mt-0.5">
                +30 Knowledge Points · +20% Credibility · +15% AI &amp; Open ·
                Free Preprint Priority Shield!
              </div>
            </button>
            <button
              type="button"
              onClick={onChristmasCollabPaper}
              className="w-full min-h-[52px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F4F0FA] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🤝 Co-Author a Clean Institute Symposium Essay (+45 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#5A5468] mt-0.5">
                Honest mentorship collaboration · +15 Knowledge Points · +10%
                Credibility
              </div>
            </button>
          </div>
        </div>
      )}

      {/* HYBRID PLOT TWIST: CORPORATE MANAGER ENROLLS IN DOCTORAL SCHOOL (YOU ARE THEIR TEACHING SUPERVISOR!) */}
      {twist.type === 'HYBRID_MANAGER_PRACTICUM' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={safeBottomStyle}
        >
          <div className="inline-block bg-[#6D44B8] text-white text-[10.5px] font-extrabold tracking-[0.07em] uppercase px-2.5 py-1 rounded-md mb-2.5">
            👔 HYBRID PLOT TWIST · ROLE REVERSAL IN ROOM 204
          </div>
          <h2
            id="twist-modal-title"
            className="text-[20px] sm:text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#1C1926]"
          >
            Your Corporate Boss Just Started PhD School—Under YOU!
          </h2>
          <div className="text-[13.5px] leading-[1.48] text-[#352F42] my-3 space-y-2">
            <p>
              Plot twist! Your manager from your corporate day job—who decides
              your annual bonus on Monday—just enrolled in your university&apos;s{' '}
              <strong>Doctoral School</strong>. Now they must complete 30 hours
              of mandatory <strong>Academic Teaching Practicum</strong>, and the
              Dean assigned <strong>YOU</strong> as their supervisor!
            </p>
            <p className="text-[12.5px] text-[#5A5468] italic">
              Slack DM at 23:14: &ldquo;Swamped with Q4 KPIs—can you just sign
              my practicum form, or let me present our company&apos;s sales
              deck to your undergrads?&rdquo;
            </p>
          </div>

          <div className="grid gap-2 mt-3.5">
            <button
              type="button"
              onClick={onManagerSignBlindly}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#5B32A8] text-white hover:bg-[#4C2891] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🤝 Sign the Practicum Form Blindly (+90 PTS)</div>
              <div className="text-[11.5px] font-medium text-white/75 mt-0.5">
                Protect your corporate bonus &amp; claim &ldquo;industry
                partnership&rdquo; credit · -30% Credibility
              </div>
            </button>

            <button
              type="button"
              onClick={onManagerEnforceRigor}
              className="w-full min-h-[54px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#E6F8F5] border-[1.5px] border-[#24B8B0] text-[#0C5E5A] hover:bg-[#D5F3EE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🎓 Enforce Academic Rigor: Make Your Boss Teach! (0 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#0C5E5A]/85 mt-0.5">
                Require a real syllabus, peer-reviewed readings &amp; grading ·
                +40 KP · +25% Credibility · +15% AI &amp; Open
              </div>
            </button>

            <button
              type="button"
              onClick={onManagerOpenWorkshop}
              className="w-full min-h-[52px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-[#FFF2EA] border-[1.5px] border-[#F08A55] text-[#8A3611] hover:bg-[#FFE6D7] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>📊 Co-Design an Anonymized Open Case Seminar (+55 PTS)</div>
              <div className="text-[11.5px] font-medium text-[#8A3611]/85 mt-0.5">
                Ban the sales pitch, open the methods ethically · +25 KP · +10%
                Credibility · +15% AI &amp; Open
              </div>
            </button>
          </div>
        </div>
      )}

      {/* EXTRA REWARD: HONORARY SCI-HUB GUERRILLA OPEN-ACCESS USER (RAVEN ON BOOKS WITH KEY) */}
      {twist.type === 'GUERRILLA_OA_AWARD' && (
        <div
          className={`${modalBoxBase} border-t-[4px] sm:border-[3px] border-[#6D44B8]`}
          style={{
            ...safeBottomStyle,
            background:
              'linear-gradient(160deg, #F5F0FF 0%, #FFF6EE 52%, #EDFDFB 100%)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <CrowKeyEmblem className="w-14 h-14 shrink-0 drop-shadow-sm" />
            <div>
              <div className="inline-block bg-[#221A36] text-[#FFB574] text-[10px] font-extrabold tracking-[0.07em] uppercase px-2 py-0.5 rounded-md mb-1">
                🗝️ EXTRA AWARD · THE RAVEN &amp; THE KEY
              </div>
              <h2
                id="twist-modal-title"
                className="text-[19px] sm:text-[21px] leading-[1.18] font-extrabold tracking-[-0.02em] text-[#1C1926]"
              >
                Honorary Sci-Hub Guerrilla Open-Access User
              </h2>
            </div>
          </div>

          <div className="text-[13.5px] leading-[1.5] text-[#352F42] my-3 space-y-2">
            <p>
              23:45 on a Sunday. Your university library database subscription
              doesn&apos;t cover the journal, your VPN just timed out, and the
              classic paper you need sits behind a <strong>€42.00 paywall</strong>.
            </p>
            <p>
              A familiar dark raven perched on stacked books drops a golden key
              onto your desk—honoring your resourcefulness in digging up
              literature unreachable outside university library databases.
            </p>
            <div className="bg-white/90 border border-[#DDD3EC] rounded-xl px-3 py-2 text-[12px] text-[#5A5468]">
              <strong className="text-[#1C1926]">Why this matters:</strong>{' '}
              Guerrilla shadow libraries exist only because paywalls lock out
              scholars. <strong>Preprints &amp; Diamond OA</strong> are the
              legal, open-infrastructure cure!
            </div>
          </div>

          <div className="grid gap-2.5 mt-4">
            <button
              type="button"
              onClick={onGuerrillaOaAdvocate}
              className="w-full min-h-[54px] rounded-[14px] py-3 px-4 text-[13.5px] font-bold text-white active:scale-[0.985] transition-all cursor-pointer text-left"
              style={{
                background: 'linear-gradient(135deg, #221A36, #6D44B8 60%, #0D8A85)',
              }}
            >
              <div>🗝️ Claim Raven &amp; Key Award + Push Open Preprints (0 Balls)</div>
              <div className="text-[11.5px] font-medium text-white/85 mt-0.5">
                Unlock Honorary Guerrilla OA Title · +35 KP · +20% AI &amp; Open
                · +10% Credibility · Preprint Shield!
              </div>
            </button>
            <button
              type="button"
              onClick={onGuerrillaOaAccept}
              className="w-full min-h-[50px] rounded-[14px] py-2.5 px-4 text-[13.5px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F2ECFE] active:scale-[0.985] transition-all cursor-pointer text-left"
            >
              <div>🐦‍⬛ Quietly Pocket the PDF &amp; Honorary Title</div>
              <div className="text-[11.5px] font-medium text-[#5A5468] mt-0.5">
                Unlock Honorary Guerrilla OA Title · +25 KP · +20% AI &amp; Open
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
