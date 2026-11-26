export type ActionId =
  | 'preprint'
  | 'j140'
  | 'dragon200'
  | 'special140'
  | 'monograph'
  | 'slowformat'
  | 'salami'
  | 'conf';

export type CareerTrack = 'phd' | 'senior' | 'hybrid';

export type EndingId =
  | 'hacker'
  | 'ghost'
  | 'darkarts'
  | 'clone'
  | 'admin'
  | 'arbitrage'
  | 'subsidizer'
  | 'cartel'
  | 'laundered'
  | 'delisted'
  | 'scooped'
  | 'fired';

export type TwistModalType =
  | 'SCOOP_TRAP'
  | 'LIFECYCLE_CLONE'
  | 'LIFECYCLE_TUNNEL_VISION'
  | 'SENIOR_SABBATICAL'
  | 'HYBRID_NDA_WHITEPAPER'
  | 'HYBRID_MANAGER_PRACTICUM'
  | 'MIDTERM_AND_PATCH'
  | 'DELIST_APC'
  | 'CARTEL_OFFER'
  | 'DARK_ARTS_TOURISM'
  | 'DARK_ARTS_FRANKENSTEIN'
  | 'LIFECYCLE_ADMIN_GATEKEEPER'
  | 'HYBRID_ARBITRAGE_SUBSIDIZER'
  | 'CHRISTMAS_DINNER'
  | 'GUERRILLA_OA_AWARD'
  | 'OA_WEEK_TREASURE';

export interface AcademicAction {
  id: ActionId;
  name: string;
  avatar: string;
  avatarBg: string;
  badgeText: string;
  badgeStyle: 'zero' | 'high' | 'mid' | 'low' | 'express' | 'slow' | 'dark';
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
  group?: 'pure' | 'hybrid';
}

export const GLOSSARY_TERMS: GlossaryItem[] = [
  {
    term: 'Punktoza ("Point-itis") & 400-Point Quota',
    meaning:
      'Poland’s 4-year national evaluation system where careers and faculty budgets depend on filling 4 publication slots to hit 400 Ministry points (140+ by Year 2 Mid-Term) from a central journal spreadsheet.',
  },
  {
    term: 'Mid-Term PhD Evaluation & External Review',
    meaning:
      'A mandatory Year 2 Doctoral School checkpoint (140+ pts) plus external thesis reviews. Falling behind—or upsetting conservative reviewers—risks stipend cuts.',
  },
  {
    term: 'Habilitation (dr hab.) & Promotion Board (RDN)',
    meaning:
      'A post-PhD senior qualification required for professorship in Central Europe, judged by Poland’s Council for Scientific Excellence (RDN) checklist.',
  },
  {
    term: 'National Grant Agency (NCN) & Plan S',
    meaning:
      'Poland’s public science funder enforces Plan S: grant-funded articles must be freely readable online (Open Access) immediately upon publication.',
  },
  {
    term: 'Preprint, DOI & Priority Shield',
    meaning:
      'A full manuscript shared openly online before peer review. It receives a DOI (Digital Object Identifier)—a permanent timestamp proving you were first if a rival tries to scoop you.',
  },
  {
    term: 'Open Infrastructure & Diamond OA',
    meaning:
      'Scholar-owned, non-commercial publishing (preprint servers, institutional repositories, and Diamond Open Access journals with zero author or reader fees)—the core theme of the SOSF 2026 talk.',
  },
  {
    term: 'Publishing Fee (APC) & Delisting Risk',
    meaning:
      'Article Processing Charge—an upfront fee (often €2,000–€3,000+) commercial journals charge authors. If a mega-journal gets delisted mid-cycle, grant agencies reject the bill.',
  },
  {
    term: 'Guerrilla Open Access (Raven & Key / Sci-Hub)',
    meaning:
      'Symbolized by a raven perched on books holding a key, guerrilla open access emerged because steep paywalls lock readers outside university library VPNs—showing why legal open preprints are vital.',
  },
  {
    term: '50% Creative-Cost Tax Break (KUP)',
    meaning:
      'A Polish tax perk allowing university employees to deduct 50% of creative/research income—often tempting corporate practitioners to keep a fractional 1/4-time campus job.',
  },
  {
    term: 'Knowledge Points (KP) vs. Ministry Points',
    meaning:
      'Real scientific value—open datasets, textbooks, mentorship, preprints, and honest peer review—versus arbitrary points tracked on the Ministry spreadsheet.',
  },
  {
    term: 'Salami Slicing & "Reviewer #2"',
    meaning:
      'Salami slicing splits one solid study into multiple minimal papers for extra points; "Reviewer #2" is academic shorthand for the slow, hostile anonymous reviewer who can stall you until a rival scoops you.',
  },
  {
    term: 'Hidden Academic Treasures & Sovereign Scholar Pass',
    meaning:
      'Watch for secret moments during play—International Open Access Week (🔓), Institute Christmas Dumplings (🥟), and the late-night Library VPN Raven & Key (🗝️)—plus the secret 8-Ending Prize unlocking Open Infrastructure Mode!',
  },
];

