import { Task } from '../../domain/models/task'

export interface SetStorage {
  set: (key: string, value: Task) => Promise<void>
}