import { Task } from '../../domain/models/task'
import { LocalStorage } from '../../data/protocols/localStorage'

import AsyncStorage from '@react-native-async-storage/async-storage'

export class AsyncStorageAdapter implements LocalStorage {
  tasks: Task[] = []

  async get(key: string): Promise<Task[] | null> {
    try {
      const item  = await AsyncStorage.getItem(key)
      if (item !== null) {
        this.tasks = JSON.parse(item)
        return JSON.parse(item)
      }
      return null
    } catch (e) {
      throw new Error('Erro ao recuperar o(s) item(s)')
    }
  }

  async set(key: string, value: Task[]): Promise<void> {
    const tasks: Task[] = value
    try {
      const jsonValue = JSON.stringify(tasks)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      throw new Error('Erro ao salvar o(s) item(s)')
    }
  }
}