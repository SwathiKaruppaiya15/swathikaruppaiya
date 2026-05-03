export const personalInfo = {
  name: "Swathi Karuppaiya",
  title: "Backend Engineer",
  tagline: "I build real-time, scalable backend systems.",
  email: "thesde.swathi1215@gmail.com",
  github: "https://github.com/SwathiKaruppaiya15",
  linkedin: "https://www.linkedin.com/in/swathi-karuppaiya-88b774319/",
  location: "Coimbatore, Tamil Nadu, India",
  college: "KIT — Kalaignarkarunanidhi Institute of Technology",
  degree: "B.Tech — Computer Science & Business Systems",
  available: true,
};

export const stats = [
  { value: 900, suffix: "+", label: "DSA Problems Solved", sublabel: "LeetCode + GFG + CodeChef" },
  { value: 50,  suffix: "+", label: "Contests Participated", sublabel: "Competitive Programming" },
  { value: 1561, suffix: "", label: "LeetCode Rating", sublabel: "thecode_1215" },
  { value: 1483, suffix: "", label: "CodeChef Rating", sublabel: "thecode_1215" },
];

export const skills = {
  backend: [
    { name: "Core Java",              level: 88 },
    { name: "Spring Boot",            level: 87 },
    { name: "Spring Security / JWT",  level: 83 },
    { name: "RESTful APIs",           level: 88 },
    { name: "WebSocket (STOMP)",      level: 82 },
    { name: "Microservices",          level: 80 },
  ],
  database: [
    { name: "PostgreSQL",             level: 85 },
    { name: "JPA / Hibernate",        level: 83 },
    { name: "SQL Optimization",       level: 80 },
    { name: "Redis",                  level: 78 },
  ],
  devops: [
    { name: "Docker",                 level: 82 },
    { name: "Git & GitHub",           level: 88 },
    { name: "Maven",                  level: 83 },
    { name: "Render / Vercel Deploy", level: 80 },
  ],
  concepts: [
    { name: "DSA",                    level: 88 },
    { name: "OOP",                    level: 90 },
    { name: "System Design Basics",   level: 82 },
    { name: "Distributed Systems",    level: 80 },
    { name: "Concurrency",            level: 82 },
    { name: "OS & DBMS",              level: 83 },
  ],
};

export const radarSkills = [
  { label: "System Design", value: 82 },
  { label: "Concurrency",   value: 82 },
  { label: "API Design",    value: 88 },
  { label: "Databases",     value: 85 },
  { label: "DevOps",        value: 82 },
  { label: "DSA",           value: 88 },
];

