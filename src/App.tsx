import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./Video";
import { videoConfig } from "./config/video";

export const App: React.FC = () => {
  return (
    <Composition
      id="VideoComposition"
      component={VideoComposition}
      durationInFrames={Math.round(videoConfig.durationInSeconds * videoConfig.fps)}
      fps={videoConfig.fps}
      width={videoConfig.width}
      height={videoConfig.height}
    />
  );
};
