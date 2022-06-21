import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tasks from "./screens/Tasks/tasks";

const Tab = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Tarefas"
          component={Tasks}
          options={{
            title: "Tarefas",
            headerStyle: {
              backgroundColor: "#353b48",
            },
            headerTintColor: "#f5f6fa",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
