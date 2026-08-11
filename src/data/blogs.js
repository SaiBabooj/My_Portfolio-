export const currentWorks = [
  {
    title: 'AI-Driven SOC Orchestrator',
    status: 'building',
    detail: 'Orchestrating SIEM, EDR and ticketing into a single AI-command console.',
    eta: 'ETA: Q3 2026',
  },
  {
    title: 'AI Rule Creator',
    status: 'building',
    detail: 'Generating detection rules from natural language threat descriptions.',
    eta: 'ETA: Q4 2026',
  },
  {
    title: 'Thinkerpad',
    status: 'maintaining',
    detail: 'Rolling out features and fixes based on user feedback.',
    eta: 'On-going',
  },
]

export const blogPosts = [
  {
    id: 'soc-orchestrator-chapter-1',
    title: 'Building an AI-Driven SOC Orchestrator — Chapter 1',
    date: 'Aug 2026',
    tags: ['AI', 'Security', 'SOC'],
    excerpt:
      'Why I am stitching SIEM, EDR and ticketing into one command console, and the architecture decisions behind it.',
    sections: [
      {
        heading: 'The problem',
        text: 'Security analysts drown in alerts. Every tool — SIEM, EDR, ticketing — speaks its own dialect, and response is a manual chain of copy-paste between consoles. I wanted a single surface where an analyst describes a situation in plain language and the system assembles context, suggests detection rules and stages a response.',
      },
      {
        heading: 'The architecture',
        text: 'A lightweight orchestrator layer sits above existing tools. It uses connectors per product, a shared event bus, and an LLM-driven intent parser that maps analyst commands to orchestration playbooks. State is kept explicit — every action the system takes is logged and reversible.',
      },
      {
        heading: 'What I have so far',
        text: 'Connector framework done, event bus wired, first playbook (alert triage → enrichment → escalation) running end-to-end in a lab environment. Next up: the rule-creation module and a clean analyst-facing console.',
      },
    ],
  },
  {
    id: 'detection-rules-in-plain-language',
    title: 'Writing Detection Rules in Plain Language',
    date: 'Jul 2026',
    tags: ['AI', 'Detection Engineering'],
    excerpt:
      'My experiment in turning threat descriptions into Sigma-style detection logic — and the traps I hit along the way.',
    sections: [
      {
        heading: 'The idea',
        text: 'Rule engineering is the bottleneck of detection. I built a prototype that takes a sentence like "powershell.exe spawned from a suspicious parent and contacted a rare domain" and produces a structured detection template ready for tuning.',
      },
      {
        heading: 'The traps',
        text: 'LLMs hallucinate field names and detection syntax. The fix was grounding: the model only proposes from a known schema of events and fields, and every output gets validated against sample telemetry before it is accepted.',
      },
      {
        heading: 'Where it is going',
        text: 'The next milestone is a feedback loop — analysts mark rules as noisy or clean, and the generator learns the tuning preferences of the team.',
      },
    ],
  },
  {
    id: 'weblog-analyser-telemetry',
    title: 'WebLog Analyzer: Turning Logs into Telemetry',
    date: 'Jun 2026',
    tags: ['Data', 'Web', 'Analytics'],
    excerpt:
      'A small tool that parses web server logs and surfaces attack patterns, bot traffic and anomaly clusters without a full SIEM.',
    sections: [
      {
        heading: 'Why build it',
        text: 'Not everyone needs a full SIEM to answer "is someone scanning my site?" A focused log analyzer can surface the same signal with a fraction of the infrastructure.',
      },
      {
        heading: 'How it works',
        text: 'It ingests common log formats, normalizes fields, and runs lightweight heuristics — status-code bursts, request-rate anomalies, user-agent clustering — to flag suspicious behavior. Results are rendered as clean dashboards.',
      },
      {
        heading: 'Next steps',
        text: 'Adding rule-based alerting and export support so teams can push flagged events into their existing pipelines.',
      },
    ],
  },
]

export const qaEntries = [
  {
    q: 'Why did you choose Cybersecurity over pure Data Science?',
    from: 'anonymous_42',
    a: 'Because the two are converging. Modern security is a data problem — anomaly detection, threat intelligence, response orchestration — and I wanted to be where the intersection is growing.',
  },
  {
    q: 'Do you open-source everything you build?',
    from: 'dev_malik',
    a: 'Not everything. Public tooling and reusable frameworks go on GitHub, but client work and internal experiment prototypes stay private. If you see a project with the "open source" badge, the code is genuinely out there.',
  },
]
