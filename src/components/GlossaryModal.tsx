import { useEffect, useState } from 'react';
import { BookOpen, Sparkles, X } from 'lucide-react';
import {
  DARK_ARTS_GLOSSARY,
  GLOSSARY_TERMS,
  LIFECYCLE_GLOSSARY,
} from '../data/simulationData';

interface GlossaryModalProps {
  oaWeekFound: boolean;
  onDiscoverOaWeek: () => void;
  onClose: () => void;
}

type GlossaryTab = 'terms' | 'darkarts' | 'lifecycles';

export function GlossaryModal({
  oaWeekFound,
  onDiscoverOaWeek,
  onClose,
}: GlossaryModalProps) {
  const [tab, setTab] = useState<GlossaryTab>('terms');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const activeList =
    tab === 'terms'
      ? GLOSSARY_TERMS
      : tab === 'darkarts'
        ? DARK_ARTS_GLOSSARY
        : LIFECYCLE_GLOSSARY;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-modal-title"
      onClick={onClose}
      className="fixed inset-0 bg-[#171224]/72 backdrop-blur-[4px] flex justify-center items-end sm:items-center p-0 sm:p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8FC] w-full sm:max-w-[560px] md:max-w-[680px] max-h-[88dvh] flex flex-col rounded-t-[26px] sm:rounded-[24px] border-t sm:border border-white/80 shadow-[0_24px_60px_rgba(24,14,48,0.4)] overflow-hidden"
      >
        {/* Sticky modal header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#E8E1F0] bg-[#FAF8FC] shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#0D8A85]">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>International Guide · Plain English</span>
              </div>
              <h2
                id="glossary-modal-title"
                className="text-[19px] sm:text-[20px] font-extrabold tracking-[-0.02em] text-[#1C1926] mt-0.5"
              >
                Terms, Dark Arts &amp; Lifecycles
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close glossary"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5A5468] hover:text-[#1C1926] hover:bg-[#EDE6F7] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* 3-tab switch */}
          <div
            className="grid grid-cols-3 gap-1 p-1 bg-[#EDE7F5] rounded-xl mt-3"
            role="tablist"
            aria-label="Glossary sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'terms'}
              onClick={() => setTab('terms')}
              className={`min-h-[38px] py-1.5 px-2 rounded-lg text-[12px] sm:text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                tab === 'terms'
                  ? 'bg-white text-[#1C1926] shadow-xs'
                  : 'text-[#5A5468] hover:text-[#1C1926]'
              }`}
            >
              Terms ({GLOSSARY_TERMS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'darkarts'}
              onClick={() => setTab('darkarts')}
              className={`min-h-[38px] py-1.5 px-2 rounded-lg text-[12px] sm:text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                tab === 'darkarts'
                  ? 'bg-white text-[#6D44B8] shadow-xs'
                  : 'text-[#5A5468] hover:text-[#1C1926]'
              }`}
            >
              Dark Arts ({DARK_ARTS_GLOSSARY.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'lifecycles'}
              onClick={() => setTab('lifecycles')}
              className={`min-h-[38px] py-1.5 px-2 rounded-lg text-[12px] sm:text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                tab === 'lifecycles'
                  ? 'bg-white text-[#D95B26] shadow-xs'
                  : 'text-[#5A5468] hover:text-[#1C1926]'
              }`}
            >
              Lifecycles ({LIFECYCLE_GLOSSARY.length})
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="px-5 py-3.5 overflow-y-auto overscroll-contain flex-1">
          <p className="text-[13px] text-[#5A5468] mb-3.5">
            {tab === 'terms'
              ? 'New to Polish science policy, Open Infrastructure, or hidden rewards? Here is a plain-English cheat sheet for every term and acronym in the game:'
              : tab === 'darkarts'
                ? 'Beyond obvious sins like salami slicing, Polish Punktoza bred 10 quieter bureaucratic dark arts—all woven into gameplay:'
                : 'Incentives, rewards, and plot twists shift completely depending on whether academia is your only paycheck (Pure Academia) or one half of your identity (Hybrid):'}
          </p>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeList.map((item) => (
              <div
                key={item.term}
                className="bg-white border border-[#E8E1F0] rounded-2xl px-3.5 py-2.5"
              >
                {item.group && (
                  <div
                    className={`text-[10px] font-extrabold uppercase tracking-[0.06em] mb-0.5 ${
                      item.group === 'pure'
                        ? 'text-[#6D44B8]'
                        : 'text-[#0D8A85]'
                    }`}
                  >
                    {item.group === 'pure'
                      ? 'Pure Academia Lifecycle'
                      : 'Hybrid Lifecycle (Campus + Industry)'}
                  </div>
                )}
                <dt className="text-[13px] font-extrabold text-[#1C1926]">
                  {item.term}
                </dt>
                <dd className="text-[12px] leading-[1.42] text-[#5A5468] mt-0.5">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>

          {/* Subtle Hidden Academic Treasure inside Glossary */}
          <div className="mt-4 pt-3.5 border-t border-dashed border-[#D8CEEA]">
            <button
              type="button"
              disabled={oaWeekFound}
              onClick={() => {
                onClose();
                onDiscoverOaWeek();
              }}
              className={`w-full rounded-2xl px-3.5 py-3 text-left border transition-all flex items-center justify-between gap-3 ${
                oaWeekFound
                  ? 'bg-[#E6F8F5] border-[#8ADBD2] text-[#0C6662] cursor-default'
                  : 'bg-gradient-to-r from-[#E6F8F5] via-[#F2ECFE] to-[#FFF1E5] border-[#B9A7EA] hover:border-[#6D44B8] active:scale-[0.985] cursor-pointer'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#0D8A85]">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {oaWeekFound
                      ? 'Hidden Treasure Claimed · Oct 19–25'
                      : 'Curious Scholar Bonus · Oct 19–25'}
                  </span>
                </div>
                <div className="text-[13px] font-extrabold text-[#1C1926] mt-0.5">
                  {oaWeekFound
                    ? 'Attended International Open Access Week (+35 KP ✓)'
                    : '🔓 Attend International Open Access Week →'}
                </div>
              </div>
              <span className="text-[11.5px] font-extrabold text-[#6D44B8] shrink-0 whitespace-nowrap">
                {oaWeekFound ? 'Active' : '+35 KP'}
              </span>
            </button>
          </div>
        </div>

        {/* Sticky footer with safe-area bottom */}
        <div
          className="px-5 pt-3 border-t border-[#E8E1F0] bg-[#FAF8FC] shrink-0"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl text-[14px] font-bold bg-[#1C1926] text-white hover:bg-[#312B42] active:scale-[0.985] transition-all cursor-pointer"
          >
            Got It — Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
