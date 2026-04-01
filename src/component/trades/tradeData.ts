export type TradeItem = {
  side: "B" | "S";
  symbol: string;
  qty: number;
  avgPrice: string;
  pnl: number;
};

export type WatchlistItem = {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
};

export type SessionFlowItem = {
  time: string;
  label: string;
  active?: boolean;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user" | "system";
  time: string;
  text: string;
  shortText?: string;
  expandable?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  statusLabel?: string;
  statusSubLabel?: string;
};
export type FeedItemType =
  | "marketStatus"
  | "userQuery"
  | "agentThought"
  | "agentResponse"
  | "circuitBreaker"
  | "dailyJournal"
  | "positionUpdate"
  | "tradePlan"
  | "tradeExecuted"
  | "tradeClosed"
  | "tradeSkipped"
  | "instrumentOverview"
  | "cycleCollapsed"
  | "cycleExpanded";

export type FeedItem = {
  id: string;
  type: FeedItemType;
  time?: string;

  // common text
  title?: string;
  subtitle?: string;
  text?: string;
  shortText?: string;
  expandable?: boolean;

  // CTA
  ctaLabel?: string;
  ctaHref?: string;

  // market open / closed
  statusLabel?: string;
  statusTime?: string;
  statusTone?: "open" | "closed";

  // user query
  queryText?: string;

  // thought bucket
  bucket?: "ANALYZING" | "EVALUATING" | "ACTION" | "SCANNING";
  bucketState?: string;

  // circuit breaker
  level?: string;
  pnl?: string;
  note?: string;

  // journal
  journalDate?: string;
  journalBullets?: string[];

  // trade cards
  symbol?: string;
  side?: "LONG" | "SHORT" | "HOLD" | "SKIP";
  quantity?: string;
  entry?: string;
  stop?: string;
  target?: string;
  rr?: string;
  risk?: string;
  exit?: string;
  holdTime?: string;
  reason?: string;

  // instrument overview
  score?: string;
  grade?: string;
  actionLabel?: string;
  metrics?: {
    label: string;
    value: string;
    tone: "green" | "yellow" | "red";
  }[];

  // cycles
  cycleWindow?: string;
  cycleSummary?: string;
  cycleUpdates?: string[];
};

export type AgentTradeData = {
  id: string;
  title: string;
  description: string;
  totalPnL: number|string;
  marketStatus: {
    label: string;
    time: string;
  };
  summary: {
    trades: number;
    wins: number;
    losses: number;
  };
  trades: TradeItem[];
  watchlist: WatchlistItem[];
  sessionFlow: SessionFlowItem[];
  conversation: FeedItem[];
};


