import { GetStorage } from '../../../src/data/protocols/getStorage'
import { RemoveStorage } from '../../../src/data/protocols/remoteStorage'
import { SetStorage } from '../../../src/data/protocols/setStorage'

type localStorageItem = {
  key: string
  value: any
}

export class LocalStorageAdapterSpy implements GetStorage, SetStorage, RemoveStorage {
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

  async get(key: string): Promise<localStorageItem | undefined> {
    this.key = key
    return this.localStorage.find(item => item.key === key)
  }

  async set(key: string, value?: any): Promise<void> {
    if (value) {
      this.key = key
      this.value = value
      this.localStorage.push({
        key,
        value
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