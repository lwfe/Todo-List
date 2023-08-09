export interface DeleteTask {
    delete: (id: string) => Promise<void>
}