import { useEffect } from 'react';
import { Award, Lock, RotateCcw, Trophy, X } from 'lucide-react';
import { ENDINGS_CATALOG, EndingId } from '../data/simulationData';
import { CrowKeyEmblem } from './CrowKeyEmblem';
import { PRIZE_THRESHOLD } from './HiddenPrizeModal';

interface CollectionModalProps {
  unlocked: EndingId[];
  oaWeekEverFound: boolean;
  christmasDinnerEverFound: boolean;
  guerrillaOaEverFound: boolean;
  onOpenPrize: () => void;
  onClose: () => void;
  onResetCollection: () => void;
}

export function CollectionModal({
  unlocked,
  oaWeekEverFound,
  christmasDinnerEverFound,
  guerrillaOaEverFound,
  onOpenPrize,
  onClose,
  onResetCollection,
}: CollectionModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const prizeUnlocked = unlocked.length >= PRIZE_THRESHOLD;
  const prizeProgress = Math.min(PRIZE_THRESHOLD, unlocked.length);
  const prizePct = Math.round((prizeProgress / PRIZE_THRESHOLD) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-modal-title"
      onClick={onClose}
      className="fixed inset-0 bg-[#171224]/72 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8FC] w-full sm:max-w-[540px] md:max-w-[640px] max-h-[88dvh] flex flex-col rounded-t-[26px] sm:rounded-[24px] border-t sm:border border-white/80 shadow-[0_24px_60px_rgba(24,14,48,0.4)] overflow-hidden"
      >
        {/* Sticky Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#E8E1F0] bg-[#FAF8FC] shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#6D44B8]">
              <Trophy className="w-3.5 h-3.5 text-[#E86F3A]" aria-hidden="true" />
              <span>Trainer Card Collection</span>
            </div>
            <h2
              id="collection-modal-title"
              className="text-[19px] sm:text-[20px] font-extrabold tracking-[-0.02em] text-[#1C1926] mt-0.5 tabular-nums"
            >
              Endings Unlocked: {unlocked.length} / {ENDINGS_CATALOG.length}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close collection"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5A5468] hover:text-[#1C1926] hover:bg-[#EDE6F7] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="px-5 py-3.5 overflow-y-auto overscroll-contain flex-1">
          {/* Hidden 8-Ending Prize Vault */}
          {prizeUnlocked ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPrize();
              }}
              className="w-full mb-3.5 rounded-2xl p-3.5 text-left text-white prize-foil border border-white/50 shadow-[0_10px_24px_rgba(109,68,184,0.28)] hover:brightness-[1.04] active:scale-[0.985] transition-all flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.07em] text-white/90">
                  <Award className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Hidden Conference Prize Unlocked!</span>
                </div>
                <div className="text-[14.5px] font-extrabold text-white mt-0.5">
                  Open Sovereign Scholar Pass &amp; Secret Mode →
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-white/20 text-[12px] font-extrabold shrink-0 whitespace-nowrap">
                Claim 🏆
              </span>
            </button>
          ) : (
            <div className="mb-3.5 rounded-2xl p-3 bg-gradient-to-r from-[#F4EEFF] via-[#FFF4EA] to-[#E6F8F5] border border-[#DFD4F2]">
              <div className="flex items-center justify-between gap-2 text-[12px] font-extrabold text-[#1C1926] mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Lock
                    className="w-3.5 h-3.5 text-[#6D44B8] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Hidden Prize: Unlock {PRIZE_THRESHOLD} Endings</span>
                </span>
                <span className="text-[#6D44B8] tabular-nums">
                  {prizeProgress}/{PRIZE_THRESHOLD}
                </span>
              </div>
              <div className="w-full h-2 bg-white/85 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${prizePct}%`,
                    background:
                      'linear-gradient(90deg, #F9844A, #9D72F3, #24B8B0)',
                  }}
                />
              </div>
              <p className="text-[11.5px] text-[#5A5468] mt-1.5">
                Collect any {PRIZE_THRESHOLD} endings to unlock the secret{' '}
                <strong>Slovak Open Science Forum 2026</strong> Sovereign
                Scholar Pass &amp; bonus mode!
              </p>
            </div>
          )}

          {/* Honorary Sci-Hub Guerrilla OA Award Showcase (when earned) */}
          {guerrillaOaEverFound && (
            <div className="mb-3.5 rounded-2xl p-3 bg-[#221A36] text-white border border-[#8B5CF6]/60 flex items-center gap-3 shadow-sm">
              <CrowKeyEmblem className="w-12 h-12 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.07em] text-[#FFB574]">
                  🗝️ Extra Award Unlocked · The Raven &amp; Key
                </div>
                <div className="text-[13.5px] font-extrabold leading-tight text-white">
                  Honorary Sci-Hub Guerrilla Open-Access User
                </div>
                <div className="text-[11.5px] text-white/75 leading-snug mt-0.5">
                  Awarded for digging up paywalled literature unreachable
                  outside university library databases.
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[12px] text-[#5A5468]">
            <span>
              Explore all 3 lifecycles to collect all {ENDINGS_CATALOG.length}{' '}
              cards.
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={`font-bold ${
                  oaWeekEverFound ? 'text-[#0D8A85]' : 'text-[#6D44B8]'
                }`}
              >
                {oaWeekEverFound
                  ? '🔓 OA Week ✓'
                  : '🔒 Secret #1'}
              </span>
              <span
                className={`font-bold ${
                  christmasDinnerEverFound ? 'text-[#D95B26]' : 'text-[#6D44B8]'
                }`}
              >
                {christmasDinnerEverFound
                  ? '🥟 Dumplings ✓'
                  : '🔒 Secret #2'}
              </span>
              <span
                className={`font-bold ${
                  guerrillaOaEverFound ? 'text-[#6D44B8]' : 'text-[#6D44B8]/75'
                }`}
              >
                {guerrillaOaEverFound
                  ? '🗝️ Raven & Key ✓'
                  : '🔒 Extra Award'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ENDINGS_CATALOG.map((ending) => {
              const isUnlocked = unlocked.includes(ending.id);
              return (
                <div
                  key={ending.id}
                  className={`rounded-2xl p-3 border-[1.5px] transition-colors ${
                    isUnlocked
                      ? 'bg-white border-[#DDD3EC]'
                      : 'bg-[#F2EEF8] border-dashed border-[#D1C6E3] opacity-85'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px] shrink-0" aria-hidden="true">
                      {isUnlocked ? ending.icon : '🔒'}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#6D44B8]">
                        {isUnlocked ? ending.cardTag : 'LOCKED ENDING'}
                      </div>
                      <div className="text-[13.5px] font-extrabold text-[#1C1926] leading-tight">
                        {isUnlocked ? ending.shortTitle : '???'}
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] leading-[1.38] text-[#5A5468]">
                    {isUnlocked ? ending.summary : `Hint: ${ending.hint}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Footer */}
        <div
          className="flex items-center justify-between gap-2 px-5 pt-3 border-t border-[#E8E1F0] bg-[#FAF8FC] shrink-0"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          {unlocked.length > 0 ||
          oaWeekEverFound ||
          christmasDinnerEverFound ||
          guerrillaOaEverFound ? (
            <button
              type="button"
              onClick={onResetCollection}
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 rounded-xl text-[12.5px] font-semibold text-[#5A5468] hover:text-[#C43A2B] hover:bg-[#FFF0EE] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear</span>
            </button>
          ) : (
            <span className="text-[12px] text-[#5A5468]">
              Saved in this browser.
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-[13.5px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
