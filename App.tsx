import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// Import screens
import SimpleMotorcycleHomeScreen from "./src/screens/SimpleMotorcycleHomeScreen";
import SimpleImageViewerScreen from "./src/screens/SimpleImageViewerScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={SimpleMotorcycleHomeScreen} />
          <Stack.Screen
            name="ImageViewer"
            component={SimpleImageViewerScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: true,
              title: "Settings",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