export const DARK_ARTS_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Slot Laundering ("N-Number" Gymnastics)',
    meaning:
      'Pressuring lower-scoring researchers onto teaching-only contracts before evaluation closes so removing them from the denominator inflates the faculty’s average.',
  },
  {
    term: 'Mercenary Part-Timers (1/4 FTE)',
    meaning:
      'Hiring prolific external or foreign scholars on tiny fractional contracts with zero teaching duties solely to harvest their 140- and 200-pt slots.',
  },
  {
    term: 'Discipline Tourism',
    meaning:
      'Re-tagging a paper or researcher into an unrelated field (e.g., sociology as engineering or management) just because a 140-pt journal sits in that column.',
  },
  {
    term: 'Guest Editor Quid Pro Quo',
    meaning:
      'Taking a Special Issue Guest Editor role and quietly trading fast-track 140-pt slots with colleagues at other universities.',
  },
  {
    term: 'The Review-Voucher Economy',
    meaning:
      'Churning out superficial two-paragraph peer reviews in 48 hours just to hoard discount vouchers for your own future publishing fees.',
  },
  {
    term: 'The "Frankenstein" Habilitation Cycle',
    meaning:
      'Retroactively gluing 5–7 loosely related old co-authored articles under a vague umbrella title ("Selected Aspects of X in the Context of Y").',
  },
  {
    term: 'The Ghost Monograph',
    meaning:
      'Turning lightly edited lecture notes into a 50-copy "scientific monograph" for 80–200 pts. 40 copies gather dust in a basement, zero citations—slot filled.',
  },
  {
    term: 'Preemptive Promotion-Board Flattery',
    meaning:
      'Stuffing your bibliography with irrelevant citations of senior review-panel professors as insurance against a hostile promotion review.',
  },
  {
    term: 'APC-Laundering Grants',
    meaning:
      'Writing grant proposals for half-finished research where the unspoken goal is simply securing a budget line to pay €2,500+ publishing fees.',
  },
  {
    term: 'Extinction of "Slow" Formats',
    meaning:
      'Abandoning textbooks, datasets, open-source tools, and 5-year studies because two quick literature reviews earn far more Ministry points.',
  },
];

export const LIFECYCLE_GLOSSARY: GlossaryItem[] = [
  {
    term: 'The Pre-Defense "Clone" (PhD Stage)',
    group: 'pure',
    meaning:
      'Abandoning your own research instincts to carbon-copy your supervisor’s safe niche—because innovating risks a hostile external review and losing your stipend.',
  },
  {
    term: 'Habilitation Tunnel Vision (Early-to-Mid Career)',
    group: 'pure',
    meaning:
      'Treating teaching, student mentorship, and outreach as "wasted time" for 5–7 years while obsessing strictly over the Promotion Board checklist.',
  },
  {
    term: 'Academic Sabbatical (Senior Reward)',
    group: 'pure',
    meaning:
      'Paid research leave for senior scholars to recover from burnout and focus on deep work—in Pure: Senior, it lets you withdraw a spent Action Ball back into your pouch and boost energy.',
  },
  {
    term: 'The Administrative Retreat (Post-Habilitation)',
    group: 'pure',
    meaning:
      'Escaping the exhausting point treadmill after promotion by becoming a vice-dean or committee chair—holding status while outsourcing research to junior staff.',
  },
  {
    term: 'The Legacy Gatekeeper (Senior / Emeritus)',
    group: 'pure',
    meaning:
      'Weaponizing evaluation points to block new computational tools or interdisciplinary hires that make your 1990s framework look obsolete.',
  },
  {
    term: 'The "NDA Shield" (Hybrid)',
    group: 'hybrid',
    meaning:
      'Submitting a corporate case study to a 100-pt journal, then hiding behind "client NDA" whenever reviewers ask for raw data or replication code.',
  },
  {
    term: 'Whitepaper Laundering (Hybrid)',
    group: 'hybrid',
    meaning:
      'Taking a paid corporate report or training manual from your day job, slapping 3 pages of literature review on top, and publishing it as "original research."',
  },
  {
    term: 'Corporate Boss’s PhD Teaching Practicum (Hybrid Reversal)',
    group: 'hybrid',
    meaning:
      'When your corporate manager enrolls in Doctoral School and needs mandatory university teaching hours—with YOU as their academic supervisor. Power dynamics collide with scholarly integrity.',
  },
  {
    term: 'Title Arbitrage (Hybrid)',
    group: 'hybrid',
    meaning:
      'Using your Dr. title to charge premium corporate consulting rates while using "practitioner" status on campus to dismiss academic methodology.',
  },
  {
    term: '50% Tax-Break / Prestige Parasite (Hybrid)',
    group: 'hybrid',
    meaning:
      'Keeping a fractional 1/4-time university contract purely for prestige, 50% creative-cost tax perks, and database access while recycling old lectures.',
  },
  {
    term: 'The "Subsidizer" Trap (Hybrid)',
    group: 'hybrid',
    meaning:
      'Self-funding conferences and absorbing unpaid overtime from a corporate paycheck—unintentionally helping academia avoid reforming unlivable wages.',
  },
];

