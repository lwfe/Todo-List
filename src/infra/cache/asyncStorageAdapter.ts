import { Task } from '../../domain/models/task'

import { GetStorage } from '../../data/protocols/getStorage'
import { RemoveStorage } from '../../data/protocols/remoteStorage'
import { SetStorage } from '../../data/protocols/setStorage'

import AsyncStorage from '@react-native-async-storage/async-storage'


export class AsyncStorageAdapter implements SetStorage, GetStorage, RemoveStorage {
  async get(key: string): Promise<Task[] | null> {
    try {
      const item  = await AsyncStorage.getItem(key)
      if(item !== null) {
        return JSON.parse(item)
      }
      return null
    } catch (e) {
      throw new Error('Erro ao recuperar o item')
    }
  }

  async set(key: string, value: Task): Promise<void> {
    const tasks: Task[] = []

    if (value) {
      const valueExists = await this.get(key)
      if (valueExists) {
        tasks.push(...valueExists)
      }
      tasks.push(value)
    }
    
    try {
      const jsonValue = JSON.stringify(tasks)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      throw new Error('Erro ao salvar o item')
    }
  }


  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      throw new Error('Erro ao remover o item')
    }
  }
}