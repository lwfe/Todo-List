import { LocalStorage } from '../protocols/localStorage'
import { DeleteTask } from '../../domain/useCases/deleteTask'

export class LocalDeleteTask implements DeleteTask {
  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorage
  ){}

  async delete(id: string): Promise<void> {
    this.localStorage.remove(this.key, id)
  }
}