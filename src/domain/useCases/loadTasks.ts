import { Task } from '../models/task'

export interface LoadTasks {
    loadAll: () => Promise<Task[]>
}
