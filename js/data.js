/**
 * Maximalist College Student Developer Portfolio Configuration
 * Persona: B.Tech CS Undergrad ('26) • 4x Hackathon Winner • 3 AM Builder
 */

window.PORTFOLIO_DATA = {
  personal: {
    name: "Aadesh",
    surname: "Sharma",
    handle: "@aadesh.builds",
    role: "CS Undergrad @ Apex Tech '26 • Hackathon Addict • Full Stack Systems Hacker",
    availability: "Building side projects at 3 AM • Open for Summer '26 Internships & Co-ops",
    isAvailable: true,
    university: "Apex Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering (Class of 2026)",
    gpa: "9.3 / 10.0",
    location: "Bengaluru, India",
    timezone: "Asia/Kolkata",
    utcOffset: "+05:30",
    bio: "Computer Science undergrad turning caffeine into high-throughput distributed systems, autonomous AI agents, and experimental WebGL interfaces. 4x hackathon champion who thrives in 36-hour sprint environments and loves breaking & fixing production.",
    email: "aadesh.dev@example.com",
    resumeUrl: "#resume",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com"
    }
  },

  stats: [
    { label: "Hackathons Conquered", value: 4, suffix: "x 🏆" },
    { label: "Coffees Consumed", value: 1420, suffix: " ☕" },
    { label: "3 AM Code Pushes", value: 248, suffix: " 🌙" },
    { label: "Production Apps", value: 16, suffix: " 🚀" }
  ],

  caffeineGauge: {
    initialPercent: 88,
    label: "3 AM Dorm Energy Level",
    statusText: "Overclocked on Nitro Cold Brew"
  },

  stickers: [
    { id: "stk-1", text: "☕ POWERED BY CAFFEINE", color: "#f59e0b", rotation: -6, top: 12, left: 8 },
    { id: "stk-2", text: "🏆 4X HACKATHON WINNER", color: "#00f0ff", rotation: 4, top: 22, right: 6 },
    { id: "stk-3", text: "⚡ git push --force", color: "#ec4899", rotation: -3, bottom: 18, left: 10 },
    { id: "stk-4", text: "🌙 3:42 AM COMMITS", color: "#a855f7", rotation: 8, bottom: 25, right: 12 },
    { id: "stk-5", text: "💻 B.TECH CS '26", color: "#10b981", rotation: -5, top: 60, right: 5 }
  ],

  trophies: [
    {
      title: "1st Place — National Smart India Hackathon '25",
      category: "AI & Distributed Systems",
      date: "Nov 2025",
      prize: "₹1,00,000 Grand Prize",
      description: "Built decentralized offline-first edge emergency mesh network with real-time AI casualty triage.",
      tags: ["Python", "WebSockets", "FastAPI", "Raspberry Pi", "ChromaDB"]
    },
    {
      title: "Best AI Agent Tool — ETHIndia '24",
      category: "Web3 & Autonomous Agents",
      date: "Dec 2024",
      prize: "$3,500 Track Bounty",
      description: "Synthesized multi-agent arbitration bot checking flash-loan smart contracts for malicious re-entrancy.",
      tags: ["Solidity", "TypeScript", "LangChain", "Ethers.js"]
    },
    {
      title: "Grand Champion — HackNITR 5.0",
      category: "Developer Tooling",
      date: "Mar 2024",
      prize: "Overall Winner",
      description: "Created collaborative browser-based AST refactoring workspace with audio-visual code telemetry.",
      tags: ["React", "WebRTC", "Tree-Sitter", "Go"]
    },
    {
      title: "Top 1% Global Contributor — Major League Hacking",
      category: "Open Source Fellowship",
      date: "2024 Season",
      prize: "Fellowship Fellow",
      description: "Merged 42+ upstream PRs across Kubernetes, Docker, and developer CLI tooling repositories.",
      tags: ["Git", "Rust", "Go", "CI/CD"]
    }
  ],

  bento: {
    quote: "“Stay hungry, stay foolish, and always test in production at 3 AM.”",
    currentFocus: "Researching autonomous multi-agent consensus protocols and ultra-low latency WebGL shaders for spatial computing.",
    techStackSummary: [
      "TypeScript", "React", "Next.js", "Python", "FastAPI", 
      "Rust", "Go", "Docker", "PostgreSQL", "WebGL", "Three.js", "Redis"
    ],
    coursework: [
      "Distributed Systems & Cloud Computing",
      "Operating Systems & Linux Kernel Design",
      "Compiler Design & Formal Languages",
      "Deep Learning & Generative Models",
      "Advanced Data Structures & Algorithms"
    ]
  },

  skills: {
    categories: [
      {
        id: "frontend",
        title: "Frontend Engineering & Graphics",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
        items: [
          { name: "React 19 / Next.js 15", level: 96 },
          { name: "TypeScript / ESNext", level: 94 },
          { name: "WebGL / Three.js / GLSL", level: 85 },
          { name: "TailwindCSS / CSS Architecture", level: 98 },
          { name: "Canvas 2D / Micro-animations", level: 92 }
        ]
      },
      {
        id: "backend",
        title: "Systems, Concurrency & Cloud",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
        items: [
          { name: "Node.js / Express / Bun", level: 92 },
          { name: "Python / FastAPI / AsyncIO", level: 90 },
          { name: "Go / Microservices", level: 82 },
          { name: "PostgreSQL / Redis / Vector DBs", level: 88 },
          { name: "Docker / Linux / Kubernetes", level: 86 }
        ]
      },
      {
        id: "ai-data",
        title: "AI Agents & Autonomous Tools",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>`,
        items: [
          { name: "LLM Orchestration / LangChain", level: 90 },
          { name: "RAG & Vector Embeddings", level: 86 },
          { name: "WebSockets & WebRTC Streams", level: 92 },
          { name: "Git Workflows & CI/CD Pipelines", level: 94 },
          { name: "Cloudflare Edge Workers", level: 88 }
        ]
      }
    ]
  },

  projects: [
    {
      id: "campus-mesh",
      title: "CampusSync P2P Mesh & Radar",
      category: "creative",
      categoryLabel: "Campus Engineering",
      description: "College campus offline peer-to-peer survival network enabling students to share course notes, coordinate dorm food delivery, and chat without active WiFi during campus blackouts.",
      highlights: [
        "Local peer-to-peer WebRTC mesh network with zero central servers",
        "Encrypted local storage with automatic campus node gossiping",
        "Adopted by 800+ students across 4 campus dorm blocks"
      ],
      tags: ["TypeScript", "WebRTC", "IndexedDB", "TailwindCSS", "Node.js"],
      accentColor: "#00f0ff",
      accentGlow: "rgba(0, 240, 255, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo-campus",
      featured: true,
      stats: { metric: "800+ Users", label: "Campus Dorms" },
      illustrationType: "cloud-edge"
    },
    {
      id: "neural-mesh",
      title: "Synthetix AI Agent Studio",
      category: "ai-tools",
      categoryLabel: "AI & Machine Learning",
      description: "Hackathon-born multi-agent orchestration workspace enabling developer teams to build, benchmark, and deploy adaptive workflows with live telemetry.",
      highlights: [
        "Sub-50ms streaming token responses using Cloudflare edge workers",
        "Interactive node-based DAG workflow visualizer with live debug stepping",
        "Built during a 36-hour hackathon sprint; won Best AI Tool"
      ],
      tags: ["TypeScript", "Next.js", "Python", "FastAPI", "WebSockets", "Redis"],
      accentColor: "#ec4899",
      accentGlow: "rgba(236, 72, 153, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo1",
      featured: true,
      stats: { metric: "1st Place", label: "Hackathon Winner" },
      illustrationType: "ai-mesh"
    },
    {
      id: "code-clash",
      title: "CodeClash 1v1 Arena",
      category: "web-apps",
      categoryLabel: "Web Applications",
      description: "Real-time competitive multiplayer coding battle platform where students duel in 15-minute speed DSA rounds with live spectator audio and spectator voting.",
      highlights: [
        "Dockerized sandbox running untrusted Python, C++, and JS code securely",
        "Sub-20ms WebSocket sync for live keystroke diffing between players",
        "Hosted annual campus coding championship with 120+ teams"
      ],
      tags: ["React", "Node.js", "Docker", "WebSockets", "Redis"],
      accentColor: "#a855f7",
      accentGlow: "rgba(168, 85, 247, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo-clash",
      featured: true,
      stats: { metric: "1,200+", label: "Duels Played" },
      illustrationType: "finance-chart"
    },
    {
      id: "lumina-canvas",
      title: "Lumina Spatial 3D Canvas",
      category: "creative",
      categoryLabel: "Creative Engineering",
      description: "Interactive 3D infinite canvas for students and designers with real-time physics, audio-reactive nodes, and exportable GLSL shaders.",
      highlights: [
        "Custom WebGL raymarching shader pipeline with bloom and depth of field",
        "Multiplayer collaborative room sync using WebSockets",
        "120 FPS buttery smooth render loop target"
      ],
      tags: ["Three.js", "GLSL Shaders", "WebRTC", "TypeScript", "Vite"],
      accentColor: "#10b981",
      accentGlow: "rgba(16, 185, 129, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo3",
      featured: false,
      stats: { metric: "120 FPS", label: "Render Target" },
      illustrationType: "3d-spatial"
    },
    {
      id: "cloud-sentinel",
      title: "SentinelGuard Security Engine",
      category: "ai-tools",
      categoryLabel: "AI & Machine Learning",
      description: "AI-driven continuous vulnerability discovery engine that scans student repositories for leaked secrets, API keys, and injection risks before deployment.",
      highlights: [
        "Automated semantic AST analysis & remediation generator",
        "GitHub Action one-click integration built for student hack teams",
        "Scanned 400+ student repositories during Hackathon season"
      ],
      tags: ["Python", "Rust", "Docker", "AWS", "GraphQL"],
      accentColor: "#f59e0b",
      accentGlow: "rgba(245, 158, 11, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo4",
      featured: false,
      stats: { metric: "99.4%", label: "Accuracy Rate" },
      illustrationType: "security-shield"
    },
    {
      id: "aura-sound",
      title: "Aura Lo-Fi Dorm Engine",
      category: "creative",
      categoryLabel: "Creative Engineering",
      description: "Browser-based generative ambient soundscape generator created for late-night study sessions using procedural Web Audio synthesis.",
      highlights: [
        "Binaural beat synthesis with dynamic frequency shifts",
        "Zero audio assets downloaded: 100% procedural synthesis in 8KB of code",
        "Offline-capable PWA with custom study timer"
      ],
      tags: ["Web Audio API", "HTML5 Canvas", "JavaScript", "PWA"],
      accentColor: "#ec4899",
      accentGlow: "rgba(236, 72, 153, 0.4)",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo6",
      featured: false,
      stats: { metric: "100% Synth", label: "Zero Audio Files" },
      illustrationType: "sound-wave"
    }
  ],

  experience: [
    {
      period: "Summer 2025 (Upcoming)",
      role: "Incoming Software Engineering Intern",
      company: "Apex Cloud Infrastructure",
      badge: "Summer '25",
      description: "Selected from 3,000+ applicants for the distributed systems team. Will work on high-throughput streaming pipelines.",
      achievements: [
        "Cleared 4 rounds of technical system design and algorithmic interviews",
        "Awarded Pre-Placement Fellowship stipend"
      ],
      skills: ["Go", "Distributed Systems", "Kubernetes", "gRPC"]
    },
    {
      period: "2024 — Present",
      role: "Lead Technical Organizer & Campus Club President",
      company: "Developer Student Club @ Apex Tech",
      badge: "Leadership",
      description: "Leading a community of 450+ student developers. Mentoring juniors, organizing weekend hackathons, and running open-source bootcamps.",
      achievements: [
        "Organized ApexHacks 2024 with 350+ attendees and $10k+ in sponsored prizes",
        "Taught 6 workshops on full-stack web development and AI agent engineering"
      ],
      skills: ["Leadership", "Public Speaking", "Community", "Hackathons"]
    },
    {
      period: "Summer 2024",
      role: "Software Engineering Intern",
      company: "OmniFlow Systems",
      badge: "Completed",
      description: "Engineered core data ingestion infrastructure and intuitive client dashboards for real-time telemetry.",
      achievements: [
        "Optimized database indexing and queries, cutting P95 response times from 340ms to 65ms",
        "Shipped 8 production features in a 10-week summer internship stint"
      ],
      skills: ["React", "Python", "PostgreSQL", "Redis", "Docker"]
    }
  ],

  soundboard: [
    { id: "snd-808", label: "808 Kick", freq: 65, duration: 0.28, type: "sine" },
    { id: "snd-laser", label: "Cyber Laser", freq: 1200, duration: 0.12, type: "sawtooth" },
    { id: "snd-coin", label: "8-bit Coin", freq: 987, duration: 0.15, type: "square" },
    { id: "snd-power", label: "Power Up", freq: 440, duration: 0.22, type: "triangle" },
    { id: "snd-level", label: "Level Complete", freq: 880, duration: 0.35, type: "sine" }
  ],

  terminal: {
    welcomeMessage: "Welcome to Aadesh's Dorm Terminal v3.0 [MAXIMALIST STUDENT EDITION]. Type 'help' to explore.",
    prompt: "student@apex-dorm-room:~$ ",
    commands: {
      help: `Maximalist Commands:
  • about       - Who I am, college stats & dorm vibes
  • hackathons  - 4x Hackathon wins & trophies
  • skills      - Full-stack technical arsenal
  • projects    - Selected side projects & campus tools
  • beats       - Toggle dorm lo-fi synth music
  • coffee      - Boost the live caffeine level to 100%
  • matrix      - Launch terminal matrix rain
  • theme       - Switch neon accent palette
  • clear       - Clean terminal screen
  • sudo        - Execute with 3 AM root power`,
      about: `Aadesh Sharma | Computer Science Undergrad @ Apex Tech ('26)
Location: Bengaluru, India (UTC+05:30)
Philosophy: Break rules, ship fast at 3 AM, and win hackathons.
Interests: Distributed systems, LLM multi-agent graphs, WebGL shaders, specialty cold brew.`,
      hackathons: `🏆 1st Place - Smart India Hackathon '25 (AI Casualty Triage)
🏆 Best AI Agent Tool - ETHIndia '24 (Arbitration bot)
🏆 Grand Winner - HackNITR 5.0 (AST Refactoring suite)
🏆 Top 1% Global Contributor - Major League Hacking '24`,
      skills: `Frontend:  React 19, Next.js 15, TypeScript, WebGL/Three.js, TailwindCSS
Backend:   Node.js, Express, Python/FastAPI, Go, PostgreSQL, Redis
DevOps/AI: Docker, Kubernetes, LangChain, Cloudflare Workers, WebRTC`,
      beats: `Use the floating Dorm Beats Player widget at the bottom right, or click Play in the UI!`,
      coffee: `☕ GULP! Nitro Cold Brew injected! Caffeine meter replenished to 100%! ⚡`,
      sudo: `[sudo] password for student: *********
ACCESS GRANTED: Dorm room 404 admin unlocked. May your code compile on first try!`
    }
  }
};
