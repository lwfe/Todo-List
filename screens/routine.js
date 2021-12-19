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

export default function routine() {
  const [routine, setRoutine] = useState([])
  const [newRoutine, setNewRoutine] = useState('')

  async function addRoutine() {
    const search = routine.filter(routine => routine === newRoutine)

    if (newRoutine === '') {
      return
    }

    if (search.length !== 0) {
      Alert.alert(
        'Erro ao adicionar rotina',
        'Nome da rotina repetida, tente adicionando com outro nome'
      )
      return
    }

    setRoutine([...routine, newRoutine])
    setNewRoutine('')
    Keyboard.dismiss()
  }

  async function removeTask(item) {
    Alert.alert(
      'Deletar rotina',
      'Você tem certeza que deseja remover essa rotina?',
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
            setRoutine(routine.filter(routine => routine !== item))
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    async function carregaDados() {
      const routine = await AsyncStorage.getItem('routine')

      if (routine) {
        setRoutine(JSON.parse(routine))
      }
    }
    carregaDados()
  }, [])

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem('routine', JSON.stringify(routine))
    }
    salvaDados()
  }, [routine])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />

        <FlatList
          data={routine}
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
            value={newRoutine}
            onChangeText={text => setNewRoutine(text)}
            placeholder="Adicione uma rotina"
            maxLength={25}
          />
          <TouchableOpacity style={styles.addIcon} onPress={() => addRoutine()}>
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
