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
    label: 'Szkoła Doktorska (PhD)',
    shortLabel: 'Szkoła Doktorska',
    roleTitle: 'Doctoral Candidate',
    midtermLabel: 'Ocena Śródokresowa (Mid-Term Evaluation)',
    stakesNote: 'Pass Year 2 Ocena Śródokresowa & hit 200 pts to keep your stipend.',
  },
  habilitation: {
    label: 'NCN & Habilitation',
    shortLabel: 'NCN / Habilitation',
    roleTitle: 'Assistant Professor (Adiunkt)',
    midtermLabel: 'NCN Progress Check & RDN Audit',
    stakesNote: 'Survive NCN Plan S open-access checks & RDN habilitation review.',
  },
};

export const ACADEMIC_ACTIONS: AcademicAction[] = [
  {
    id: 'preprint',
    name: 'Open Preprint (D2C Bypass)',
    avatar: '⚡',
    avatarBg: 'bg-[#FFF2C9]',
    badgeText: '0 PTS',
    badgeStyle: 'zero',
    desc: 'Instant DOI timestamp, NCN Plan S compliant, readable by LLMs & OpenAIRE. Shields priority!',
    repeatable: true,
  },
  {
    id: 'j140',
    name: '140-pt International Journal',
    avatar: '📘',
    avatarBg: 'bg-[#FCE0EA]',
    badgeText: '140 PTS',
    badgeStyle: 'mid',
    desc: 'Solid peer-reviewed venue for habilitation. 18–24 mo review queue.',
    repeatable: false,
  },
  {
    id: 'dragon200',
    name: '200-pt Paywall Leviathan',
    avatar: '🐉',
    avatarBg: 'bg-[#EAE6E4]',
    badgeText: '200 PTS',
    badgeStyle: 'high',
    desc: 'Commercial monopoly. 24-mo embargo, €3k fee or paywall lock. Risks NCN OA audit.',
    repeatable: false,
  },
  {
    id: 'special140',
    name: 'Express Special Issue (14-Day)',
    avatar: '💸',
    avatarBg: 'bg-[#FFEBD6]',
    badgeText: '140 PTS · €2.5k',
    badgeStyle: 'express',
    desc: '"Fast-track peer review in 2 weeks!" Steep APC fee, grey-zone mega-journal.',
    repeatable: false,
  },
  {
    id: 'salami',
    name: 'The Salami Slicer',
    avatar: '🍕',
    avatarBg: 'bg-[#FFE4D4]',
    badgeText: '70 PTS each',
    badgeStyle: 'mid',
    desc: 'Chop 1 good idea into tiny repetitive papers. Fast points, drains credibility.',
    repeatable: true,
  },
  {
    id: 'conf',
    name: 'Conference Nomad & Admin',
    avatar: '✈️',
    avatarBg: 'bg-[#E3EFFB]',
    badgeText: '25 PTS',
    badgeStyle: 'low',
    desc: '15-min talk abroad + 4 faculty & Szkoła Doktorska committees.',
    repeatable: true,
  },
];

export const ENDINGS_CATALOG: EndingMeta[] = [
  {
    id: 'hacker',
    shortTitle: 'Dual-Type System Hacker',
    cardTag: 'CHEAT CODE / TRUE WIN',
    icon: '⚡',
    hint: 'Hit 200+ pts while posting a Preprint first — and stay clean of cartels.',
    summary: 'Beat Punktoza, satisfied NCN Plan S, and stayed 100% visible to AI & peers.',
  },
  {
    id: 'ghost',
    shortTitle: 'Ghost in the Cache',
    cardTag: 'PYRRHIC VICTORY',
    icon: '👻',
    hint: 'Reach 200+ pts without ever posting an Open Preprint (and decline the cartel).',
    summary: 'Kept your job via paywalls or salami slicing, but vanished from LLMs & OpenAIRE.',
  },
  {
    id: 'cartel',
    shortTitle: 'Paper-Mill Tycoon',
    cardTag: 'ETHICS SCANDAL',
    icon: '🃏',
    hint: 'Accept the Senior Professor’s Co-Authorship Cartel pact in Year 3.',
    summary: 'Smashed the Ministry spreadsheet, then got flagged by Retraction Watch & RDN.',
  },
  {
    id: 'delisted',
    shortTitle: 'Bankrupt & Delisted',
    cardTag: 'APC TRAP',
    icon: '💸',
    hint: 'Bet on the 14-day Express Special Issue and fall short of 200 pts after delisting.',
    summary: 'Paid €2,500 for fast points, got delisted overnight, and failed NCN reimbursement.',
  },
  {
    id: 'scooped',
    shortTitle: 'Scooped in Peer Review',
    cardTag: 'PRIORITY LOST',
    icon: '⏰',
    hint: 'Submit to a big journal without a Preprint shield, get hit by Reviewer #2, and miss 200 pts.',
    summary: 'Lost priority during an 18-month review queue because you had no public DOI timestamp.',
  },
  {
    id: 'fired',
    shortTitle: 'Contract Terminated',
    cardTag: 'PURE PUNKTOZA',
    icon: '📉',
    hint: 'Finish below 200 pts through honest open science, conferences, or ministerial nerfs.',
    summary: 'High ideals or tough luck, but the central spreadsheet gave zero survival points.',
  },
];

export const STORAGE_KEY_ENDINGS = 'punktoza_unlocked_endings_v2';
