import { GetStorage } from './getStorage'
import { RemoveStorage } from './remoteStorage'
import { SetStorage } from './setStorage'

export interface LocalStorage extends GetStorage, SetStorage, RemoveStorage {
    get: (key: string) => Promise<any>
    set: (key: string, value: any) => Promise<void>
    remove: (key: string) => Promise<void>
}