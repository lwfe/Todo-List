import { Task } from '../../domain/models/task'
import { AddTask } from '../../domain/useCases/addTask'
import { LocalStorage } from '../protocols/localStorage'

export class LocalAddTask implements AddTask {
  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorage
  ) { }

  async add(tasks: Task[]): Promise<void> {
    await this.localStorage.set(this.key, tasks)
  }
}