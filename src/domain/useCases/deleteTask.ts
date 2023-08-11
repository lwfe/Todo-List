export interface DeleteTask {
    delete: (key: string, id: string) => Promise<void>
}