import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import tasks from "./screens/tasks";
import routine from "./screens/routine";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { position: "absolute" } }}>
        <Tab.Screen
          name="Tarefas"
          component={tasks}
          options={{
            tabBarIcon: () => {
              return (
                <Ionicons name="checkmark-circle" size={30} color={"#485460"} />
              );
            },
            headerTintColor: "#485460",
            headerTitleStyle: { fontSize: 26 },
            headerStyle: {
              height: 100,
            },
            tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
          }}
        />
        <Tab.Screen
          name="Rotina"
          component={routine}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="alarm" size={30} color={"#485460"} />;
            },
            headerTintColor: "#485460",
            headerTitleStyle: {
              fontSize: 26,
            },
            headerStyle: {
              height: 100,
            },
            tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
