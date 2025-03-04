import "../global.css";

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

// import { Stack } from "expo-router";
// import { StatusBar } from "react-native";

// export default function RootLayout() {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <Stack screenOptions={{ headerShown: false }} />
//     </>
//   );
// }


export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="stack/login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

