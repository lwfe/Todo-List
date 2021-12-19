import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function tasks() {
  const [task, setTask] = useState([])
  const [newTask, setNewTask] = useState('')

  async function addTask() {
    const search = task.filter(task => task === newTask)

    if (newTask === '') {
      return
    }

    if (search.length !== 0) {
      Alert.alert(
        'Erro ao adicionar tarefa',
        'Nome de tarefa repetido, tente adicionando com outro nome'
      )
      return
    }

    setTask([...task, newTask])
    setNewTask('')
    Keyboard.dismiss()
  }

  async function removeTask(item) {
    Alert.alert(
      'Deletar Tarefa',
      'Você tem certeza que deseja remover essa tarefa?',
      [
        {
          text: 'Não',
          onPress: () => {
            return
          },
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            setTask(task.filter(tasks => tasks !== item))
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem('task')

      if (task) {
        setTask(JSON.parse(task))
      }
    }
    carregaDados()
  }, [])

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem('task', JSON.stringify(task))
    }
    salvaDados()
  }, [task])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 30}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />

        <FlatList
          data={task}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.tasksContainer}>
              <Text style={{ fontSize: 20, color: '#000' }}>{item}</Text>
              <TouchableOpacity onPress={() => removeTask(item)}>
                <Ionicons name="trash" size={25} color="#f53b57" />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={text => setNewTask(text)}
            placeholder="Adicione uma tarefa"
            maxLength={25}
          />
          <TouchableOpacity style={styles.addIcon} onPress={() => addTask()}>
            <Text style={{ color: '#485460', fontSize: 22 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  tasksContainer: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: '#dcdde1'
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  input: {
    backgroundColor: '#dcdde1',
    width: '80%',
    padding: 10,
    borderRadius: 8
  },
  addIcon: {
    backgroundColor: '#0be881',
    width: 50,
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  title: {
    borderBottomWidth: 0.6,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: '#485460'
  },
  titleText: {
    fontSize: 40
  }
})
