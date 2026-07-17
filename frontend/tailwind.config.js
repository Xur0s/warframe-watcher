/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ["RobotoCondensed_400Regular"],
        "roboto-condensed-medium": ["RobotoCondensed_500Medium"],
        "roboto-condensed-light": ["RobotoCondensed_100Thin"],
        "roboto-extraLight": ["Roboto_200ExtraLight"],
        "roboto-semiBold": ["Roboto_600SemiBold"],
        "roboto-mono-regular": ["RobotoMono_400Regular"],
        "roboto-mono-bold": ["RobotoMono_700Bold"],
      },
    },
  },
  plugins: [],
};
