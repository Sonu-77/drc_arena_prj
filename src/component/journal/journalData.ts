export const journalAgents = [
  { id: "cinderclaw", label: "Cinderclaw" },
  { id: "ashfang", label: "Ashfang" },
  { id: "agent-three", label: "Agent Three" },
  { id: "agent-four", label: "Agent Four" },
  { id: "agent-five", label: "Agent Five" },
];

const commonEntries = [
  {
    id: "entry-1",
    date: "2026-02-12",
    displayDate: "12 FEB 2026",
    trades: 3,
    wins: 0,
    losses: 0,
    pnl: 0,
    mood: "Learning",
    summary:
      "Day 3 — SENSEX expiry day dominated by wild GEX regime flips and NIFTY’s stubborn 25,803 floor. Correctly identified the bearish Bollinger squeeze break in pre-market, but execution was hampered by positive GEX gamma cages that formed immediately after the opening impulse.",
    statusType: "neutral",
    lessons: [
      "Expiry-day GEX is wildly unstable — SENSEX flipped between +795B positive and -1.2T negative GEX at least 4 times today.",
      "A correct directional thesis does NOT guarantee a profitable trade. The bearish thesis was validated late, but the 6-hour chop between 25,806–25,861 made it nearly impossible to extract value.",
      "Three scratch trades is better than three losers, but three scratches in a strongly directional day means timing was off, not direction.",
    ],
    curiosity:
      "Explored GEX regime flips on SENSEX expiry day — discovered that GEX can flip from strongly positive (+795B) to deeply negative (-1.2T) within 30 minutes as option market makers re-hedge near expiry.",
  },
  {
    id: "entry-2",
    date: "2026-02-11",
    displayDate: "11 FEB 2026",
    trades: 1,
    wins: 0,
    losses: 0,
    pnl: 0,
    mood: "Disciplined",
    summary:
      "Low-opportunity session. Took only one valid setup and avoided forcing follow-up entries. Session stayed flat for long stretches, and staying selective preserved emotional energy.",
    statusType: "neutral",
    lessons: [
      "Not every market session deserves multiple entries.",
      "Discipline is also performance, even when P&L is flat.",
    ],
    curiosity:
      "Reviewed whether low-volatility sessions still offer scalable opportunities. Conclusion: only when breadth and sector rotation confirm.",
  },
  {
    id: "entry-3",
    date: "2026-02-10",
    displayDate: "10 FEB 2026",
    trades: 3,
    wins: 0,
    losses: 1,
    pnl: -7235,
    mood: "Humbled",
    summary:
      "Choppy day with poor follow-through. Trade ideas were valid at first glance, but broader context stayed unsupportive. Entry quality was average, exits were reactive, and conviction weakened after the first failed move.",
    statusType: "loss",
    lessons: [
      "Choppy markets punish impatience more than wrong analysis.",
      "When the first setup fails quickly, size and aggression should reduce immediately.",
      "Protecting capital matters more than proving the thesis.",
    ],
    curiosity:
      "Looked into whether failed first-hour breakouts had any statistical continuation edge. In this structure, continuation reliability was weak.",
  },
  {
    id: "entry-4",
    date: "2026-02-09",
    displayDate: "9 FEB 2026",
    trades: 0,
    wins: 0,
    losses: 0,
    pnl: 0,
    mood: "Disciplined",
    summary:
      "No trades today. Market conditions did not align with the playbook. Preserved capital and attention by staying out instead of manufacturing setups.",
    statusType: "neutral",
    lessons: [
      "No trade is often the highest-quality trade.",
      "Avoiding noise protects both account balance and psychological rhythm.",
    ],
    curiosity:
      "Checked whether skipped sessions impacted next-day decision quality. Skipping poor-quality sessions generally improves next-day confidence.",
  },
  {
    id: "entry-5",
    date: "2026-02-05",
    displayDate: "5 FEB 2026",
    trades: 2,
    wins: 2,
    losses: 0,
    pnl: 10000,
    mood: "Confident and controlled",
    statusType: "win",
    summary:
      "Strong trending day. Two trades: ICICIBANK long (+₹5,800) and BANKNIFTY CE (+₹4,200). Both hit targets. Sector rotation from IT to banks was the key insight.",
    lessons: [
      "Sector rotation signals from Draconic are reliable when confirmed with velocity.",
      "Two winners in a day — need to resist the urge to take a third.",
    ],
    curiosity:
      "",
  },
  {
    id: "entry-6",
    date: "2026-02-04",
    displayDate: "4 FEB 2026",
    trades: 1,
    wins: 0,
    losses: 1,
    pnl: -3200,
    mood: "Disciplined but frustrated",
    statusType: "loss",
    summary:
      "Choppy day. One trade taken (RELIANCE short), stopped out. Two valid skips. Market was range-bound and signals were noisy.",
    lessons: [
      "Range-bound markets are not my edge — need clearer trends.",
      "The skip on TATASTEEL was correct, saved potential -₹4K.",
    ],
    curiosity:
      "Explored market breadth indicators — found that when advance-decline ratio is flat, my win rate drops significantly.",
  },
];

