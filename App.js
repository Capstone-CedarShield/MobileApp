import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./navigation/RootNavigation";

import GetStarted from "./screens/GetStarted";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import ReportIncident from "./screens/ReportIncident";
import ReportIncidentDetails from "./screens/ReportIncidentDetails";
import IncidentList from "./screens/IncidentList";
import Profile from "./screens/Profile";
import IncidentDetails from "./screens/IncidentDetails";
import TestScreen from "./screens/Home";
import IncidentContent from "./screens/IncidentContent";
import MapIncidents from "./screens/MapIncidents";
import NotificationListener from "./screens/NotificationListener";

import { AuthProvider } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NotificationListener />
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="GetStarted"
          screenOptions={{
            headerShown: false,
            animation: "simple_push", // Default animation for all screens
          }}
        >
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{ title: "Get Started" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ 
              title: "Sign Up",
              presentation: "modal", // Keeps modal style but with simple_push
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ 
              title: "Login",
              presentation: "modal", // Keeps modal style but with simple_push
            }}
          />
          <Stack.Screen
            name="ReportIncident"
            component={ReportIncident}
            options={{ title: "Report Incident" }}
          />
          <Stack.Screen
            name="ReportIncidentDetails"
            component={ReportIncidentDetails}
            options={{ title: "Report an Incident" }}
          />
          <Stack.Screen
            name="IncidentList"
            component={IncidentList}
            options={{ title: "Incident List" }}
            screenOptions={{
              headerShown: true,
              animation: "simple_push", // Default animation for all screens
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="IncidentDetails"
            component={IncidentDetails}
            options={{ 
              headerShown: true,
              title: "Incident Details" 
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapIncidents}
            options={{ title: "Map" }}
          />
          <Stack.Screen
            name="Home"
            component={TestScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="IncidentContent"
            component={IncidentContent}
            options={{
              headerShown: true,
               title: "Incident Content" }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}