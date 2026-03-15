import {
  Canvas,
  LinearGradient as CanvasLinearGradient,
  Path as CanvasPath,
  fitbox,
  Group,
  rect,
  vec,
} from "@shopify/react-native-skia";
import { router } from "expo-router";
import * as React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";

const AddButton = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const svgWidth = 150;
  const svgHeight = 200;
  const aspectRatio = svgHeight / svgWidth;

  const width = screenWidth * 0.35;
  const height = (width * aspectRatio) / 3;

  const viewBox = rect(0, 0, 500, 224);
  const container = rect(0, 0, width, height);
  const transform = fitbox("contain", viewBox, container);

  return (
    <Pressable
      className="bg-red-500 relative"
      style={{ width: width, height: height }}
      onPress={() => router.push("/survey")}
    >
      <Svg
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        viewBox="0 0 500 224"
        fill="none"
      >
        <G id="Add">
          <Path
            id="RightBackTriangle"
            d="M369.5 205.866L472.26 112L369.5 18.1328V205.866Z"
            fill="#A2AECB"
            stroke="#A2AECB"
          />
          <Path
            id="LeftFrame"
            d="M11 111.5L98.0316 32L98 32.5L12 111.5L98.0316 190V191L11 111.5Z"
            fill="#A2AECB"
            stroke="#A2AECB"
          />
          <Path
            id="RightFrame"
            d="M488.032 111.5L401 32L401.032 32.5L487.032 111.5L401 190V191L488.032 111.5Z"
            fill="#A2AECB"
            stroke="#A2AECB"
          />
          <Path
            id="BackLeftTriangle"
            d="M129.5 205.866L26.7402 112L129.5 18.1328V205.866Z"
            fill="#A2AECB"
            stroke="#A2AECB"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_479_244"
            x1={464}
            y1={111.5}
            x2={35}
            y2={111.5}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#BB7DB8" />
            <Stop offset={0.0001} />
            <Stop offset={0.504808} />
            <Stop offset={0.9997} />
            <Stop offset={0.9998} stopColor="#BB7DB8" />
          </LinearGradient>
        </Defs>
      </Svg>

      <Canvas className="absolute" style={{ width: "100%", height: "100%" }}>
        <Group transform={transform}>
          <CanvasPath path="M369 25L464 111.5L369 198H130L35 111.5L130 25H369Z">
            <CanvasLinearGradient
              start={vec(464, 111.5)}
              end={vec(35, 111.5)}
              colors={["#BB7DB8", "black", "black", "#BB7DB8"]}
              positions={[0, 0.35, 0.65, 1]}
            />
          </CanvasPath>

          <Group clip={"M369 25L464 111.5L369 198H130L35 111.5L130 25H369Z"}>
            <CanvasPath
              path="M369 25L369.337 24.6303L369.194 24.5H369V25ZM464 111.5L464.337 111.87L464.743 111.5L464.337 111.13L464 111.5ZM369 198V198.5H369.194L369.337 198.37L369 198ZM130 198L129.663 198.37L129.806 198.5H130V198ZM35 111.5L34.6634 111.13L34.2573 111.5L34.6634 111.87L35 111.5ZM130 25V24.5H129.806L129.663 24.6303L130 25ZM369 25L368.663 25.3697L463.663 111.87L464 111.5L464.337 111.13L369.337 24.6303L369 25ZM464 111.5L463.663 111.13L368.663 197.63L369 198L369.337 198.37L464.337 111.87L464 111.5ZM369 198V197.5H130V198V198.5H369V198ZM130 198L130.337 197.63L35.3366 111.13L35 111.5L34.6634 111.87L129.663 198.37L130 198ZM35 111.5L35.3366 111.87L130.337 25.3697L130 25L129.663 24.6303L34.6634 111.13L35 111.5ZM130 25V25.5H369V25V24.5H130V25Z"
              color="#A2AECB"
            />
          </Group>
        </Group>
      </Canvas>

      <Svg
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        viewBox="0 0 500 224"
        fill="none"
      >
        <G id="AddIcon">
          <Path
            d="M257.571 168.252L249 172L240.429 168.252V123.278H257.571V168.252Z"
            fill="#A2AECB"
          />
          <Path
            d="M309 111.999L304.385 120.57H194.274L189 111.999L194.274 103.428H304.385L309 111.999Z"
            fill="#A2AECB"
          />
          <Path
            d="M257.571 55.748V100.722H240.429V55.748L249 52L257.571 55.748Z"
            fill="#A2AECB"
          />
        </G>
      </Svg>
    </Pressable>
  );
};
export default AddButton;