export const tradeAgentsData: Record<string, AgentTradeData> = {
  cinderclaw: {
    id: "cinderclaw",
    title: "Cinderclaw",
    description:
      "Indian indices. Reads structure, waits for confluence, strikes clean.",
    totalPnL: 100,
    marketStatus: {
      label: "MARKET OPEN",
      time: "09:15 AM",
    },
    summary: {
      trades: 2,
      wins: 1,
      losses: 1,
    },
    trades: [
      {
        side: "B",
        symbol: "NIFTY23JUN 23500CE",
        qty: 1,
        avgPrice: "₹2,660",
        pnl: 200,
      },
      {
        side: "S",
        symbol: "SENSEX23JUN 21000PE",
        qty: 3,
        avgPrice: "₹2,660",
        pnl: -2660,
      },
      
    ],
    watchlist: [
      {
        label: "NIFTY",
        value: "25,560",
        change: "-0.87%",
        positive: false,
      },
      {
        label: "SENSEX",
        value: "82,906",
        change: "-1.02%",
        positive: false,
      },
      {
        label: "INDIAVIX",
        value: "1,638",
        change: "-0.42%",
        positive: false,
      },
    ],
    sessionFlow: [
      {
        time: "11:15",
        label: "Closed -₹3,051",
      },
      {
        time: "11:45",
        label: "Circuit Breaker L1",
        active: true,
      },
      {
        time: "11:15",
        label: "Closed -₹3,051",
      },
      {
        time: "11:45",
        label: "Circuit Breaker L1",
        active: true,
      },
    ],
    conversation: [
  {
    id: "af-market-1",
    type: "marketStatus",
    statusLabel: "MARKET OPEN",
    statusTime: "09:15 AM",
    statusTone: "open",
  },
  {
    id: "af-thought-1",
    type: "agentThought",
    time: "09:15",
    bucket: "ANALYZING",
    bucketState: "THINKING",
    text: "Post-expiry consolidation. Banking sector has been the strongest read all morning. Let me check if the HDFCBANK setup is still developing.",
  },
  {
    id: "af-user-1",
    type: "userQuery",
    time: "09:15",
    queryText:
      "Post-expiry market snapshot: GEX regime right now (positive/negative), sector breadth distribution, and which sectors/stocks are showing the strongest moves — both upside momentum AND downside weakness. Any unusual velocity spikes or structural breaks forming?",
  },
  {
    id: "af-response-1",
    type: "agentResponse",
    time: "09:16",
    shortText:
      "Positive GEX environment, 68% breadth — solid participation. Banking sector leading +0.8% with HDFCBANK and KOTAKBANK showing velocity at 76th percentile, expanding.",
    text: "Positive GEX environment, 68% breadth — solid participation. Banking sector leading +0.8% with HDFCBANK and KOTAKBANK showing velocity at 76th percentile, expanding. IT sector flat-to-down slightly. Mid-cap weakness: TRENT down 1.2% with velocity bearish at 72nd percentile downward.",
    expandable: true,
    ctaLabel: "Try Draconic",
    ctaHref: "http://hunt.draconic.ai/",
  },
  {
    id: "af-user-2",
    type: "userQuery",
    time: "09:16",
    queryText:
      "HDFCBANK 5m deep dive: Current velocity percentile and trajectory (expanding or contracting?), microstructure at current level, CVD direction, nearest resistance and support. Is there a clean entry here or are we already extended?",
  },
  {
    id: "af-response-2",
    type: "agentResponse",
    time: "09:17",
    shortText:
      "HDFCBANK velocity 76th percentile, expanding — not decelerating. Microstructure 71% acceptance above POC at 1,642.",
    text: "HDFCBANK velocity 76th percentile, expanding — not decelerating. Microstructure 71% acceptance above POC at 1,642. CVD decisively positive, 1.6x volume. Resistance cluster at 1,655-1,658. No exhaustion signals. R:R 1.67:1 on a 1,655 target with stop at 1,630.",
    expandable: true,
    ctaLabel: "Try Draconic",
    ctaHref: "http://hunt.draconic.ai/",
  },
  {
    id: "af-action-1",
    type: "agentThought",
    bucket: "ACTION",
    bucketState: "BUILDING",
    text: "Banking is the post-expiry story — 68% breadth supporting sector strength. HDFCBANK cleanest: velocity expanding at 76th percentile, microstructure accepting at current levels with CVD backing.",
  },
  {
    id: "af-cb-1",
    type: "circuitBreaker",
    time: "10:05 AM",
    title: "CIRCUIT BREAKER",
    level: "LEVEL 1",
    pnl: "-₹5,386 (-2.15%)",
    note: "Max 2 positions rest of day",
  },
  // {
  //   id: "af-journal-1",
  //   type: "dailyJournal",
  //   title: "DAILY JOURNAL",
  //   journalDate: "13 FEB 2026",
  //   text: "Rough day. Three trades, three stops. The NIFTY CE mean-reversion was the right read structurally but executed too early.",
  //   journalBullets: [
  //     "Velocity decelerating at entry if dead thesis, but wait for confirmation",
  //     "Positive GEX really does cage directional option plays",
  //     "Post-expiry sector strength needs 2+ hours to confirm",
  //   ],
  // },
  {
    id: "af-plan-1",
    type: "tradePlan",
    title: "TRADE PLAN",
    time: "09:18 AM",
    symbol: "LONG HDFCBANK",
    quantity: "133 Shares",
    entry: "₹1,645",
    stop: "₹1,630",
    target: "₹1,655",
    rr: "1.67:1",
    risk: "₹1,995",
    reason:
      "Banking sector leading post-expiry. HDFCBANK velocity expanding 76th percentile, microstructure accepting, CVD positive 1.6x volume.",
  },
  {
    id: "af-exec-1",
    type: "tradeExecuted",
    title: "TRADE EXECUTED",
    time: "09:19 AM",
    symbol: "HDFCBANK",
    side: "LONG",
    quantity: "133 Shares",
    entry: "₹1,645",
    stop: "₹1,630 Placed",
    risk: "₹1,995 (0.80% of capital)",
  },
  {
    id: "af-closed-1",
    type: "tradeClosed",
    title: "TRADE CLOSED",
    time: "10:00 AM",
    symbol: "LONG HDFCBANK",
    quantity: "133 Shares",
    entry: "₹1,645",
    exit: "₹1,622",
    pnl: "-₹3,051",
    holdTime: "86 min",
    reason:
      "Error: Entered on sector strength that reversed within 90 min. Post-expiry banking strength was temporary.",
  },
  {
    id: "af-skip-1",
    type: "tradeSkipped",
    title: "SKIPPED",
    symbol: "RELIANCE",
    side: "LONG",
    text: "R:R at 1.3:1 is below my 1.5:1 stock minimum. Good relative strength and real volume, but the target doesn’t give enough reward for a stop at 1,210.",
    reason:
      "Would reconsider if: pullback to 1,221 with RR above 1.5:1, or clean breakout above 1,235 with expanding volume.",
  },
  
  
],
  },

  ashfang: {
    id: "ashfang",
    title: "Ashfang",
    description:
      "Indian equities. Hunts momentum, follows institutional flow, moves fast.",
    totalPnL: -100,
    marketStatus: {
      label: "MARKET OPEN",
      time: "09:15 AM",
    },
    summary: {
      trades: 2,
      wins: 1,
      losses: 1,
    },
    trades: [
      {
        side: "B",
        symbol: "HDFCBANK",
        qty: 1,
        avgPrice: "₹912",
        pnl: 998,
      },
      {
        side: "S",
        symbol: "TATASTEEL",
        qty: 2,
        avgPrice: "₹1,560",
        pnl: -1098,
      },
    ],
    watchlist: [
      {
        label: "TATAMOTOR",
        value: "860",
        change: "+0.67%",
        positive: true,
      },
      {
        label: "HDFCBANK",
        value: "1,638",
        change: "-0.42%",
        positive: false,
      },
      {
        label: "RELIANCE",
        value: "1,221",
        change: "+0.41%",
        positive: true,
      },
    ],
    sessionFlow: [
      {
        time: "10:04",
        label: "Skipped RELIANCE",
      },
      {
        time: "10:52",
        label: "NIFTY CE pressure",
      },
      {
        time: "11:15",
        label: "Closed -₹3,051",
      },
      {
        time: "11:45",
        label: "Circuit Breaker L1",
        active: true,
      },
    ],
    conversation: [
  {
    id: "af-market-1",
    type: "marketStatus",
    statusLabel: "MARKET OPEN",
    statusTime: "09:15 AM",
    statusTone: "open",
  },
  {
    id: "af-thought-1",
    type: "agentThought",
    time: "09:15",
    bucket: "ANALYZING",
    bucketState: "THINKING",
    text: "Post-expiry consolidation. Banking sector has been the strongest read all morning. Let me check if the HDFCBANK setup is still developing.",
  },
  {
    id: "af-user-1",
    type: "userQuery",
    time: "09:15",
    queryText:
      "Post-expiry market snapshot: GEX regime right now (positive/negative), sector breadth distribution, and which sectors/stocks are showing the strongest moves — both upside momentum AND downside weakness. Any unusual velocity spikes or structural breaks forming?",
  },
  {
    id: "af-response-1",
    type: "agentResponse",
    time: "09:16",
    shortText:
      "Positive GEX environment, 68% breadth — solid participation. Banking sector leading +0.8% with HDFCBANK and KOTAKBANK showing velocity at 76th percentile, expanding.",
    text: "Positive GEX environment, 68% breadth — solid participation. Banking sector leading +0.8% with HDFCBANK and KOTAKBANK showing velocity at 76th percentile, expanding. IT sector flat-to-down slightly. Mid-cap weakness: TRENT down 1.2% with velocity bearish at 72nd percentile downward.",
    expandable: true,
    ctaLabel: "Try Draconic",
    ctaHref: "http://hunt.draconic.ai/",
  },
  {
    id: "af-user-2",
    type: "userQuery",
    time: "09:16",
    queryText:
      "HDFCBANK 5m deep dive: Current velocity percentile and trajectory (expanding or contracting?), microstructure at current level, CVD direction, nearest resistance and support. Is there a clean entry here or are we already extended?",
  },
  {
    id: "af-response-2",
    type: "agentResponse",
    time: "09:17",
    shortText:
      "HDFCBANK velocity 76th percentile, expanding — not decelerating. Microstructure 71% acceptance above POC at 1,642.",
    text: "HDFCBANK velocity 76th percentile, expanding — not decelerating. Microstructure 71% acceptance above POC at 1,642. CVD decisively positive, 1.6x volume. Resistance cluster at 1,655-1,658. No exhaustion signals. R:R 1.67:1 on a 1,655 target with stop at 1,630.",
    expandable: true,
    ctaLabel: "Try Draconic",
    ctaHref: "http://hunt.draconic.ai/",
  },
  {
    id: "af-action-1",
    type: "agentThought",
    bucket: "ACTION",
    bucketState: "BUILDING",
    text: "Banking is the post-expiry story — 68% breadth supporting sector strength. HDFCBANK cleanest: velocity expanding at 76th percentile, microstructure accepting at current levels with CVD backing.",
  },
  {
    id: "af-cb-1",
    type: "circuitBreaker",
    time: "10:05 AM",
    title: "CIRCUIT BREAKER",
    level: "LEVEL 1",
    pnl: "-₹5,386 (-2.15%)",
    note: "Max 2 positions rest of day",
  },
  // {
  //   id: "af-journal-1",
  //   type: "dailyJournal",
  //   title: "DAILY JOURNAL",
  //   journalDate: "13 FEB 2026",
  //   text: "Rough day. Three trades, three stops. The NIFTY CE mean-reversion was the right read structurally but executed too early.",
  //   journalBullets: [
  //     "Velocity decelerating at entry if dead thesis, but wait for confirmation",
  //     "Positive GEX really does cage directional option plays",
  //     "Post-expiry sector strength needs 2+ hours to confirm",
  //   ],
  // },
  {
    id: "af-plan-1",
    type: "tradePlan",
    title: "TRADE PLAN",
    time: "09:18 AM",
    symbol: "LONG HDFCBANK",
    quantity: "133 Shares",
    entry: "₹1,645",
    stop: "₹1,630",
    target: "₹1,655",
    rr: "1.67:1",
    risk: "₹1,995",
    reason:
      "Banking sector leading post-expiry. HDFCBANK velocity expanding 76th percentile, microstructure accepting, CVD positive 1.6x volume.",
  },
  {
    id: "af-exec-1",
    type: "tradeExecuted",
    title: "TRADE EXECUTED",
    time: "09:19 AM",
    symbol: "HDFCBANK",
    side: "LONG",
    quantity: "133 Shares",
    entry: "₹1,645",
    stop: "₹1,630 Placed",
    risk: "₹1,995 (0.80% of capital)",
  },
  {
    id: "af-closed-1",
    type: "tradeClosed",
    title: "TRADE CLOSED",
    time: "10:00 AM",
    symbol: "LONG HDFCBANK",
    quantity: "133 Shares",
    entry: "₹1,645",
    exit: "₹1,622",
    pnl: "-₹3,051",
    holdTime: "86 min",
    reason:
      "Error: Entered on sector strength that reversed within 90 min. Post-expiry banking strength was temporary.",
  },
  {
    id: "af-skip-1",
    type: "tradeSkipped",
    title: "SKIPPED",
    symbol: "RELIANCE",
    side: "LONG",
    text: "R:R at 1.3:1 is below my 1.5:1 stock minimum. Good relative strength and real volume, but the target doesn’t give enough reward for a stop at 1,210.",
    reason:
      "Would reconsider if: pullback to 1,221 with RR above 1.5:1, or clean breakout above 1,235 with expanding volume.",
  },
  {
    id: "af-inst-1",
    type: "instrumentOverview",
    title: "HDFCBANK",
    subtitle: "STOCK",
    score: "81%",
    grade: "HIGH",
    actionLabel: "ENTER",
    metrics: [
      { label: "MARKET REGIME", value: "16/20", tone: "green" },
      { label: "SETUP QUALITY", value: "20/25", tone: "green" },
      { label: "CONFLUENCE", value: "19/25", tone: "green" },
      { label: "RISK DEFINITION", value: "13/15", tone: "green" },
      { label: "VOLUME CONVICTION", value: "13/15", tone: "green" },
    ],
  },
  {
    id: "af-cycle-1",
    type: "cycleExpanded",
    title: "IN BETWEEN CYCLES",
    cycleWindow: "10:09 – 10:39 AM",
    cycleSummary:
      "Market grinding in 25,530-25,560 range. HDFCBANK position steady. No new setups meeting criteria.",
    cycleUpdates: [
      "10:09 — Checked NIFTY range, HDFCBANK holding. No setup.",
      "10:14 — RELIANCE consolidating at 1,222. Still watching.",
      "10:19 — Breadth still weak 40%. Banking fading. Energy flat.",
      "10:24 — No change. NIFTY range-bound. Holding HDFCBANK.",
      "10:29 — IT sector stirring slightly. INFY +0.5%. Not enough.",
      "10:32 — Still range-bound. Patience. Waiting for structure break.",
    ],
  },
]
  },

  agentThree: {
    id: "agentThree",
    title: "Agent Three",
    description:
      "Multi-signal analyst. Tracks short-term structure and tactical reversals.",
    totalPnL: "-",
    marketStatus: {
      label: "MARKET OPEN",
      time: "09:15 AM",
    },
    summary: {
      trades: 0,
      wins: 0,
      losses: 0,
    },
    trades: [],
    watchlist: [],
    sessionFlow: [],
    conversation: [
      
    ],
  },

  agentFour: {
    id: "agentFour",
    title: "Agent Four",
    description:
      "Volatility-focused agent. Reads gamma, flow, and intraday positioning.",
    totalPnL: "-",
    marketStatus: {
      label: "MARKET OPEN",
      time: "09:15 AM",
    },
    summary: {
      trades: 0,
      wins: 0,
      losses: 0,
    },
    trades: [],
    watchlist: [],
    sessionFlow: [],
    conversation: [
      
    ],
  },

  agentFive: {
    id: "agentFive",
    title: "Agent Five",
    description:
      "Execution-focused assistant. Filters noise and sharpens entry timing.",
    totalPnL: "-",
    marketStatus: {
      label: "MARKET OPEN",
      time: "09:15 AM",
    },
    summary: {
      trades: 0,
      wins: 0,
      losses: 0,
    },
    trades: [],
    watchlist: [],
    sessionFlow: [],
    conversation: [
      
    ],
  },
};

export const tradeTabs = [
  { key: "cinderclaw", label: "Cinderclaw" },
  { key: "ashfang", label: "Ashfang" },
  { key: "agentThree", label: "Agent Three" },
  { key: "agentFour", label: "Agent Four" },
  { key: "agentFive", label: "Agent Five" },
] as const;