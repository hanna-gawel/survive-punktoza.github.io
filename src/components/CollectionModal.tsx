import { useEffect } from 'react';
import { RotateCcw, Trophy, X } from 'lucide-react';
import { ENDINGS_CATALOG, EndingId } from '../data/simulationData';

interface CollectionModalProps {
  unlocked: EndingId[];
  onClose: () => void;
  onResetCollection: () => void;
}

export function CollectionModal({
  unlocked,
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-modal-title"
      onClick={onClose}
      className="fixed inset-0 bg-[#140E0E]/72 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF6F2] w-full sm:max-w-[520px] md:max-w-[600px] max-h-[88dvh] flex flex-col rounded-t-[26px] sm:rounded-[24px] border-t sm:border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.38)] overflow-hidden"
      >
        {/* Sticky Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#E6DDD5] bg-[#FAF6F2] shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5C5752]">
              <Trophy className="w-3.5 h-3.5 text-[#C98A1B]" aria-hidden="true" />
              <span>Trainer Card Collection</span>
            </div>
            <h2
              id="collection-modal-title"
              className="text-[19px] sm:text-[20px] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mt-0.5 tabular-nums"
            >
              Endings Unlocked: {unlocked.length} / {ENDINGS_CATALOG.length}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close collection"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="px-5 py-3.5 overflow-y-auto overscroll-contain flex-1">
          <p className="text-[13px] text-[#5C5752] mb-3.5">
            Try different academic strategies—or fall into different traps—to
            collect all 6 Trainer Cards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ENDINGS_CATALOG.map((ending) => {
              const isUnlocked = unlocked.includes(ending.id);
              return (
                <div
                  key={ending.id}
                  className={`rounded-2xl p-3 border-[1.5px] transition-colors ${
                    isUnlocked
                      ? 'bg-white border-[#D8CFC6]'
                      : 'bg-[#F1ECE6] border-dashed border-[#D3C8BE] opacity-85'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[20px] shrink-0" aria-hidden="true">
                      {isUnlocked ? ending.icon : '🔒'}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#5C5752]">
                        {isUnlocked ? ending.cardTag : 'LOCKED ENDING'}
                      </div>
                      <div className="text-[13.5px] font-extrabold text-[#1E1D1C] leading-tight">
                        {isUnlocked ? ending.shortTitle : '???'}
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] leading-[1.38] text-[#5C5752]">
                    {isUnlocked ? ending.summary : `Hint: ${ending.hint}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Footer */}
        <div
          className="flex items-center justify-between gap-2 px-5 pt-3 border-t border-[#E6DDD5] bg-[#FAF6F2] shrink-0"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          {unlocked.length > 0 ? (
            <button
              type="button"
              onClick={onResetCollection}
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 rounded-xl text-[12.5px] font-semibold text-[#5C5752] hover:text-[#B81D1D] hover:bg-[#FFF0F0] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear</span>
            </button>
          ) : (
            <span className="text-[12px] text-[#5C5752]">
              Saved in this browser.
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl text-[13.5px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer whitespace-nowrap"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
