import {
  Canvas,
  LinearGradient as CanvasLinearGradient,
  Path as CanvasPath,
  fitbox,
  Group,
  rect,
  vec,
} from "@shopify/react-native-skia";
import * as React from "react";
import { useState } from "react";
import { TextInput, useWindowDimensions, View } from "react-native";
import Svg, { G, Path, Text, TSpan } from "react-native-svg";

const TextBox = () => {
  const [name, setName] = useState("");

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const aspectRatio = 500 / 1080;
  const width = screenWidth * 1.2;
  const height = screenWidth * 0.45;

  const viewbox = rect(0, 0, 1080, 500);
  const container = rect(0, 0, width, height);
  const gradientTransform = fitbox("contain", viewbox, container);

  return (
    <View className="items-center" style={{ width: width, height: height }}>
      <Svg
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        viewBox="0 0 1080 500"
        fill="none"
      >
        <G id="Text Box">
          <Path
            id="MainBox"
            d="M960.221 121.262L999.894 249.707L960.221 378.151H122.057L82.3835 249.707L122.057 121.262H960.221Z"
            fill="url(#paint0_linear_539_2)"
            stroke="#A2AECB"
            strokeWidth={1.99913}
          />
          <G id="RightFrame">
            <Path
              d="M1045.92 249.707L964.955 379.151L1005.19 249.707L964.955 120.262L1045.92 249.707Z"
              fill="#A2AECB"
            />
            <Path
              d="M1045.92 249.707L964.955 379.151L1005.19 249.707L964.955 120.262L1045.92 249.707Z"
              stroke="#A2AECB"
            />
          </G>
          <G id="LeftFrame">
            <Path
              d="M77.092 249.707L117.323 379.151L36.3577 249.707L117.323 120.262L77.092 249.707Z"
              fill="#A2AECB"
            />
            <Path
              d="M77.092 249.707L117.323 379.151L36.3577 249.707L117.323 120.262L77.092 249.707Z"
              stroke="#A2AECB"
            />
          </G>
          <Text
            id="Text"
            fill="white"
            fontFamily="Roboto Condensed"
            fontSize={69.9697}
            fontWeight={500}
            letterSpacing="0em"
          >
            <TSpan x={323.475} y={273.623}>
              {"Cosmic Horrors"}
            </TSpan>
          </Text>
        </G>
      </Svg>

      <Canvas className="absolute" style={{ width: "100%", height: "100%" }}>
        <Group transform={gradientTransform}>
          <CanvasPath path="M960.221 121.262L999.894 249.707L960.221 378.151H122.057L82.3835 249.707L122.057 121.262H960.221Z">
            <CanvasLinearGradient
              start={vec(541.139, 120.262)}
              end={vec(541.139, 379.151)}
              colors={["#010411", "#3D4879"]}
              positions={[0.482297, 1]}
            />
          </CanvasPath>
        </Group>
      </Canvas>

      <View
        className="absolute"
        style={{ top: height * 0.37, paddingHorizontal: 20 }}
      >
        <TextInput
          style={{
            fontSize: 20,
            color: "#FFFFFF",
            textAlign: "center",
            width: width,
            paddingHorizontal: 20,
            textAlignVertical: "center",
          }}
          value={name}
          onChangeText={setName}
          placeholder="Type a name..."
          placeholderTextColor="#FFFFFF"
          multiline={false}
          numberOfLines={1}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};
export default TextBox;