export const CAREER_TRACKS: Record<
  CareerTrack,
  {
    label: string;
    shortLabel: string;
    badge: string;
    roleTitle: string;
    midtermLabel: string;
    stakesNote: string;
  }
> = {
  phd: {
    label: 'Pure Academia: PhD',
    shortLabel: 'Pure: PhD',
    badge: 'Institutional Survival',
    roleTitle: 'Doctoral Candidate',
    midtermLabel: 'Mid-Term PhD Evaluation',
    stakesNote:
      'Your university stipend is your only paycheck. Survive the Pre-Defense "Clone" trap, Mid-Term Evaluation & overnight point cuts.',
  },
  senior: {
    label: 'Pure Academia: Senior',
    shortLabel: 'Pure: Senior',
    badge: 'Territorial Defense',
    roleTitle: 'Post-Habilitation Scholar',
    midtermLabel: 'Mid-Cycle Faculty Audit',
    stakesNote:
      'Navigate Tunnel Vision, earn a ball-restoring Academic Sabbatical, and face the Vice-Dean Retreat vs. Legacy Gatekeeper.',
  },
  hybrid: {
    label: 'Hybrid: Campus + Industry',
    shortLabel: 'Hybrid: Dual',
    badge: 'Two-World Arbitrage',
    roleTitle: 'Hybrid Practitioner-Scholar',
    midtermLabel: 'Fractional Contract Review',
    stakesNote:
      'Face Whitepaper Laundering, the NDA Shield, supervising your corporate boss’s PhD Teaching Practicum & Title Arbitrage.',
  },
};

const BASE_ACTIONS: AcademicAction[] = [
  {
    id: 'preprint',
    name: 'Open Preprint (Direct Share)',
    avatar: '⚡',
    avatarBg: 'bg-[#E1F7F4]',
    badgeText: '0 PTS · +20 KP',
    badgeStyle: 'zero',
    desc: 'Free, instant timestamped ID (DOI), meets funder Open Access rules & shields against scoops.',
    repeatable: true,
  },
  {
    id: 'slowformat',
    name: 'Slow Format: Open Dataset / Book',
    avatar: '🧭',
    avatarBg: 'bg-[#E3F5FF]',
    badgeText: '20 PTS · +35 KP',
    badgeStyle: 'slow',
    desc: 'Build a 5-year textbook, dataset, or open-source tool that genuinely helps the field.',
    repeatable: true,
  },
  {
    id: 'j140',
    name: '140-pt International Journal',
    avatar: '📘',
    avatarBg: 'bg-[#EFE6FE]',
    badgeText: '140 PTS',
    badgeStyle: 'mid',
    desc: 'Respected peer-reviewed journal for promotion. Slow 18–24 month review queue.',
    repeatable: true,
  },
  {
    id: 'dragon200',
    name: '200-pt Paywall Leviathan',
    avatar: '🐉',
    avatarBg: 'bg-[#ECE7F4]',
    badgeText: '200 PTS',
    badgeStyle: 'high',
    desc: 'Commercial monopoly. 24-mo embargo, €3k fee or paywall lock. Risks grant audit.',
    repeatable: true,
  },
  {
    id: 'special140',
    name: 'Express Special Issue (14-Day)',
    avatar: '💸',
    avatarBg: 'bg-[#FFEBD9]',
    badgeText: '140 PTS · €2.5k',
    badgeStyle: 'express',
    desc: '"Peer review in 2 weeks!" Steep €2,500 publishing fee (APC) at a grey-zone mega-journal.',
    repeatable: false,
  },
  {
    id: 'monograph',
    name: 'Ghost Monograph (50 Copies)',
    avatar: '📚',
    avatarBg: 'bg-[#F3E8FF]',
    badgeText: '120 PTS',
    badgeStyle: 'dark',
    desc: 'Repackage old lecture notes. 40 copies rot in a basement, zero citations—slot filled!',
    repeatable: false,
  },
  {
    id: 'salami',
    name: 'The Salami Slicer',
    avatar: '🍕',
    avatarBg: 'bg-[#FFE7D6]',
    badgeText: '70 PTS each',
    badgeStyle: 'mid',
    desc: 'Chop 1 good idea into tiny repetitive papers. Fast points, drains academic credibility.',
    repeatable: true,
  },
  {
    id: 'conf',
    name: 'Conference Nomad & Admin',
    avatar: '✈️',
    avatarBg: 'bg-[#E5F6F5]',
    badgeText: '25 PTS',
    badgeStyle: 'low',
    desc: 'Fly abroad for a 15-min talk + sit on 4 university evaluation committees.',
    repeatable: true,
  },
];

