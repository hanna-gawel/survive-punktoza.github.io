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
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-modal-title"
      className="fixed inset-0 bg-[#140E0E]/72 backdrop-blur-[4px] flex justify-center items-center p-4 z-50"
    >
      <div className="bg-[#FAF6F2] max-w-[440px] w-full max-h-[86vh] overflow-y-auto rounded-[24px] p-5 border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5C5752]">
              <Trophy className="w-3.5 h-3.5 text-[#C98A1B]" aria-hidden="true" />
              <span>Trainer Card Collection</span>
            </div>
            <h2
              id="collection-modal-title"
              className="text-[20px] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mt-0.5 tabular-nums"
            >
              Endings Unlocked: {unlocked.length} / {ENDINGS_CATALOG.length}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close collection"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-[13px] text-[#5C5752] mb-4">
          Try different academic strategies—or fall into different traps—to collect
          all 6 Trainer Cards.
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
                    : 'bg-[#F1ECE6] border-dashed border-[#D3C8BE] opacity-80'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[20px]" aria-hidden="true">
                    {isUnlocked ? ending.icon : '🔒'}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#5C5752]">
                      {isUnlocked ? ending.cardTag : 'LOCKED ENDING'}
                    </div>
                    <div className="text-[13.5px] font-extrabold text-[#1E1D1C] leading-tight truncate">
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

        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#E6DDD5]">
          {unlocked.length > 0 ? (
            <button
              type="button"
              onClick={onResetCollection}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-[#5C5752] hover:text-[#B81D1D] hover:bg-[#FFF0F0] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear Collection</span>
            </button>
          ) : (
            <span className="text-[12px] text-[#5C5752]">
              Progress saves in this browser.
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[13px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] transition-colors cursor-pointer whitespace-nowrap"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