export const projects = [
  {
    id: "collabcode",
    name: "Realtime Dev Collab Platform",
    tagline: "Real-time collaborative code editor with AI assistance and sandboxed multi-language execution",
    status: "Live on Vercel",
    color: "#6366f1",
    problem:
      "Building a collaborative IDE where multiple developers can edit code simultaneously in the same room, chat in real-time, execute code in isolated Docker containers across multiple languages, and get AI-powered suggestions — all without conflicts or security vulnerabilities.",
    architecture: [
      { id: "client",  label: "React + Monaco",    color: "rgba(99,102,241,0.15)",  border: "rgba(99,102,241,0.4)"  },
      { id: "ws",      label: "Spring WS (STOMP)", color: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.4)" },
      { id: "docker",  label: "Docker Sandbox",    color: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.4)" },
      { id: "openai",  label: "OpenAI GPT-4o",     color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)" },
      { id: "pg",      label: "PostgreSQL / Neon", color: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.4)"  },
    ],
    flows: [
      ["client",  "ws",     "SockJS + STOMP"],
      ["ws",      "docker", "Code execution request"],
      ["client",  "openai", "AI prompt (GPT-4o-mini)"],
      ["ws",      "pg",     "Persist rooms & messages"],
    ],
    stack: [
      "Java 17", "Spring Boot", "WebSocket", "STOMP", "SockJS",
      "JWT", "RBAC", "Docker", "PostgreSQL", "Neon",
      "React", "Monaco Editor", "OpenAI API", "Vercel", "Render",
    ],
    challenges: [
      "Synchronising live edits across multiple users in the same room without conflicts",
      "Isolating code execution per language (Java, Python, Node.js, C++) with timeout & memory limits",
      "Implementing role-based access (Admin / Editor / Viewer) enforced at both API and WebSocket layer",
      "Integrating OpenAI GPT-4o-mini inline without blocking the real-time editing experience",
      "Managing WebSocket session state across room joins, disconnects, and reconnects",
    ],
    solutions: [
      "Room-scoped STOMP topics broadcast every keystroke delta to all subscribers in real time",
      "Each execution spawns a fresh Docker container with CPU/memory caps, killed after 10s timeout, with temp file isolation",
      "Spring Security + JWT enforces RBAC on every REST endpoint and WebSocket handshake",
      "AI requests are async — streamed responses injected into the inline assistant panel without blocking the editor",
      "PostgreSQL persists room state (members, messages, notifications) so reconnecting clients restore full context",
    ],
    metrics: [
      { label: "Languages Supported", value: "4"       },
      { label: "Execution Isolation",  value: "100%"   },
      { label: "Auth Roles",           value: "3"      },
      { label: "Deployment",           value: "Live ✓" },
    ],
    github: "https://github.com/SwathiKaruppaiya15/realtime-dev-collab-platform",
    demo:   "https://realtime-dev-collab-platform.vercel.app/",
  },
  {
    id: "sneakcart",
    name: "SneakCart",
    tagline: "Microservices-based real-time auction platform with live bidding via WebSockets",
    status: "Live on Render",
    color: "#f59e0b",
    problem:
      "Designing a sneaker auction platform built on microservices where users bid in real time, services communicate independently, and the system stays consistent under concurrent bid submissions — without a monolithic bottleneck.",
    architecture: [
      { id: "client",   label: "React Client",      color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)" },
      { id: "gateway",  label: "API Gateway",        color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)" },
      { id: "bidding",  label: "Bidding Service",    color: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.4)" },
      { id: "ws",       label: "WebSocket (STOMP)",  color: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.4)" },
      { id: "pg",       label: "PostgreSQL / Neon",  color: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.4)"  },
    ],
    flows: [
      ["client",  "gateway",  "All API calls"],
      ["gateway", "bidding",  "Route bid request"],
      ["bidding", "ws",       "Broadcast live update"],
      ["bidding", "pg",       "Persist bid & winner"],
    ],
    stack: [
      "Java", "Spring Boot", "Microservices", "API Gateway",
      "WebSocket", "STOMP", "SockJS", "Spring Security", "JWT",
      "PostgreSQL", "Neon", "JPA / Hibernate",
      "React", "Vite", "React Router", "Vercel", "Render", "Docker", "Maven",
    ],
    challenges: [
      "Routing requests correctly across independent microservices (Auth, Product, Order, Bidding) via a single API Gateway",
      "Delivering live bid updates to all connected clients the moment a new bid is placed",
      "Preventing concurrent bid conflicts when multiple users submit at the same instant",
      "Keeping JWT authentication consistent across all microservice boundaries",
      "Managing independent deployments of each service on Render without downtime",
    ],
    solutions: [
      "API Gateway routes all traffic to the correct downstream service, decoupling the frontend from service topology",
      "Spring Boot WebSocket with STOMP broadcasts every accepted bid to the auction room topic in real time",
      "Database-level constraints and service-layer validation prevent duplicate or out-of-order bids",
      "JWT tokens validated at the Gateway and passed downstream; each service trusts the verified claims",
      "Each microservice is a standalone Spring Boot app deployed independently on Render with environment-variable config",
    ],
    metrics: [
      { label: "Microservices",    value: "5"      },
      { label: "Bid Broadcast",    value: "Live"   },
      { label: "Auth Strategy",    value: "JWT"    },
      { label: "Deployment",       value: "Live ✓" },
    ],
    github: "https://github.com/SwathiKaruppaiya15/sneakcart-with_realtime_bidding",
    demo:   "https://github.com/SwathiKaruppaiya15/sneakcart-with_realtime_bidding",
  },
  {
    id: "numtrack",
    name: "NumTrack",
    tagline: "Subscription tracker with automated billing engine, scheduled reminders, and spend analytics",
    status: "Production-Ready",
    color: "#22d3ee",
    problem:
      "Building a backend system that tracks recurring subscriptions, automatically runs billing cycles on schedule, detects unused subscriptions, sends pre-billing alerts, and gives users a clear analytics view of their monthly spend — all without manual triggers.",
    architecture: [
      { id: "api",       label: "Spring Boot API",    color: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.4)" },
      { id: "scheduler", label: "Spring Scheduler",   color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)" },
      { id: "billing",   label: "Billing Engine",     color: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.4)" },
      { id: "notify",    label: "Notification System",color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)" },
      { id: "pg",        label: "PostgreSQL / Neon",  color: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.4)"  },
    ],
    flows: [
      ["api",       "scheduler", "Register subscription"],
      ["scheduler", "billing",   "Trigger billing cycle"],
      ["scheduler", "notify",    "Fire reminder alerts"],
      ["billing",   "pg",        "Persist billing record"],
    ],
    stack: [
      "Java 17", "Spring Boot", "Spring Scheduler", "Spring Security", "JWT",
      "Spring Data JPA", "Hibernate", "HikariCP",
      "PostgreSQL", "Neon",
      "React", "Vite", "Tailwind CSS", "Axios", "React Router",
      "Render", "Vercel", "Maven", "Postman",
    ],
    challenges: [
      "Handling monthly/yearly billing edge cases (e.g., Feb 28/29, end-of-month cycles) without skipping or double-billing",
      "Running scheduled jobs reliably on Render's free tier where the server may spin down between requests",
      "Detecting genuinely unused subscriptions vs. low-usage ones without false positives",
      "Sending pre-billing notifications at the right time window before each renewal date",
      "Providing per-category spend analytics without expensive aggregation queries on every request",
    ],
    solutions: [
      "Billing engine normalises all cycle dates to safe values (e.g., last day of month) before persisting the next-run timestamp",
      "Spring Scheduler cron jobs run on a fixed schedule; HikariCP connection pooling keeps DB connections warm",
      "Usage tracking compares last-active timestamp against a configurable inactivity threshold per subscription",
      "Notification system queries subscriptions due within a configurable lead-time window and dispatches alerts",
      "Analytics engine pre-aggregates monthly spend and category breakdown on write, serving reads from indexed summary rows",
    ],
    metrics: [
      { label: "Billing Accuracy", value: "100%"  },
      { label: "Scheduler",        value: "Cron"  },
      { label: "Auth",             value: "JWT"   },
      { label: "Deployment",       value: "Live ✓"},
    ],
    github: "https://github.com/SwathiKaruppaiya15/numTrack-subscription-tracker",
    demo:   "https://github.com/SwathiKaruppaiya15/numTrack-subscription-tracker",
  },
];

