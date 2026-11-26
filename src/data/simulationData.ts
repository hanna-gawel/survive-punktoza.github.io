export type ActionId =
  | 'preprint'
  | 'j140'
  | 'dragon200'
  | 'special140'
  | 'salami'
  | 'conf';

export type CareerTrack = 'phd' | 'habilitation';

export type EndingId =
  | 'hacker'
  | 'ghost'
  | 'cartel'
  | 'delisted'
  | 'scooped'
  | 'fired';

export type TwistModalType =
  | 'SCOOP_TRAP'
  | 'MIDTERM_AND_PATCH'
  | 'DELIST_APC'
  | 'CARTEL_OFFER';

export interface AcademicAction {
  id: ActionId;
  name: string;
  avatar: string;
  avatarBg: string;
  badgeText: string;
  badgeStyle: 'zero' | 'high' | 'mid' | 'low' | 'express';
  desc: string;
  repeatable: boolean;
}

export interface EndingMeta {
  id: EndingId;
  shortTitle: string;
  cardTag: string;
  icon: string;
  hint: string;
  summary: string;
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}

export const GLOSSARY_TERMS: GlossaryItem[] = [
  {
    term: 'Punktoza ("Point-itis")',
    meaning:
      'Poland’s national evaluation system where researchers’ careers and department budgets depend strictly on collecting points from an official Ministry spreadsheet of journals.',
  },
  {
    term: 'Mid-Term PhD Evaluation',
    meaning:
      'A mandatory Year 2 review in Polish Doctoral Schools (Ocena Śródokresowa). Falling behind on publication points puts your PhD stipend and continuation at risk.',
  },
  {
    term: 'Habilitation (Tenure Review)',
    meaning:
      'A post-PhD senior academic qualification required for professorship in Central Europe, reviewed by a national promotion board.',
  },
  {
    term: 'National Grant Agency (NCN) & Plan S',
    meaning:
      'Poland’s main public science funder (NCN) enforces Plan S: grant-funded articles must be freely readable online (Open Access) immediately upon publication.',
  },
  {
    term: 'Preprint & DOI',
    meaning:
      'A full research manuscript posted openly online before journal peer review. It receives a DOI (Digital Object Identifier)—a permanent timestamped link proving you were first.',
  },
  {
    term: 'Green Open Access (Green OA)',
    meaning:
      'Sharing a free preprint or repository copy alongside a traditional journal submission—satisfying funder Open Access rules at zero cost.',
  },
  {
    term: 'Publishing Fee (APC)',
    meaning:
      'Article Processing Charge—an upfront fee (often €2,000–€3,000+) that commercial journals charge authors to make a paper Open Access.',
  },
  {
    term: 'AI Tools & Open Indexes (LLMs & OpenAIRE)',
    meaning:
      'Large Language Models (like ChatGPT) and European open research catalogs (OpenAIRE). They index open preprints, while commercial paywalls block them completely.',
  },
];

export const CAREER_TRACKS: Record<
  CareerTrack,
  {
    label: string;
    shortLabel: string;
    roleTitle: string;
    midtermLabel: string;
    stakesNote: string;
  }
> = {
  phd: {
    label: 'Doctoral School (PhD)',
    shortLabel: 'PhD Candidate',
    roleTitle: 'Doctoral Candidate',
    midtermLabel: 'Mid-Term PhD Evaluation',
    stakesNote: 'Pass the Year 2 Mid-Term Evaluation & hit 200 pts to keep your PhD stipend.',
  },
  habilitation: {
    label: 'Grants & Habilitation',
    shortLabel: 'Grants & Tenure',
    roleTitle: 'Assistant Professor',
    midtermLabel: 'Mid-Cycle Grant & Promotion Check',
    stakesNote: 'Survive National Grant Agency open-access audits & senior promotion review.',
  },
};

