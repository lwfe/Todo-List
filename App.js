import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import tasks from "./screens/tasks";

const Tab = createNativeStackNavigator();

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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
