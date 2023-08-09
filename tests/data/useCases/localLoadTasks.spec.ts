
import { Task } from '../../../src/domain/models/task'
import { LoadTasks } from '../../../src/domain/useCases/loadTasks'


class LocalLoadTasks implements LoadTasks {
  loadAll(): Promise<Task[]> {
    return Promise.resolve([])
  }
}

describe('LocalLoadTasks', () => {
  const teste = new LocalLoadTasks()
  it('teste', () => {
    teste.loadAll()
    expect(1).toBe(1)
  })
})