export const systemDesigns = [
  {
    title: "Real-Time Collaborative Editor",
    description: "Room-scoped WebSocket topics broadcast edit deltas to all subscribers; Docker containers isolate code execution per run.",
    nodes: ["React + Monaco", "Spring WS", "STOMP Topics", "Docker Sandbox", "PostgreSQL"],
    insight: "Every keystroke delta is published to a room-scoped STOMP topic. All subscribers receive it instantly. Docker ensures no execution bleeds into another user's session.",
  },
  {
    title: "Microservices Auction System",
    description: "API Gateway routes traffic across independent services; WebSocket broadcasts live bids to all auction room subscribers.",
    nodes: ["API Gateway", "Auth Service", "Bidding Service", "WebSocket Broker", "PostgreSQL"],
    insight: "The Gateway is the single entry point — it validates the JWT and routes to the correct service. The Bidding Service owns the auction state and pushes updates via STOMP.",
  },
  {
    title: "Automated Billing Engine",
    description: "Spring Scheduler triggers billing cycles and reminder notifications on cron; edge-case date normalisation prevents missed or duplicate charges.",
    nodes: ["REST API", "Spring Scheduler", "Billing Engine", "Notification System", "PostgreSQL"],
    insight: "The scheduler fires a cron job that queries all subscriptions due within the next billing window, normalises edge-case dates, runs the billing logic, and dispatches pre-billing alerts — all without a manual trigger.",
  },
];

export const timeline = [
  {
    year: "2021",
    title: "Started CS Journey",
    description: "Began competitive programming, solved first 100 DSA problems",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Backend Deep Dive",
    description: "Mastered Java, Spring Boot, built first REST APIs with PostgreSQL",
    icon: "⚙️",
  },
  {
    year: "2023",
    title: "Real-Time Systems",
    description: "Built CollabCode — WebSockets, Redis Pub/Sub, Docker sandboxing",
    icon: "🔌",
  },
  {
    year: "2024",
    title: "Distributed Architecture",
    description: "SneakCart auction system, distributed locks, concurrency patterns",
    icon: "🏗️",
  },
  {
    year: "2025",
    title: "Production Systems",
    description: "NumTrack scheduler, system design mastery, 900+ DSA problems",
    icon: "🎯",
  },
];

export const terminalCommands = [
  { cmd: "whoami",
    output: "swathi-karuppaiya — Backend Engineer · Coimbatore, India" },
  { cmd: "cat skills.txt",
    output: "Java · Spring Boot · WebSocket (STOMP) · Docker · PostgreSQL · JWT · Redis · Microservices" },
  { cmd: "ls projects/",
    output: "realtime-dev-collab-platform/   sneakcart-with_realtime_bidding/   numTrack-subscription-tracker/" },
  { cmd: "docker ps",
    output: "CONTAINER ID   IMAGE                STATUS\na1b2c3d4e5f6   collab-sandbox-java  Up (exec)\nb2c3d4e5f6a7   collab-sandbox-py    Up (exec)\nc3d4e5f6a7b8   collab-sandbox-node  Up (exec)" },
  { cmd: "git log --oneline -3",
    output: "3f9a1b2 feat: AI inline assistant panel (GPT-4o-mini)\n8c2d4e1 feat: microservices API gateway routing\n1a7f3b9 fix: Spring Scheduler billing edge-case date normalisation" },
  { cmd: "curl localhost:8080/api/stats",
    output: '{ "dsa_solved": "900+", "contests": "50+", "leetcode": 1561, "codechef": 1483 }' },
];
