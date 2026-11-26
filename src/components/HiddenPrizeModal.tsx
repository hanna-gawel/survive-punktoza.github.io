import { useEffect, useState } from 'react';
import { Award, Check, Copy, ExternalLink, Sparkles, X } from 'lucide-react';
import { ENDINGS_CATALOG } from '../data/simulationData';

export const PRIZE_THRESHOLD = 8;

interface HiddenPrizeModalProps {
  unlockedCount: number;
  oaWeekEverFound: boolean;
  openInfraMode: boolean;
  onToggleOpenInfraMode: () => void;
  onClose: () => void;
}

export function HiddenPrizeModal({
  unlockedCount,
  oaWeekEverFound,
  openInfraMode,
  onToggleOpenInfraMode,
  onClose,
}: HiddenPrizeModalProps) {
  const [scholarName, setScholarName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const isGrandmaster = unlockedCount >= ENDINGS_CATALOG.length;
  const displayName = scholarName.trim() || 'Open Science Champion';

  const handleCopyShare = async () => {
    const shareText = `🏆 I unlocked the Hidden Sovereign Scholar Prize (${unlockedCount}/${ENDINGS_CATALOG.length} endings) in "Academic Pokémon Go: Survive Punktoza" — companion game to dr Hanna Gaweł’s talk "Preprints as Open Infrastructures" at Slovak Open Science Forum 2026! #OpenScience #Preprints @hannagawel.bsky.social`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hidden-prize-title"
      onClick={onClose}
      className="fixed inset-0 bg-[#171224]/78 backdrop-blur-[5px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8FC] w-full sm:max-w-[520px] max-h-[90dvh] flex flex-col rounded-t-[26px] sm:rounded-[24px] border-t-[3px] sm:border-[2px] border-[#F59E56] shadow-[0_28px_70px_rgba(24,14,48,0.5)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#E8E1F0] bg-[#FAF8FC] shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#D95B26]">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                Hidden Prize Unlocked · {unlockedCount}/{ENDINGS_CATALOG.length}{' '}
                Endings
              </span>
            </div>
            <h2
              id="hidden-prize-title"
              className="text-[19px] sm:text-[21px] font-extrabold tracking-[-0.02em] text-[#1C1926] mt-0.5"
            >
              The Sovereign Scholar Pass
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close hidden prize modal"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5A5468] hover:text-[#1C1926] hover:bg-[#EDE6F7] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-5 py-4 overflow-y-auto overscroll-contain flex-1 space-y-3.5">
          {/* Holographic Diploma Card */}
          <div className="prize-foil rounded-[20px] p-4 sm:p-5 text-white border-2 border-white/60 shadow-[0_14px_34px_rgba(109,68,184,0.32)] relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white/90 mb-2">
              <span>SLOVAK OPEN SCIENCE FORUM 2026</span>
              <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs">
                {isGrandmaster ? '👑 12/12 GRANDMASTER' : '🏆 8+ MASTER'}
              </span>
            </div>

            <div className="text-[12px] font-semibold text-white/85">
              Certificate of Scholarly Autonomy awarded to
            </div>
            <div className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.02em] leading-tight text-white mt-0.5 break-words">
              {displayName}
            </div>

            <p className="text-[12.5px] leading-[1.45] text-white/90 mt-2">
              For exposing Poland&apos;s evaluation dark arts across{' '}
              <strong>
                {unlockedCount} of {ENDINGS_CATALOG.length} endings
              </strong>
              {oaWeekEverFound
                ? ' & discovering International Open Access Week'
                : ''}
              —championing{' '}
              <strong>Preprints as Open Infrastructures</strong>.
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/25 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-white/90">
              <span>dr Hanna Gaweł · Jagiellonian University</span>
              <span
                className="px-2 py-0.5 rounded bg-[#1C1926]/55 tracking-wider"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                SOSF26-OPEN-INFRA
              </span>
            </div>
          </div>

          {/* Personalize Name */}
          <div className="bg-white border border-[#E8E1F0] rounded-2xl p-3">
            <label
              htmlFor="diploma-name-input"
              className="block text-[11.5px] font-bold text-[#5A5468] mb-1.5"
            >
              Personalize your pass (great for a screenshot!):
            </label>
            <input
              id="diploma-name-input"
              type="text"
              maxLength={40}
              value={scholarName}
              onChange={(e) => setScholarName(e.target.value)}
              placeholder="Enter your name or handle..."
              className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-[#DDD3EC] bg-[#FAF8FC] text-[13.5px] font-semibold text-[#1C1926] placeholder:text-[#8E869E] focus:outline-none focus:border-[#6D44B8]"
            />
          </div>

          {/* Live Conference Easter Egg */}
          <div className="bg-[#FFF4EB] border border-[#F4B483] rounded-2xl p-3.5 text-[12.5px] leading-[1.45] text-[#6E2D0B]">
            <strong className="font-extrabold text-[#1C1926]">
              🎤 Attending Slovak Open Science Forum 2026?
            </strong>{' '}
            Show this unlocked Sovereign Scholar Pass to{' '}
            <strong>dr Hanna Gaweł</strong> after the talk for conference
            bragging rights &amp; open-science appreciation!
          </div>

          {/* Playable Secret Reward: Open Infrastructure Mode */}
          <div className="bg-[#E6F8F5] border-[1.5px] border-[#7AD6CD] rounded-2xl p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#0D8A85]">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Secret Playable Mode Unlocked</span>
                </div>
                <div className="text-[14px] font-extrabold text-[#1C1926] mt-0.5">
                  Open Infrastructure Mode
                </div>
                <p className="text-[12px] leading-[1.4] text-[#0E4A47] mt-1">
                  See what academia looks like <em>after</em> reform: start
                  every run with built-in Preprint Infrastructure (free DOI
                  Shield, +50 KP, and Preprints &amp; Slow Formats earn{' '}
                  <strong>+100 Ministry Points</strong>!).
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={openInfraMode}
                onClick={onToggleOpenInfraMode}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-[12px] font-extrabold shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                  openInfraMode
                    ? 'bg-[#0D8A85] text-white shadow-xs'
                    : 'bg-white border border-[#96DDD6] text-[#0C5E5A] hover:bg-[#D5F3EE]'
                }`}
              >
                {openInfraMode ? 'ON ✓' : 'Enable'}
              </button>
            </div>
          </div>

          {/* Share & Event Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyShare}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#1C1926] hover:bg-[#F2ECFE] active:scale-[0.985] transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#0D8A85]" aria-hidden="true" />
                  <span className="text-[#0D8A85]">Copied for Bluesky!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#6D44B8]" aria-hidden="true" />
                  <span>Copy Share Text</span>
                </>
              )}
            </button>

            <a
              href="https://otvorenaveda.cvtisr.sk/slovak-open-science-forum-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[#DDD3EC] text-[#0D8A85] hover:bg-[#E6F8F5] transition-all inline-flex items-center justify-center gap-1.5"
            >
              <span>SOSF 2026 Program</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Sticky Footer */}
        <div
          className="px-5 pt-3 border-t border-[#E8E1F0] bg-[#FAF8FC] shrink-0"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl text-[14px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
