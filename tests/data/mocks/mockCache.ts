import { LocalStorage } from '../../../src/data/protocols/localStorage'
import { Task } from '../../../src/domain/models/task'

type localStorageItem<T> = {
  key: string
  value: T
}

export class LocalStorageAdapterSpy implements LocalStorage {
  localStorage: localStorageItem<Task[]>[] = [{
    key: 'tasks',
    value: []
  }]
  
  key?: string
  value?: string

  async get(key: string): Promise<Task[] | undefined> {
    this.key = key
    const item = this.localStorage.find(item => item.key === key)
    return  item ? item.value : undefined
  }

  async set(key: string, value?: any): Promise<void> {
    const item = this.localStorage.find(item => item.key === key)
    const newValue: Task[] = item ? item.value : []

    if (item) {
      newValue.push(value)
    }
    
    if (value) {
      this.key = key
      this.value = value
      this.localStorage.push({
        key,
        value: newValue
      })
    } else {
      this.key = key
      this.value = undefined
    } 
  }

  async remove(key: string): Promise<void> {
    this.localStorage = this.localStorage.filter(item => item.key !== key)
  }
}