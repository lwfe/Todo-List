export interface RemoveStorage {
    remove(key: string, id: string): Promise<void>
}