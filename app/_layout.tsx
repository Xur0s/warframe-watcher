import { Stack } from "expo-router";
import { View, Text } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
