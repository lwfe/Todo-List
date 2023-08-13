import { GetStorage } from './getStorage'
import { SetStorage } from './setStorage'

export interface LocalStorage extends GetStorage, SetStorage {
    get: (key: string) => Promise<any>
    set: (key: string, value: any) => Promise<void>
}