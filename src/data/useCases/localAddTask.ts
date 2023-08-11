import crypto from 'crypto'
import { AddTask } from '../../domain/useCases/addTask'
import { LocalStorageAdapterSpy } from '../../../tests/data/mocks/mockCache'

export class LocalAddTask implements AddTask {
  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorageAdapterSpy
  ) { }

  async add(title: string): Promise<void> {
    const id = crypto.randomUUID()

    await this.localStorage.set(this.key, {
      id,
      title,
      done: false
    })
  }
}