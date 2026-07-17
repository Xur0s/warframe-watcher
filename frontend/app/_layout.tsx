import {
  Roboto_200ExtraLight,
  Roboto_600SemiBold,
} from "@expo-google-fonts/roboto";
import {
  RobotoCondensed_100Thin,
  RobotoCondensed_400Regular,
  RobotoCondensed_500Medium,
  useFonts,
} from "@expo-google-fonts/roboto-condensed";
import {
  RobotoMono_400Regular,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import registerInstallation from "../services/registeration.js";

import "../global.css";

export default function RootLayout() {
  // Register the device into database and also get and save expo notfication token
  useEffect(() => {
    registerInstallation().catch(console.error);
  }, []);

  let [fontsLoaded] = useFonts({
    RobotoCondensed_100Thin,
    RobotoCondensed_400Regular,
    RobotoCondensed_500Medium,
    Roboto_200ExtraLight,
    Roboto_600SemiBold,
    RobotoMono_400Regular,
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="survey" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
