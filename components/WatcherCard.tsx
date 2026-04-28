import * as React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

interface WatcherCardProps {
  id: string;
  name?: string;
  difficulty?: string;
  relic?: string;
  mission?: string;
  planet?: string;
  pNode?: string;
  isActive?: boolean;
}

const WatcherCard = (props: WatcherCardProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const aspectRatio = 260 / 400;
  const width = screenWidth * 1;
  const height = screenWidth * 0.7;

  if (!props.id) {
    throw new Error("Config data is missing an id");
  } else if (typeof props.id != "string") {
    throw new Error("Config data id is not of type str");
  }

  const name = props.name ?? "N/A";
  const difficulty = props.difficulty ?? "N/A";
  const relic = props.relic ?? "N/A";
  const mission = props.mission ?? "N/A";
  const node =
    props.planet && props.pNode && props.pNode !== "N/A"
      ? `${props.planet}, ${props.pNode}`
      : (props.planet ?? "N/A");
  const isActive = props.isActive ?? false;

  return (
    <View className="items-center">
      <Svg width={width} height={height} viewBox="0 0 400 260" fill="none">
        <G id="Watcher Card">
          <Rect
            id="MainBlackBox"
            x={20.5}
            y={17.5}
            width={359}
            height={222}
            fill="#010411"
            stroke="#A2AECB"
          />
          <G id="BottomFrame">
            <Path
              id="LeftLine"
              d="M10 240V230H9V240H10ZM10 240V250H170M170 250H180V251H170V250Z"
              stroke="#A2AECB"
            />
            <Path
              id="RightLine"
              d="M390 241V231H391V241H390ZM390 241V251H230M230 251H220V252H230V251Z"
              stroke="#A2AECB"
            />
            <Circle id="Dot1" cx={190} cy={250} r={1} fill="#A2AECB" />
            <Circle id="Dot2" cx={200} cy={250} r={1} fill="#A2AECB" />
            <Circle id="Dot3" cx={210} cy={250} r={1} fill="#A2AECB" />
          </G>
          <G id="Eye">
            <Path
              id="Eye-Shape"
              d="M155.773 106.494C184.979 91.5263 219.603 91.5264 248.809 106.494C257.877 111.142 266.197 117.122 273.493 124.235L292.106 142.381L293.968 144.197L274.156 164.008C266.432 171.732 257.512 178.161 247.742 183.046C219.13 197.352 185.452 197.352 156.841 183.046C147.07 178.161 138.152 171.732 130.427 164.008L112.454 146.035L110.615 144.197L112.477 142.381L131.09 124.235C138.385 117.122 146.705 111.142 155.773 106.494Z"
              stroke="#1B1C1C"
              strokeWidth={5.13463}
            />
            <G id="Top-Eyelashes">
              <Path
                id="Lash5"
                d="M295.605 121.533L295.317 121.682C290.525 124.16 285.37 125.861 280.044 126.72C283.999 129.643 287.495 133.139 290.418 137.093C291.277 131.767 292.977 126.612 295.456 121.821L295.605 121.533Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash4"
                d="M264.83 82.9707L263.808 84.0687C257.746 90.5828 250.877 96.2967 243.368 101.072C249.469 103.085 255.091 106.331 259.885 110.607L261.387 97.6366L264.83 82.9707Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash3"
                d="M202.291 65L201.547 67.7849C199.113 76.8855 195.927 85.768 192.022 94.3407C198.795 92.9248 205.788 92.9248 212.561 94.3407C208.655 85.768 205.469 76.8855 203.036 67.7849L202.291 65Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash2"
                d="M138.665 82.9707L139.687 84.0687C145.749 90.5828 152.618 96.2967 160.126 101.072C154.026 103.085 148.404 106.331 143.61 110.607L142.108 97.6366L138.665 82.9707Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash1"
                d="M109.187 121.533L109.475 121.682C114.266 124.16 119.421 125.861 124.747 126.72C120.793 129.643 117.296 133.139 114.374 137.093C113.515 131.767 111.814 126.612 109.336 121.821L109.187 121.533Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
            </G>
            <G id="Bottom-Eyelashes">
              <Path
                id="Lash5_2"
                d="M282.083 179.101L281.804 178.938C277.148 176.212 272.089 174.244 266.816 173.107C270.918 170.395 274.592 167.087 277.718 163.291C278.297 168.654 279.726 173.892 281.95 178.806L282.083 179.101Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash4_2"
                d="M249.429 204.392L248.967 203.775C245.288 198.867 240.934 194.505 236.033 190.817C240.858 189.809 245.465 187.948 249.635 185.321L248.931 194.223L249.429 204.392Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash3_2"
                d="M202.291 216.129L201.732 214.42C199.595 207.894 196.835 201.588 193.489 195.591C199.315 196.586 205.268 196.586 211.094 195.591C207.748 201.588 204.988 207.894 202.851 214.42L202.291 216.129Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash2_2"
                d="M156.279 204.392L156.741 203.775C160.42 198.867 164.774 194.505 169.675 190.817C164.85 189.809 160.244 187.948 156.073 185.321L156.777 194.223L156.279 204.392Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
              <Path
                id="Lash1_2"
                d="M122.654 179.126L122.934 178.963C127.589 176.237 132.648 174.269 137.922 173.132C133.82 170.42 130.145 167.112 127.02 163.316C126.441 168.679 125.012 173.916 122.788 178.831L122.654 179.126Z"
                fill="#1B1C1C"
                stroke="#1B1C1C"
                strokeWidth={1.46704}
              />
            </G>
            <Path
              id="Iris-subtract"
              d="M176.571 110.254C191.698 98.8152 212.582 98.8153 227.709 110.254C250.141 127.216 250.141 160.92 227.709 177.882C212.582 189.32 191.698 189.32 176.571 177.882C154.139 160.92 154.139 127.216 176.571 110.254ZM226.824 111.424C212.221 100.382 192.059 100.382 177.456 111.424C155.801 127.8 155.8 160.336 177.456 176.712C192.059 187.754 212.221 187.754 226.824 176.712C248.479 160.336 248.479 127.8 226.824 111.424ZM171.647 122.897C186.413 101.629 217.867 101.629 232.633 122.897C241.471 135.627 241.471 152.509 232.633 165.239C217.867 186.506 186.413 186.506 171.647 165.239C162.809 152.509 162.809 135.627 171.647 122.897ZM220.582 131.263C211.651 118.401 192.629 118.401 183.698 131.263C178.352 138.963 178.352 149.173 183.698 156.873C192.629 169.735 211.651 169.735 220.582 156.873C225.927 149.173 225.927 138.963 220.582 131.263ZM194.193 136.091C198.518 131.55 205.762 131.55 210.087 136.091C214.276 140.492 214.093 147.459 209.678 151.632C205.448 155.63 198.832 155.63 194.602 151.632C190.187 147.459 190.004 140.492 194.193 136.091Z"
              fill="#1B1C1C"
            />
          </G>
          <Rect
            id="TopRectangle"
            x={21}
            y={17}
            width={358}
            height={42}
            fill="#A2AECB"
          />
          <Rect
            id="DifficultyBackRectangle"
            x={21}
            y={59}
            width={358}
            height={45}
            fill="#1B1C1C"
            fillOpacity={0.5}
          />
          <Rect
            id="MissionBackRectangle"
            x={21}
            y={149}
            width={358}
            height={45}
            fill="#1B1C1C"
            fillOpacity={0.5}
          />
          <Rect
            id="RelicBackRectangle"
            x={21}
            y={104}
            width={358}
            height={45}
            fill="black"
            fillOpacity={0.5}
          />
          <Rect
            id="NodeBackRectangle"
            x={21}
            y={194}
            width={358}
            height={45}
            fill="black"
            fillOpacity={0.5}
          />
        </G>
      </Svg>

      <View
        className="absolute"
        style={{
          top: screenHeight * 0.03,
          right: screenWidth * 0.4,
          width: width * 0.55,
          height: height * 0.15,
          justifyContent: "center",
          paddingLeft: 15,
        }}
      >
        {/*Config Name*/}
        {/* Max character limit should be 15*/}
        <Text
          className="font-roboto-mono-bold"
          style={{
            color: "#FFFFFF",
            fontSize: 20,
          }}
        >
          {name}
        </Text>
      </View>

      {/*Titles*/}
      <View
        className="absolute "
        style={{
          top: screenHeight * 0.078,
          right: screenWidth * 0.12,
          width: width * 0.76,
          height: height * 0.64,
        }}
      >
        <View
          className=""
          style={{
            paddingVertical: 9,
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <Text
            className="font-roboto-mono-regular"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
            }}
          >
            DIFFICULTY
          </Text>
          <Text
            className="font-roboto-mono-regular"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
            }}
          >
            RELIC
          </Text>
          <Text
            className="font-roboto-mono-regular"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
            }}
          >
            MISSION
          </Text>
          <Text
            className="font-roboto-mono-regular"
            style={{
              color: "#FFFFFF",
              fontSize: 16,
            }}
          >
            NODE
          </Text>
        </View>
      </View>

      {/*Inputs*/}
      <View
        className="absolute "
        style={{
          top: screenHeight * 0.078,
          right: screenWidth * 0.12,
          width: width * 0.76,
          height: height * 0.64,
        }}
      >
        <View
          className=""
          style={{
            paddingVertical: 9,
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            height: "100%",
          }}
        >
          <Text
            className="font-roboto-mono-bold"
            style={{
              color: "#FFFFFF",
              fontSize: 14,
            }}
          >
            {difficulty}
          </Text>
          <Text
            className="font-roboto-mono-bold"
            style={{
              color: "#FFFFFF",
              fontSize: 14,
            }}
          >
            {relic}
          </Text>
          <Text
            className="font-roboto-mono-bold"
            style={{
              color: "#FFFFFF",
              fontSize: 14,
            }}
          >
            {mission}
          </Text>
          <Text
            className="font-roboto-mono-bold"
            style={{
              color: "#FFFFFF",
              fontSize: 14,
            }}
          >
            {node}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WatcherCard;
