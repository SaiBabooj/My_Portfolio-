export const projectsData = [
  {
    name: 'AI-Driven SOC Orchestrator',
    description:
      'Enterprise-grade SOC platform automating L1 triage, L2 deep investigations and L3 executive closure reports. Ingests Elasticsearch security telemetry, maps threats to the MITRE ATT&CK framework and enriches incident lifecycles with Google Gemini AI.',
    tags: ['React', 'FastAPI', 'Elasticsearch', 'Google Gemini', 'MITRE ATT&CK'],
    status: 'live',
    openSource: true,
    github: 'https://github.com/SaiBabooj/SOC-Orchestrator-Log_Analysis',
  },
  {
    name: 'AI Rule Creator',
    description:
      'AI-powered security rule management platform that generates, tests and optimizes detection rules. Creates Sigma, YARA and Snort rules from LLM context, maps Sigma to SIEM queries with pySigma, and includes a malware analysis module for static analysis of .exe/.pcap samples.',
    tags: ['Python', 'React', 'OpenAI', 'Sigma', 'YARA', 'Snort'],
    status: 'wip',
    openSource: true,
    github: 'https://github.com/SaiBabooj/Rule-Creator',
  },
  {
    name: 'Thinkerpad',
    description:
      'Local-first infinite canvas note workspace with real-time peer-to-peer sync. Infinite pan/zoom canvas, Yjs CRDT-based conflict-free editing, WebRTC sync (no cloud), IndexedDB offline storage, visual links between notes and JSON export/import.',
    tags: ['React', 'Vite', 'TypeScript', 'Yjs CRDT', 'WebRTC', 'IndexedDB'],
    status: 'live',
    github: 'https://github.com/SaiBabooj/Thinkerpad',
  },
  {
    name: 'WebLog Analyzer',
    description:
      'Real-time web server log analysis platform with dashboard, metrics and live streaming. Ingests and parses server logs, streams events over WebSocket, visualizes metrics with charts, and exposes them through a React dashboard with auth and upload support.',
    tags: ['TypeScript', 'React', 'Express', 'Socket.io', 'Recharts'],
    status: 'live',
    github: 'https://github.com/SaiBabooj/Log-Parsing-Engine_Web',
  },
  {
    name: 'AI Orchestration Engine',
    description:
      'Private AI wrapper engine that thinks through multi-level AI orchestration pipelines for better results. Routes and delegates tasks across multiple LLM layers and tracks token usage with cost management built in.',
    tags: ['AI', 'LLM Orchestration', 'Token Tracking', 'Cost Management'],
    status: 'wip',
  },
]
