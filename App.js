import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons'

import tasks from './screens/tasks'
import routine from './screens/routine'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Tarefas"
          component={tasks}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="list" size={30} color={'#485460'} />
            },
            tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false
          }}
        />
        <Tab.Screen
          name="Rotina"
          component={routine}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="alarm" size={30} color={'#485460'} />
            },
            tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
