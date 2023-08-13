import { Task } from '../models/task'

export interface AddTask {
    add: (tasks: Task[]) => Promise<void>
}
