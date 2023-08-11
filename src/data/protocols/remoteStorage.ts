export interface RemoveStorage {
    remove(key: string): Promise<void>
}