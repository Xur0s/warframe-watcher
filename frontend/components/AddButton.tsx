import * as React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const AddButton = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const svgWidth = 150;
  const svgHeight = 200;
  const aspectRatio = svgHeight / svgWidth;

  const width = screenWidth / 3;
  const height = (width * aspectRatio) / 3;

  return (
    <Svg width={width} height={height} viewBox="0 0 403 202" fill="none">
      <Rect
        x={17.1174}
        y={18.1239}
        width={367.518}
        height={164.125}
        fill="black"
        stroke="#A2AECB"
        strokeWidth={4.0276}
      />
      <Path
        d="M251.809 92.0254L256.09 99.9766L251.809 107.927H149.668L144.776 99.9766L149.668 92.0254H251.809Z"
        fill="#A2AECB"
      />
      <Path
        d="M192 153.719V112H207.902V153.719L199.951 157.195L192 153.719Z"
        fill="#A2AECB"
      />
      <Path
        d="M192 46.4766V88.1954H207.902V46.4766L199.951 43L192 46.4766Z"
        fill="#A2AECB"
      />
    </Svg>
  );
};

export default AddButton;