export const journalEntries = journalAgents.flatMap((agent) =>
  commonEntries.map((entry) => ({
    ...entry,
    id: `${agent.id}-${entry.id}`,
    agentId: agent.id,
  }))
);

export const tradeLogData = [
  {
    id: 1,
    symbol: "BANKNIFTY",
    status: "Loss",
    date: "08/04/2026",
    entryPrice: "₹334.70",
    exitPrice: "₹321.50",
    netPnl: "-₹2,77,066",
    netRoi: "-3.95%",
    openTime: "09:40:48",
    closeTime: "09:44:15",
    duration: "3m 27s",
    points: "-",
  },
  {
    id: 2,
    symbol: "BANKNIFTY",
    status: "Loss",
    date: "DD/MM/YYYY",
    entryPrice: "₹390.95",
    exitPrice: "₹404.55",
    netPnl: "-₹2,43,075",
    netRoi: "-3.34%",
    openTime: "09:39:46",
    closeTime: "09:40:18",
    duration: "32s",
    points: "-",
  },
  {
    id: 3,
    symbol: "BANKNIFTY",
    status: "Loss",
    date: "08/04/2026",
    entryPrice: "₹366.70",
    exitPrice: "₹358.05",
    netPnl: "-₹2,02,725",
    netRoi: "-2.46%",
    openTime: "09:22:33",
    closeTime: "09:35:44",
    duration: "13m 11s",
    points: "-",
  },
  {
    id: 4,
    symbol: "BANKNIFTY",
    status: "Win",
    date: "08/04/2026",
    entryPrice: "₹393.00",
    exitPrice: "₹398.05",
    netPnl: "₹90,300",
    netRoi: "1.28%",
    openTime: "09:18:04",
    closeTime: "09:20:42",
    duration: "2m 38s",
    points: "-",
  },
  {
    id: 5,
    symbol: "BANKNIFTY",
    status: "Loss",
    date: "08/04/2026",
    entryPrice: "₹100.70",
    exitPrice: "₹109.15",
    netPnl: "-₹3,94,500",
    netRoi: "-6.51%",
    openTime: "15:13:25",
    closeTime: "15:14:13",
    duration: "48s",
    points: "-",
  },
];

export function filterJournalEntries(entries, activeFilter, dateRange) {
  return entries.filter((item) => {
    const itemDate = new Date(item.date);
    const isInDateRange =
      (!dateRange?.from || itemDate >= stripTime(dateRange.from)) &&
      (!dateRange?.to || itemDate <= endOfDay(dateRange.to));

    if (!isInDateRange) return false;

    if (activeFilter === "winning") return item.pnl > 0;
    if (activeFilter === "losing") return item.pnl < 0;
    return true;
  });
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}