import { Task } from '../../domain/models/task'
import { LoadTasks } from '../../domain/useCases/loadTasks'
import { LocalStorage } from '../protocols/localStorage'

export class LocalLoadTasks implements LoadTasks {

  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorage
  ) {}

  async loadAll(): Promise<Task[]> {
    return await this.localStorage.get(this.key)
  }
}