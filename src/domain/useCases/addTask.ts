import { Task } from '../models/task'

export interface AddTask {
    add: (title: string) => Promise<Task>
}