export function getActionsForTrack(track: CareerTrack): AcademicAction[] {
  if (track !== 'hybrid') return BASE_ACTIONS;

  return BASE_ACTIONS.map((action) => {
    if (action.id === 'monograph') {
      return {
        ...action,
        name: 'Whitepaper Laundering (NDA)',
        avatar: '📑',
        avatarBg: 'bg-[#F3E8FF]',
        badgeText: '115 PTS',
        badgeStyle: 'dark',
        desc: 'Slap 3 pages of citations onto a paid client report & block data audits behind an NDA Shield.',
      };
    }
    if (action.id === 'conf') {
      return {
        ...action,
        name: '50% Tax-Break & Recycled Slides',
        avatar: '💼',
        avatarBg: 'bg-[#E5F6F5]',
        badgeText: '45 PTS',
        badgeStyle: 'low',
        desc: 'Hold a 1/4-time contract for 50% creative-cost tax perks, library access & Dr. title prestige.',
      };
    }
    return action;
  });
}

export const ACADEMIC_LIFE_FLASHES: Record<CareerTrack, string[]> = {
  phd: [
    'Supervisor email: "Don’t test a new method—stick to my 2004 framework or external reviewers will reject you."',
    'Doctoral School memo: "Reminder: Student outreach earns 0 points toward your Year 2 Mid-Term."',
    'Hallway rumor: "The faculty just hired a 1/4-time foreign star who never teaches but brings 400 pts."',
    'Committee update: "Someone glued 6 unrelated co-authored articles into a habilitation cycle again."',
  ],
  senior: [
    'Dean’s Office: "Vice-Dean seat open! Zero lab work, full committee power, juniors run the papers."',
    'University Senate: "Paid Academic Sabbatical applications open—recover energy and reclaim an Action Ball!"',
    'Faculty Senate: "A senior professor just vetoed a computational methods hire to protect his 1990s syllabus."',
    'Institute kitchen: "Someone is heating up Christmas dumplings—senior colleagues are sharing quiet advice."',
  ],
  hybrid: [
    'HR Tax Desk: "Submit your 50% creative-cost (KUP) declaration by Friday to keep your fractional tax perk!"',
    'Slack DM from your corporate boss: "Hey! I just started Doctoral School—can you supervise my teaching practicum?"',
    'Peer reviewer query: "Could you share your raw dataset?" Draft reply: "Sorry, covered by Client NDA!"',
    'Corporate payroll: "You just paid €1,400 out of your day-job bonus to attend an academic conference."',
  ],
};

export const GOAL_POINTS = 400;
export const MIDTERM_THRESHOLD = 140;

