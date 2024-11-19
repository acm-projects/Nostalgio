import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Unbounded_200ExtraLight, Unbounded_300Light, Unbounded_400Regular, Unbounded_500Medium, Unbounded_600SemiBold, Unbounded_800ExtraBold, useFonts } from "@expo-google-fonts/unbounded";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { useColorScheme } from "@/components/useColorScheme";
import TabOneScreen from "./(tabs)/index";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [loaded, error] = useFonts({
    Unbounded_200ExtraLight,
    Unbounded_300Light,
    Unbounded_400Regular,
    Unbounded_500Medium,
    Unbounded_600SemiBold,
    Unbounded_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack initialRouteName="auth">
          {/* Define the /auth screen */}
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          {/* Tabs page */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Modal page */}
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </NavigationContainer>
    </ThemeProvider>
  );
}