export const ACADEMIC_ACTIONS: AcademicAction[] = [
  {
    id: 'preprint',
    name: 'Open Preprint (Direct Share)',
    avatar: '⚡',
    avatarBg: 'bg-[#FFF2C9]',
    badgeText: '0 PTS',
    badgeStyle: 'zero',
    desc: 'Free, instant timestamped ID (DOI), meets funder Open Access rules, readable by AI & peers.',
    repeatable: true,
  },
  {
    id: 'j140',
    name: '140-pt International Journal',
    avatar: '📘',
    avatarBg: 'bg-[#FCE0EA]',
    badgeText: '140 PTS',
    badgeStyle: 'mid',
    desc: 'Respected peer-reviewed journal for promotion. Slow 18–24 month review queue.',
    repeatable: false,
  },
  {
    id: 'dragon200',
    name: '200-pt Paywall Leviathan',
    avatar: '🐉',
    avatarBg: 'bg-[#EAE6E4]',
    badgeText: '200 PTS',
    badgeStyle: 'high',
    desc: 'Commercial publisher monopoly. 24-month embargo, €3k fee or paywall lock. Risks grant audit.',
    repeatable: false,
  },
  {
    id: 'special140',
    name: 'Express Special Issue (14-Day)',
    avatar: '💸',
    avatarBg: 'bg-[#FFEBD6]',
    badgeText: '140 PTS · €2.5k',
    badgeStyle: 'express',
    desc: '"Peer review in 2 weeks!" Steep €2,500 publishing fee (APC) at a controversial mega-journal.',
    repeatable: false,
  },
  {
    id: 'salami',
    name: 'The Salami Slicer',
    avatar: '🍕',
    avatarBg: 'bg-[#FFE4D4]',
    badgeText: '70 PTS each',
    badgeStyle: 'mid',
    desc: 'Chop 1 good idea into tiny repetitive papers. Fast points, drains academic credibility.',
    repeatable: true,
  },
  {
    id: 'conf',
    name: 'Conference Nomad & Admin',
    avatar: '✈️',
    avatarBg: 'bg-[#E3EFFB]',
    badgeText: '25 PTS',
    badgeStyle: 'low',
    desc: 'Fly abroad for a 15-min talk + sit on 4 university committees.',
    repeatable: true,
  },
];

export const ENDINGS_CATALOG: EndingMeta[] = [
  {
    id: 'hacker',
    shortTitle: 'Dual-Type System Hacker',
    cardTag: 'TRUE WIN / CHEAT CODE',
    icon: '⚡',
    hint: 'Hit 200+ pts while posting an Open Preprint first — and avoid citation cartels.',
    summary: 'Beat the point system, met Open Access grant rules, and stayed 100% visible to AI & peers.',
  },
  {
    id: 'ghost',
    shortTitle: 'Ghost in the Cache',
    cardTag: 'PYRRHIC VICTORY',
    icon: '👻',
    hint: 'Reach 200+ pts without ever posting an Open Preprint (and decline the cartel).',
    summary: 'Kept your job via paywalls or salami slicing, but vanished from AI tools & open catalogs.',
  },
  {
    id: 'cartel',
    shortTitle: 'Paper-Mill Tycoon',
    cardTag: 'ETHICS SCANDAL',
    icon: '🃏',
    hint: 'Accept the Senior Professor’s Co-Authorship Cartel pact in Year 3.',
    summary: 'Smashed the Ministry spreadsheet, then got flagged by integrity watchdogs during promotion.',
  },
  {
    id: 'delisted',
    shortTitle: 'Bankrupt & Delisted',
    cardTag: 'FEE TRAP',
    icon: '💸',
    hint: 'Bet on the 14-day Express Special Issue and fall short of 200 pts after delisting.',
    summary: 'Paid €2,500 for fast points, got delisted overnight, and failed grant reimbursement.',
  },
  {
    id: 'scooped',
    shortTitle: 'Scooped in Peer Review',
    cardTag: 'PRIORITY LOST',
    icon: '⏰',
    hint: 'Submit to a big journal without a Preprint shield, get hit by Reviewer #2, and miss 200 pts.',
    summary: 'Lost priority during an 18-month review queue because you had no public timestamp.',
  },
  {
    id: 'fired',
    shortTitle: 'Contract Terminated',
    cardTag: 'PURE PUNKTOZA',
    icon: '📉',
    hint: 'Finish below 200 pts through honest open science, conferences, or sudden point cuts.',
    summary: 'High ideals or tough luck, but the central spreadsheet gave zero survival points.',
  },
];

export const STORAGE_KEY_ENDINGS = 'punktoza_unlocked_endings_v2';
