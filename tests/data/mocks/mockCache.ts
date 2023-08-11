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
  value?: Task

  async get(key: string): Promise<Task[] | undefined> {
    this.key = key
    const item = this.localStorage.find(item => item.key === key)
    return  item ? item.value : undefined
  }

  async set(key: string, value: Task): Promise<void> {
    const item = this.localStorage.find(item => item.key === key)
    const newValue: Task[] = item ? item.value : []

    if (item) {
      newValue.push(value)
    }
    
    this.key = key
    this.value = value
    this.localStorage.push({
      key,
      value: newValue
    })
    
  }

  async remove(key: string): Promise<void> {
    this.localStorage = this.localStorage.filter(item => item.key !== key)
  }
}