export type ActionId = 'preprint' | 'j140' | 'dragon200' | 'salami' | 'conf';

export interface AcademicAction {
  id: ActionId;
  name: string;
  avatar: string;
  avatarBg: string;
  badgeText: string;
  badgeStyle: 'zero' | 'high' | 'mid' | 'low';
  desc: string;
  repeatable: boolean;
}

export const ACADEMIC_ACTIONS: AcademicAction[] = [
  {
    id: 'preprint',
    name: 'Open Preprint (D2C Bypass)',
    avatar: '⚡',
    avatarBg: 'bg-[#FFF2C9]',
    badgeText: '0 PTS',
    badgeStyle: 'zero',
    desc: 'Immediate DOI, +12 mo citations, readable by LLMs & OpenAIRE.',
    repeatable: true,
  },
  {
    id: 'j140',
    name: '140-pt International Journal',
    avatar: '📘',
    avatarBg: 'bg-[#FCE0EA]',
    badgeText: '140 PTS',
    badgeStyle: 'mid',
    desc: 'Solid peer-reviewed venue. Safe, respectable academic choice.',
    repeatable: false,
  },
  {
    id: 'dragon200',
    name: '200-pt Paywall Leviathan',
    avatar: '🐉',
    avatarBg: 'bg-[#EAE6E4]',
    badgeText: '200 PTS',
    badgeStyle: 'high',
    desc: 'Commercial monopoly. 24-month embargo, $3k fee or paywall lock.',
    repeatable: false,
  },
  {
    id: 'salami',
    name: 'The Salami Slicer',
    avatar: '🍕',
    avatarBg: 'bg-[#FFE4D4]',
    badgeText: '70 PTS each',
    badgeStyle: 'mid',
    desc: 'Chop 1 good idea into tiny repetitive papers. Fast points! (Repeatable)',
    repeatable: true,
  },
  {
    id: 'conf',
    name: 'Conference Nomad & Admin',
    avatar: '✈️',
    avatarBg: 'bg-[#E3EFFB]',
    badgeText: '25 PTS',
    badgeStyle: 'low',
    desc: 'Fly abroad for a 15-min talk + sit on 4 faculty committees.',
    repeatable: true,
  },
];