export const ENDINGS_CATALOG: EndingMeta[] = [
  {
    id: 'hacker',
    shortTitle: 'Dual-Type System Hacker',
    cardTag: 'TRUE WIN / CHEAT CODE',
    icon: '⚡',
    hint: 'Hit 400+ pts while posting an Open Preprint first—and keep your hands clean of dark arts & arbitrage.',
    summary:
      'Beat the point system, met Open Access rules, and stayed 100% visible to AI & peers without selling out.',
  },
  {
    id: 'ghost',
    shortTitle: 'Ghost in the Cache',
    cardTag: 'PYRRHIC VICTORY',
    icon: '👻',
    hint: 'Reach 400+ pts without posting an Open Preprint (and stay clean of dark arts, cartels & arbitrage).',
    summary:
      'Kept your job via paywalls or salami slicing, but vanished from AI tools & open catalogs.',
  },
  {
    id: 'clone',
    shortTitle: "Supervisor's Carbon Copy",
    cardTag: 'PRE-DEFENSE CLONE',
    icon: '🧬',
    hint: 'On Pure: PhD, become the Pre-Defense "Clone" in Year 1 and survive to 400+ pts.',
    summary:
      'Abandoned originality to mirror your supervisor’s safe niche. Passed defense smoothly—with zero innovation.',
  },
  {
    id: 'admin',
    shortTitle: 'Bureaucratic Turf Lord',
    cardTag: 'ADMIN RETREAT / GATEKEEPER',
    icon: '🏛️',
    hint: 'On Pure: Senior, take the Administrative Retreat or weaponize Legacy Gatekeeper turf defense in Year 3 and hit 400+ pts.',
    summary:
      'Escaped the point treadmill into university bureaucracy—outsourcing papers to juniors and blocking new methods.',
  },
  {
    id: 'arbitrage',
    shortTitle: 'Hybrid Title Arbitrageur',
    cardTag: 'TWO-WORLD ARBITRAGE',
    icon: '💼',
    hint: 'On Hybrid: Dual, hit 400+ pts using Whitepaper Laundering, the NDA Shield, Title Arbitrage, or 50% tax perks.',
    summary:
      'Monetized your Dr. title in corporate consulting while hiding behind NDAs and recycling slides on campus.',
  },
  {
    id: 'subsidizer',
    shortTitle: 'The Noble Subsidizer',
    cardTag: 'SYSTEMIC COMPLICITY',
    icon: '🪙',
    hint: 'On Hybrid: Dual, choose the "Subsidizer" Trap in Year 3 (self-funding research from corporate pay) while staying clean of arbitrage.',
    summary:
      'Self-funded your own conferences and unpaid overtime—unintentionally helping academia avoid wage reform.',
  },
  {
    id: 'darkarts',
    shortTitle: 'Dark Arts Grandmaster',
    cardTag: 'ALGORITHM HACKED',
    icon: '🧙‍♂️',
    hint: 'Hit 400+ pts by combining 2+ bureaucratic dark arts (Ghost Monograph, Tourism, Frankenstein, Vouchers, Flattery).',
    summary:
      'Reverse-engineered every loophole in Polish evaluation. Zero real science, immaculate spreadsheet.',
  },
  {
    id: 'cartel',
    shortTitle: 'Paper-Mill Tycoon',
    cardTag: 'ETHICS SCANDAL',
    icon: '🃏',
    hint: 'Accept the Guest Editor Quid Pro Quo / Co-Authorship Cartel pact in Year 3 and reach 400+ pts.',
    summary:
      'Smashed the Ministry spreadsheet via slot-trading, then got flagged by integrity watchdogs.',
  },
  {
    id: 'laundered',
    shortTitle: 'Erased from the N-Number',
    cardTag: 'SLOT LAUNDERED',
    icon: '🧹',
    hint: 'Fall below 140 pts at Year 2 Mid-Term and accept the Dean’s "Teaching-Only" contract transfer.',
    summary:
      'Quietly removed from the faculty’s research denominator so the department average spiked overnight.',
  },
  {
    id: 'delisted',
    shortTitle: 'Bankrupt & Delisted',
    cardTag: 'FEE TRAP',
    icon: '💸',
    hint: 'Bet on the 14-day Express Special Issue and fall short of 400 pts after delisting.',
    summary:
      'Paid €2,500 for fast points, got delisted overnight, and failed grant reimbursement.',
  },
  {
    id: 'scooped',
    shortTitle: 'Scooped in Peer Review',
    cardTag: 'PRIORITY LOST',
    icon: '⏰',
    hint: 'Submit to a big journal without a Preprint shield, get hit by Reviewer #2, and miss 400 pts.',
    summary:
      'Lost priority during an 18-month review queue because you had no public timestamp.',
  },
  {
    id: 'fired',
    shortTitle: 'Contract Terminated',
    cardTag: 'PURE PUNKTOZA',
    icon: '📉',
    hint: 'Finish below 400 pts through honest open science, slow formats, mentorship, or overnight cuts.',
    summary:
      'High Knowledge Points and real science—but the Ministry spreadsheet gave zero survival points.',
  },
];

export const STORAGE_KEY_ENDINGS = 'punktoza_unlocked_endings_v4';
