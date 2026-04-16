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
import { Text, TextInput, useWindowDimensions, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

interface TextBoxProps {
  AnswerCallBack: (choice: string) => void;
}

const TextBox = (props: TextBoxProps) => {
  const [name, setName] = useState("");
  const [isFocused, setFocused] = useState(false);

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
            strokeWidth={5}
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
        </G>
      </Svg>

      <Canvas className="absolute" style={{ width: "100%", height: "100%" }}>
        <Group transform={gradientTransform}>
          <CanvasPath path="M960.221 121.262L999.894 249.707L960.221 378.151H122.057L82.3835 249.707L122.057 121.262H960.221Z">
            <CanvasLinearGradient
              start={vec(541.139, 120.262)}
              end={vec(541.139, 379.151)}
              colors={["#D9D9D9", "#3D4879"]}
              positions={[0.482297, 1]}
            />
          </CanvasPath>
        </Group>
      </Canvas>

      <View
        className="absolute justify-center items-center"
        style={{ top: height * 0.37, paddingHorizontal: 20 }}
      >
        <TextInput
          className="font-roboto-condensed-medium"
          style={{
            fontSize: 20,
            color: "#000000",
            textAlign: "center",
            width: width,
            paddingHorizontal: 20,
            textAlignVertical: "center",
          }}
          value={name}
          onChangeText={(text) => {
            setName(text);
            props.AnswerCallBack(text);
          }}
          placeholder=""
          multiline={false}
          numberOfLines={1}
          scrollEnabled={true}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!isFocused && name.trim().length === 0 && (
          <Text
            className="absolute font-roboto-condensed-medium"
            pointerEvents="none"
            style={{
              color: "#3D4879",
              fontSize: 20,
            }}
          >
            Give it a name...
          </Text>
        )}
      </View>
    </View>
  );
};
export default TextBox;
