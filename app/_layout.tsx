import {
  Roboto_200ExtraLight,
  Roboto_600SemiBold,
} from "@expo-google-fonts/roboto";
import {
  RobotoCondensed_100Thin,
  RobotoCondensed_400Regular,
  useFonts,
} from "@expo-google-fonts/roboto-condensed";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    Roboto_200ExtraLight,
    Roboto_600SemiBold,
    RobotoCondensed_100Thin,
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
