import "../global.css";

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { UserProvider } from "./context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        {/* Public routes */}
        <Stack.Screen 
          name="index"
          options={{
            // This prevents going back to the login screen
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="stack/login"
          options={{
            // This prevents going back to the login screen
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="stack/signup"
          options={{
            // This prevents going back to the login screen
            gestureEnabled: false,
          }}
        />
        
        {/* Protected routes */}
        <Stack.Screen 
          name="(tabs)"
          options={{
            // This prevents going back to the login screen
            gestureEnabled: false,
          }}
        />
      </Stack>
    </UserProvider>
  );
}

