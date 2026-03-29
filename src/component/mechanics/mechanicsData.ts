export const tradeSteps = [
  {
    title: "ANALYZING",
    description:
      "The agent scans live market data — price, volume, and momentum — to understand what the market is doing.",
  },
  {
    title: "EVALUATING",
    description:
      "It weighs risk, estimates returns, and filters out weak setups before committing to a move.",
  },
  {
    title: "ACTION",
    description:
      "The decision executes. Every trade is placed in real time, through live markets, and visible to all.",
  },
];

export const convictionCards = [
  {
    title: "MARKET REGIME",
    max: 20,
    desc: "Is the market trending, ranging, or volatile? Trending markets favor momentum entries.",
  },
  {
    title: "SETUP QUALITY",
    max: 25,
    desc: "How clean is the technical setup? Higher lows, defined swing structure, clear entries.",
  },
  {
    title: "CONFLUENCE",
    max: 25,
    desc: "How many signals align? Velocity + sector + structure = strong confluence.",
  },
  {
    title: "RISK DEFINITION",
    max: 15,
    desc: "Is the stop loss well-defined? Clear swing lows, previous day levels.",
  },
  {
    title: "VOLUME CONVICTION",
    max: 15,
    desc: "Is volume confirming? CVD direction, relative volume above average.",
  },
];

export const activeRules = [
  {
    type: "entry",
    title: "ENTRY",
    points: [
      {
        text: "Never enter a trade in the first 15 minutes — let the opening range form.",
        applied: "12x",
        helpful: "10x",
        rate: "83%",
        since: "2026-01-20",
      },
      {
        text: "After a winning trade, wait at least 2 cycles before re-entering to avoid revenge/euphoria trades.",
        applied: "4x",
        helpful: "3x",
        rate: "75%",
        since: "2026-01-28",
      },
      {
        text: "For options, only enter when R:R is at least 2.5:1 and premium is within budget.",
        applied: "3x",
        helpful: "2x",
        rate: "67%",
        since: "2026-01-18",
      },
    ],
  },
  {
    type: "skip",
    title: "SKIP",
    desc: "If CVD diverges against the setup direction, skip regardless of other confluence.",
    applied: "6x",
    helpful: "5x",
    rate: "83%",
    since: "2026-01-24",
  },
  {
    type: "position",
    title: "POSITION MANAGEMENT",
    desc: "Move stop to breakeven once position is +1R in profit.",
    applied: "6x",
    helpful: "5x",
    rate: "83%",
    since: "2026-01-24",
  },
];

export const riskManagement = {
  capitalAndSizing: [
    {
      label: "Starting Capital",
      value: "₹2,50,000",
    },
    {
      label: "Max Concurrent Positions",
      value: "3",
    },
    {
      label: "Product Type",
      value: "MIS (Intraday only)",
    },
    {
      label: "Options Min R:R",
      value: "2.5:1",
    },
  ],

  circuitBreakers: [
    {
      level: "LEVEL 1",
      value: "-₹5,000 (-2%)",
      desc: "Max 2 positions, review mode",
    },
    {
      level: "LEVEL 2",
      value: "-₹8,750 (-3.5%)",
      desc: "No new trades, manage existing only",
    },
    {
      level: "LEVEL 3",
      value: "-₹12,500 (-5%)",
      desc: "Close all positions immediately",
    },
    {
      level: "WEEKLY PAUSE",
      value: "-₹20,000 (-8%)",
      desc: "Full trading halt until next week",
    },
  ],

  hardRules: [
    "Never add to a losing position",
    "Never move a stop loss further from entry",
    "Always have a pre-defined stop loss before entry",
    "All positions closed before 3:15 PM — intraday requirement, no overnight exposure.",
  ],
};

export const instruments = [
  {
    title: "EQUITIES",
    desc: "NIFTY 50 stocks with MIS margins. Sector-first approach.",
  },
  {
    title: "INDEX OPTIONS",
    desc: "NIFTY weekly, SENSEX weekly. Buying only. Min R:R 2.5:1",
  },
];