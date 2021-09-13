import { useRef } from "react";
import { Dimensions } from "react-native";

const useCameraHeight = () => {
  const dimensions = useRef(Dimensions.get("window"));
  const screenWidth = dimensions.current.width;
  const height = Math.round((screenWidth * 16) / 9);

  return [height] as const;
};

export default useCameraHeight;
