import { Composition } from "remotion";
import { SolarVideo } from "./SolarVideo";

export const Root: React.FC = () => {
  return (
    <Composition
      id="SolarVideo"
      component={SolarVideo}
      durationInFrames={2700}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
