import { GetStorage } from '../../../src/data/protocols/getStorage'
import { SetStorage } from '../../../src/data/protocols/setStorage'

type localStorageItem = {
  key: string
  value: any
}

export class LocalStorageAdapterSpy implements GetStorage, SetStorage {
  localStorage: localStorageItem[] = [
    {
      key: '1',
      value: '123'
    },
    {
      key: '2',
      value: '234'
    }
  ]
  key?: string
  value?: string

  get(key: string): localStorageItem | undefined {
    this.key = key
    return this.localStorage.find(item => item.key === key)
  }

  set(key: string, value?: any): localStorageItem | undefined {
    if (value) {
      this.key = key
      this.value = value
      this.localStorage.push({
        key,
        value
      })
      return this.localStorage.find(item => item.key === key)
    } else {
      this.key = key
      this.value = undefined
      return undefined
    } 
    
  }
}