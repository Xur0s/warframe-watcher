import ScreenGradient from "@/components/ScreenGradient";
import { images } from "@/constants/images";
import {
  BackdropBlur,
  Canvas,
  Image,
  useImage,
} from "@shopify/react-native-skia";
import * as React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Svg, { G, Path, Rect } from "react-native-svg";
import BackArrow from "./BackArrow";
import TextBox from "./SurveyConfigTextBox";
import OptionBox from "./SurveyOptionBox2";

interface BlurSurveyScreenProps {
  Title: string;
  Subtitle: string;
  Choices: string[];
  Type?: string | null;
  AnswerCallBack: (choice: string) => void;
  goBack: () => void;
}

const BlurSurveyScreen = (props: BlurSurveyScreenProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const svgWidth = 412;
  const svgHeight = 917;
  const aspectRatio = svgHeight / svgWidth;

  const width = screenWidth;
  const height = width * aspectRatio;
  const bgImg = useImage(images.background_image);

  const data = Array.from({ length: props.Choices.length }, (_, i) => ({
    id: i.toString(),
    choice: props.Choices[i],
  }));

  if (!bgImg) return <View style={{ flex: 1, backgroundColor: "black" }} />;

  return (
    <View className="flex-1">
      <Canvas style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Image
          image={bgImg}
          x={0}
          y={0}
          width={screenWidth}
          height={screenHeight}
          fit="cover"
        />
        <BackdropBlur
          blur={4}
          clip={{
            x: 9,
            y: 45,
            width: screenWidth * 0.95,
            height: screenHeight * 0.86,
          }}
        />
      </Canvas>

      <View className="absolute top-0">
        <ScreenGradient direction="top" />
      </View>
      <View className="absolute bottom-0">
        <ScreenGradient direction="bottom" />
      </View>

      <View className="absolute inset-0 pointer-events-none">
        <Svg width={width} height={height} viewBox="0 0 412 917" fill="none">
          <G id="Hover Survey Screen">
            <Rect
              id="OuterBox"
              x={9}
              y={49}
              width={394}
              height={794}
              stroke="#A2AECB"
              strokeWidth={2}
            />
            <G id="BottomFrame">
              <Path
                d="M186 855H226H286C286.597 853.208 288.274 852 290.162 852H304.5C305.328 852 306 852.672 306 853.5C306 854.328 305.328 855 304.5 855H286H226C226 857.485 223.985 859.5 221.5 859.5H190.5C188.015 859.5 186 857.485 186 855H126H107.5C106.672 855 106 854.328 106 853.5C106 852.672 106.672 852 107.5 852H121.838C123.726 852 125.403 853.208 126 855H186Z"
                fill="#A2AECB"
              />
              <Path
                d="M186 855H226M186 855H126M186 855C186 857.485 188.015 859.5 190.5 859.5H221.5C223.985 859.5 226 857.485 226 855M226 855H286M126 855H107.5C106.672 855 106 854.328 106 853.5C106 852.672 106.672 852 107.5 852H121.838C123.726 852 125.403 853.208 126 855ZM286 855H304.5C305.328 855 306 854.328 306 853.5C306 852.672 305.328 852 304.5 852H290.162C288.274 852 286.597 853.208 286 855Z"
                stroke="#A2AECB"
              />
            </G>
            <G id="TopFrame">
              <Path
                d="M186 37H226H286C286.597 38.7916 288.274 40 290.162 40H304.5C305.328 40 306 39.3284 306 38.5C306 37.6716 305.328 37 304.5 37H286H226C226 34.5147 223.985 32.5 221.5 32.5H190.5C188.015 32.5 186 34.5147 186 37H126H107.5C106.672 37 106 37.6716 106 38.5C106 39.3284 106.672 40 107.5 40H121.838C123.726 40 125.403 38.7916 126 37H186Z"
                fill="#A2AECB"
              />
              <Path
                d="M186 37H226M186 37H126M186 37C186 34.5147 188.015 32.5 190.5 32.5H221.5C223.985 32.5 226 34.5147 226 37M226 37H286M126 37H107.5C106.672 37 106 37.6716 106 38.5C106 39.3284 106.672 40 107.5 40H121.838C123.726 40 125.403 38.7916 126 37ZM286 37H304.5C305.328 37 306 37.6716 306 38.5C306 39.3284 305.328 40 304.5 40H290.162C288.274 40 286.597 38.7916 286 37Z"
                stroke="#A2AECB"
              />
            </G>
          </G>
        </Svg>
      </View>

      <View className="items-center" style={{ top: height * 0.14 }}>
        <Text className="text-[#A2AECB] text-[1rem] font-roboto-condensed-light">
          {props.Type && props.Type === "textBox"
            ? "Type a name"
            : props.Subtitle}
        </Text>
      </View>
      <View className="items-center top-20" style={{ top: height * 0.06 }}>
        <Text className="text-[#A2AECB] text-[2.6rem] font-roboto-extraLight">
          {props.Title}
        </Text>
      </View>

      {props.Type && props.Type === "textBox" ? (
        <View className="items-center">
          <View className="items-center" style={{ top: screenHeight * 0.22 }}>
            <TextBox />
          </View>
          <View
            className="absolute"
            style={{
              top: screenHeight * 0.45,
            }}
          >
            <OptionBox
              Width={screenWidth * 0.75}
              Height={screenHeight}
              Title={data[0].choice}
              Choice={data[0].choice}
              AnswerCallBack={props.AnswerCallBack}
            />
          </View>
        </View>
      ) : (
        <View
          className=""
          style={{ top: screenHeight * 0.1, height: screenHeight * 0.62 }}
        >
          <FlatList
            windowSize={10}
            contentContainerClassName="relative"
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OptionBox
                Width={screenWidth}
                Height={screenHeight}
                Title={item.choice}
                Choice={item.choice}
                AnswerCallBack={props.AnswerCallBack}
              />
            )}
          />
        </View>
      )}
      <View className="absolute bottom-[75] self-center">
        <BackArrow goBack={props.goBack} />
      </View>
    </View>
  );
};

export default BlurSurveyScreen;
