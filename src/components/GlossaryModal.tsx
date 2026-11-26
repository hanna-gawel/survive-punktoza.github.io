import { useEffect } from 'react';
import { BookOpen, X } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/simulationData';

interface GlossaryModalProps {
  onClose: () => void;
}

export function GlossaryModal({ onClose }: GlossaryModalProps) {
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
      aria-labelledby="glossary-modal-title"
      onClick={onClose}
      className="fixed inset-0 bg-[#140E0E]/72 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF6F2] w-full sm:max-w-[520px] md:max-w-[600px] max-h-[88dvh] flex flex-col rounded-t-[26px] sm:rounded-[24px] border-t sm:border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.38)] overflow-hidden"
      >
        {/* Sticky modal header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#E6DDD5] bg-[#FAF6F2] shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#5C5752]">
              <BookOpen className="w-3.5 h-3.5 text-[#0A5EB0]" aria-hidden="true" />
              <span>Quick Guide · International Edition</span>
            </div>
            <h2
              id="glossary-modal-title"
              className="text-[19px] sm:text-[20px] font-extrabold tracking-[-0.02em] text-[#1E1D1C] mt-0.5"
            >
              Terms &amp; Abbreviations
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close glossary"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5C5752] hover:text-[#1E1D1C] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-5 py-3.5 overflow-y-auto overscroll-contain flex-1">
          <p className="text-[13px] text-[#5C5752] mb-3.5">
            New to Polish science policy or Open Access acronyms? Here is a quick
            cheat sheet for everything in the simulation:
          </p>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {GLOSSARY_TERMS.map((item) => (
              <div
                key={item.term}
                className="bg-white border border-[#E6DDD5] rounded-2xl px-3.5 py-2.5"
              >
                <dt className="text-[13px] font-extrabold text-[#1E1D1C]">
                  {item.term}
                </dt>
                <dd className="text-[12px] leading-[1.42] text-[#5C5752] mt-0.5">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Sticky footer with safe-area bottom */}
        <div
          className="px-5 pt-3 border-t border-[#E6DDD5] bg-[#FAF6F2] shrink-0"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl text-[14px] font-bold bg-[#1E1D1C] text-white hover:bg-[#302E2C] active:scale-[0.985] transition-all cursor-pointer"
          >
            Got It — Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
