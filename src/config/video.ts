export type SceneId = "create" | "code" | "motion" | "final";

export type SceneConfig = {
  id: SceneId;
  label: string;
  accent: string;
  duration: number;
  lineHeight?: number;
  cards?: Array<{ label: string; x: number; y: number; w: number; h: number; rotate: number; glow?: string }>;
};

export const videoConfig = {
  title: "Premium Vertical Motion Story",
  fps: 30,
  width: 1080,
  height: 1920,
  durationInSeconds: 15,
  palette: {
    background: "#070B12",
    backgroundSoft: "#101827",
    panel: "rgba(15, 23, 42, 0.66)",
    text: "#F8FAFC",
    textMuted: "#B5C0D6",
    accent: "#7DD3FC",
    accentSecondary: "#A78BFA",
    accentWarm: "#F9A8D4",
  },
  music: {
    enabled: false,
    file: null,
    note: "Add your soundtrack here or leave disabled.",
  },
  scenes: [
    {
      id: "create",
      label: "CREATE.",
      accent: "#7DD3FC",
      duration: 4,
      lineHeight: 1,
      cards: [
        { label: "vision", x: 160, y: 250, w: 220, h: 148, rotate: -8, glow: "#7DD3FC" },
        { label: "launch", x: 640, y: 420, w: 260, h: 180, rotate: 9, glow: "#A78BFA" },
      ],
    },
    {
      id: "code",
      label: "CODE.",
      accent: "#A78BFA",
      duration: 4,
      lineHeight: 1,
      cards: [
        { label: "build", x: 160, y: 360, w: 230, h: 160, rotate: 10, glow: "#A78BFA" },
        { label: "ship", x: 670, y: 270, w: 240, h: 170, rotate: -9, glow: "#7DD3FC" },
      ],
    },
    {
      id: "motion",
      label: "MOTION.",
      accent: "#F9A8D4",
      duration: 4,
      lineHeight: 1,
      cards: [
        { label: "frame", x: 155, y: 280, w: 210, h: 150, rotate: -7, glow: "#F9A8D4" },
        { label: "pulse", x: 670, y: 450, w: 230, h: 160, rotate: 8, glow: "#FACC15" },
      ],
    },
    {
      id: "final",
      label: "YOUR STORY.\nYOUR VIDEO.",
      accent: "#FACC15",
      duration: 3,
      lineHeight: 1.06,
      cards: [
        { label: "finale", x: 180, y: 290, w: 280, h: 170, rotate: -5, glow: "#FACC15" },
        { label: "impact", x: 620, y: 540, w: 290, h: 180, rotate: 8, glow: "#7DD3FC" },
      ],
    },
  ],
} as const;
