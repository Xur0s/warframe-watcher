import { enemies } from "@/constants/enemy";
import { planets } from "@/constants/planet";
import { tiers } from "@/constants/tier";
import { normalizeEnemyName } from "@/utils/normalizeEnemyName";
import { normalizePlanetName } from "@/utils/normalizePlanetName";
import { normalizeTierName } from "@/utils/normalizeTierName";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Image as SvgImage,
  Text as SvgText,
  TSpan,
} from "react-native-svg";

interface Fissure {
  id: string;
  activation: string;
  expiry: string;
  planet: string;
  node: string;
  enemy_faction: string;
  mission_type: string;
  tier: string;
  expired: boolean;
  isStorm: boolean;
  isHard: boolean;
}

const FissureCard = ({ data }: { data: Fissure }) => {
  const expiryDate = new Date(data.expiry);
  const expiryTTL = Math.max(0, expiryDate.getTime() - Date.now());
  const [timeLeft, setTimeLeft] = useState(expiryTTL);

  useEffect(() => {
    const timer = setInterval(() => {
      const currExpiryTTL = Math.max(0, expiryDate.getTime() - Date.now());
      setTimeLeft(currExpiryTTL);

      if (currExpiryTTL <= 0) clearInterval(timer);
    }, 1000);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const svgWidth = 400;
  const svgHeight = 136;
  const aspectRatio = svgHeight / svgWidth;

  const width = screenWidth;
  const height = width * aspectRatio;

  const planet_key = normalizePlanetName(data.planet);
  const planet = planets[planet_key] ?? planets.earth;

  const enemy_key = normalizeEnemyName(data.enemy_faction, planet_key);
  const enemy = enemies[enemy_key] ?? enemies.grineer;

  const tier_key = normalizeTierName(data.tier);
  const tier = tiers[tier_key] ?? tiers.omnia;
  const TierSvg = tier.svg;

  return (
    <Svg width={width} height={height} viewBox="0 0 400 136" fill="none">
      <G id="Mission Card">
        <Rect
          id="MainBlackBox"
          x="20.5"
          y="6.5"
          width="359"
          height="123"
          fill="#010411"
          stroke="#3D4879"
        />
        <SvgImage
          href={planet.image}
          x={planet.x}
          y={planet.y}
          width={planet.width}
          height={planet.height}
          preserveAspectRatio="xMidYMid meet"
        />
        <SvgImage
          href={enemy.image}
          x={enemy.x}
          y={enemy.y}
          width={enemy.width}
          height={enemy.height}
          preserveAspectRatio="xMidYMid meet"
        />
        <Rect
          id="Bottom Gradient"
          x="21"
          y="44"
          width="358"
          height="51"
          fill="url(#paint0_linear_41_689)"
        />
        <Rect
          id="BottomBlueBox"
          x="20"
          y="95"
          width="360"
          height="36"
          fill="#3D4879"
        />
        <G id="TimerComponents">
          <Path
            id="TimerSpace"
            d="M260.5 113L279.25 131H277.75L259 113L277.75 95H279.25L260.5 113ZM272.499 113L291.249 131H285.249L266.499 113L285.249 95H291.249L272.499 113ZM350.5 113L331.75 131H294.25L275.499 113L294.25 95H331.75L350.5 113ZM340.75 95L359.5 113L340.75 131H334.749L353.5 113L334.749 95H340.75ZM367 113L348.25 131H346.75L365.5 113L346.75 95H348.25L367 113Z"
            fill="#A2AECB"
          />
          <Rect
            id="TimerSpaceBox"
            x="259.25"
            y="95.25"
            width="107.5"
            height="35.5"
            stroke="#3D4879"
            stroke-width="0.5"
          />
          <Path
            id="Clock logo"
            d="M302.166 117.988L309.029 124.779L309.156 124.904L308.983 124.947L299.831 127.211L299.67 127.251L299.71 127.09L301.998 118.035L302.041 117.865L302.166 117.988ZM323.34 118.028L325.628 127.083L325.668 127.244L325.507 127.204L316.354 124.94L316.182 124.897L316.309 124.772L323.172 117.981L323.297 117.858L323.34 118.028ZM299.945 126.979L308.763 124.797L302.15 118.253L299.945 126.979ZM316.575 124.79L325.393 126.972L323.188 118.246L316.575 124.79ZM312.597 98.1064L327.087 112.443L327.123 112.479L327.087 112.515L312.597 126.852L312.562 126.886L312.526 126.852L298.036 112.515L298 112.479L298.036 112.443L312.526 98.1064L312.562 98.0713L312.597 98.1064ZM298.142 112.479L312.562 126.745L326.98 112.479L312.562 98.2109L298.142 112.479ZM302.928 119.497L307.504 124.024L307.631 124.149L307.458 124.192L301.356 125.701L301.194 125.741L301.235 125.58L302.761 119.543L302.804 119.374L302.928 119.497ZM322.577 119.536L324.103 125.573L324.144 125.734L323.981 125.694L317.88 124.186L317.707 124.143L317.834 124.018L322.41 119.49L322.534 119.367L322.577 119.536ZM312.737 99.4727L325.702 112.301L325.882 112.479L325.702 112.656L312.737 125.484L312.562 125.658L312.386 125.484L299.421 112.656L299.241 112.479L299.421 112.301L312.386 99.4727L312.562 99.2988L312.737 99.4727ZM299.951 112.479L312.562 124.954L325.171 112.479L312.562 100.002L299.951 112.479ZM312.662 123.796H312.463V122.287H312.662V123.796ZM307.233 117.835L306.407 118.652L306.266 118.512L307.092 117.694L307.233 117.835ZM318.801 118.511L318.659 118.651L317.833 117.834L317.975 117.694L318.801 118.511ZM313.218 110.914L314.439 112.122L314.799 112.478L314.439 112.833L314.027 113.239L317.13 116.997L313.331 113.929L312.914 114.343L312.562 114.69L312.211 114.343L310.686 112.833L310.326 112.478L310.686 112.122L311.907 110.913L312.563 104.178L313.218 110.914ZM311.747 112.478L312.562 113.283L313.377 112.478L312.562 111.672L311.747 112.478ZM302.647 112.577H301.122V112.378H302.647V112.577ZM324.003 112.577H322.478V112.378H324.003V112.577ZM325.626 98.165L323.338 107.22L323.295 107.39L323.17 107.267L316.307 100.476L316.18 100.351L316.353 100.308L325.505 98.0439L325.666 98.0039L325.626 98.165ZM299.527 98.04L308.68 100.304L308.853 100.347L308.726 100.472L301.862 107.263L301.737 107.386L301.694 107.216L299.406 98.1611L299.366 98L299.527 98.04ZM307.235 107.066L307.094 107.206L306.268 106.389L306.409 106.249L307.235 107.066ZM318.803 106.389L317.977 107.206L317.835 107.066L318.661 106.249L318.803 106.389ZM316.573 100.458L323.186 107.002L325.391 98.2764L316.573 100.458ZM301.847 106.998L308.459 100.454L299.642 98.2725L301.847 106.998ZM324.099 99.6748L322.573 105.712L322.53 105.881L322.406 105.758L317.83 101.23L317.703 101.105L317.876 101.062L323.978 99.5537L324.14 99.5137L324.099 99.6748ZM301.054 99.5498L307.155 101.059L307.328 101.102L307.201 101.227L302.625 105.754L302.501 105.877L302.458 105.708L300.933 99.6709L300.892 99.5098L301.054 99.5498ZM312.662 102.668H312.463V101.159H312.662V102.668Z"
            fill="#6580C2"
            fillOpacity="0.55"
          />
        </G>
        <SvgText
          id="TimerText"
          fill="#3D4879"
          stroke="#A2AECB"
          strokeWidth="0.1"
          fontFamily="Roboto Flex"
          fontSize="12"
          fontWeight="800"
          letterSpacing="0em"
        >
          <TSpan x="289" y="117">
            {formatTime(timeLeft)}
          </TSpan>
        </SvgText>
        <G id="DesignLines">
          <Path
            id="BottomLine"
            d="M210.222 137H189.277V135H16V133H19.5664V134H380.434V133H384V135H210.222V137Z"
            fill="#3D4879"
          />
          <Path
            id="TopLine"
            d="M210.222 0H189.277V2H16V4H19.5664V3H380.434V4H384V2H210.222V0Z"
            fill="#3D4879"
          />
        </G>
        <SvgText
          id="PLANET"
          fill="#A2AECB"
          fontFamily="Roboto Condensed"
          fontSize="22"
          fontWeight="600"
          letterSpacing="0em"
        >
          <TSpan x="32" y="34">
            {data.planet.toUpperCase()}
          </TSpan>
        </SvgText>
        <SvgText
          id="NODE"
          fill="#A2AECB"
          fontFamily="Roboto Flex"
          fontSize="14"
          fontWeight="400"
          letterSpacing="0em"
        >
          <TSpan x="32" y="49">
            {data.node.toUpperCase()}
          </TSpan>
        </SvgText>
        <SvgText
          id="LITH"
          fill="white"
          fontFamily="Roboto Flex"
          fontSize="20"
          fontWeight="370"
          letterSpacing="0em"
        >
          <TSpan x="58" y="119.836">
            {data.tier.toUpperCase()}
          </TSpan>
        </SvgText>
        <SvgText
          id="MISSION TYPE"
          fill="#A2AECB"
          fontFamily="Roboto Flex"
          fontSize="16"
          fontWeight="300"
          letterSpacing="0em"
        >
          <TSpan x="32" y="76">
            {data.mission_type.toUpperCase()}
          </TSpan>
        </SvgText>
        <SvgText
          id="ENEMY"
          fill="#A2AECB"
          fontFamily="Roboto Flex"
          fontSize="14"
          fontWeight="300"
          letterSpacing="0em"
        >
          <TSpan x="32" y="89.1016">
            {data.enemy_faction.toUpperCase()}
          </TSpan>
        </SvgText>
        <G transform={[{ translateX: tier.x }, { translateY: tier.y }]}>
          <TierSvg />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_41_689"
          x1="200"
          y1="44"
          x2="200"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.557692" stopColor="#05060A" stopOpacity="0" />
          <Stop offset="1" stopColor="#010411" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default FissureCard;
