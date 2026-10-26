import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { videoConfig, type SceneConfig } from "./config/video";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getSceneFrames = (scenes: SceneConfig[]) => {
  let cursor = 0;

  return scenes.map((scene) => {
    const start = cursor;
    const duration = Math.round(scene.duration * videoConfig.fps);
    cursor += duration;

    return {
      scene,
      start,
      duration,
    };
  });
};

const BackgroundGlow = ({ accent }: { accent: string }) => {
  const frame = useCurrentFrame();

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: -150,
          top: -80,
          background: `radial-gradient(circle, ${accent}66 0%, transparent 60%)`,
          filter: "blur(120px)",
          opacity: 0.8,
          transform: `translate(${Math.sin(frame / 20) * 24}px, ${Math.cos(frame / 18) * 18}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 850,
          height: 850,
          right: -180,
          bottom: -180,
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(15, 23, 42, 0) 62%)`,
          filter: "blur(120px)",
          opacity: 0.9,
          transform: `translate(${Math.cos(frame / 18) * 26}px, ${Math.sin(frame / 22) * 30}px)`,
        }}
      />
    </>
  );
};

const DecorativeLines = ({ accent }: { accent: string }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => {
        const offset = index * 26;
        const rotate = index % 2 === 0 ? -16 : 18;
        const x = 80 + index * 100 + Math.sin(frame / 20 + index) * 24;
        const y = 130 + index * 150 + Math.cos(frame / 16 + index) * 20;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 780,
              height: 1.5,
              background: `linear-gradient(90deg, transparent 0%, ${accent}66 18%, rgba(255,255,255,0.9) 50%, ${accent}66 82%, transparent 100%)`,
              borderRadius: 999,
              boxShadow: `0 0 18px ${accent}66`,
              opacity: 0.75,
              transform: `rotate(${rotate}deg) translate(${offset}px, ${Math.sin(frame / 24 + index) * 12}px)`,
            }}
          />
        );
      })}
    </>
  );
};

const FloatingParticles = ({ accent }: { accent: string }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: 22 }).map((_, index) => {
        const left = (index * 37) % 100;
        const top = (index * 31 + 8) % 100;
        const size = 4 + (index % 5);
        const x = Math.sin((frame + index * 17) / 16) * 26;
        const y = Math.cos((frame + index * 11) / 18) * 22;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 16px ${accent}`,
              opacity: 0.78,
              transform: `translate(${x}px, ${y}px)`,
            }}
          />
        );
      })}
    </>
  );
};

const MotionCards = ({ accent, cards }: { accent: string; cards?: SceneConfig["cards"] }) => {
  if (!cards) {
    return null;
  }

  const frame = useCurrentFrame();

  return (
    <>
      {cards.map((card, index) => {
        const driftX = Math.sin(frame / 18 + index) * 16;
        const driftY = Math.cos(frame / 14 + index) * 14;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: card.x,
              top: card.y,
              width: card.w,
              height: card.h,
              borderRadius: 28,
              border: `1px solid ${accent}66`,
              background: `linear-gradient(135deg, rgba(15, 23, 42, 0.74), rgba(30, 41, 59, 0.14))`,
              boxShadow: `0 0 40px ${card.glow ?? accent}1f, 0 28px 80px rgba(0,0,0,0.28)`,
              backdropFilter: "blur(18px)",
              transform: `translate(${driftX}px, ${driftY}px) rotate(${card.rotate}deg) scale(${1 + (index % 2) * 0.05})`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 20% 20%, ${accent}44 0%, transparent 45%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 24,
                right: 24,
                bottom: 18,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(248,250,252,0.92)",
                textAlign: "left",
              }}
            >
              {card.label}
            </div>
          </div>
        );
      })}
    </>
  );
};

const Words = ({ text, accent, frame }: { text: string; accent: string; frame: number }) => {
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.14em",
      }}
    >
      {words.map((word, wordIndex) => {
        const progress = clamp((frame - wordIndex * 5) / 18, 0, 1);
        const opacity = interpolate(progress, [0, 0.2, 1], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const translateY = interpolate(progress, [0, 0.35, 1], [72, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const scale = interpolate(progress, [0, 0.3, 1], [0.9, 1.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <span
            key={`${word}-${wordIndex}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              textShadow: `0 0 38px ${accent}99`,
              fontWeight: 800,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

const SceneText = ({ scene, frame }: { scene: SceneConfig; frame: number }) => {
  const lines = scene.label.split("\n");

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "49%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: videoConfig.palette.text,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {lines.map((line, index) => {
        const lineProgress = clamp((frame - index * 4) / 20, 0, 1);
        const opacity = interpolate(lineProgress, [0, 0.2, 1], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const translateY = interpolate(lineProgress, [0, 0.35, 1], [80, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <div
            key={`${scene.id}-${index}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              width: "100%",
              marginBottom: index < lines.length - 1 ? 8 : 0,
            }}
          >
            <Words text={line} accent={scene.accent} frame={frame - index * 5} />
          </div>
        );
      })}
    </div>
  );
};

const SceneShell = ({ scene }: { scene: SceneConfig }) => {
  const frame = useCurrentFrame();
  const sceneProgress = clamp(frame / (scene.duration * videoConfig.fps), 0, 1);
  const fade = interpolate(sceneProgress, [0, 0.2, 0.8, 1], [0.1, 1, 1, 0.45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 20%, rgba(15, 23, 42, 0.9) 0%, ${videoConfig.palette.background} 44%, #02050A 100%)`,
        overflow: "hidden",
        opacity: fade,
      }}
    >
      <BackgroundGlow accent={scene.accent} />
      <DecorativeLines accent={scene.accent} />
      <FloatingParticles accent={scene.accent} />
      <MotionCards accent={scene.accent} cards={scene.cards} />

      <div
        style={{
          position: "absolute",
          inset: 92,
          borderRadius: 38,
          border: `1px solid ${scene.accent}22`,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.1))",
          boxShadow: `inset 0 0 30px rgba(148, 163, 184, 0.08), 0 0 40px ${scene.accent}18`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(7,11,18,0) 0%, rgba(7,11,18,0.14) 30%, rgba(7,11,18,0.5) 100%)`,
        }}
      />

      <SceneText scene={scene} frame={frame} />
    </AbsoluteFill>
  );
};

export const VideoComposition: React.FC = () => {
  const sceneFrames = getSceneFrames(videoConfig.scenes);

  return (
    <AbsoluteFill style={{ backgroundColor: videoConfig.palette.background }}>
      {sceneFrames.map(({ scene, start, duration }) => (
        <Sequence key={scene.id} from={start} durationInFrames={duration}>
          <SceneShell scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
