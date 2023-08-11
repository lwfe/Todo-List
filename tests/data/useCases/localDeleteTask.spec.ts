import { LocalStorage } from '../../../src/data/protocols/localStorage'
import { DeleteTask } from '../../../src/domain/useCases/deleteTask'
import { LocalStorageAdapterSpy } from '../mocks/mockCache'


class LocalDeleteTask implements DeleteTask {
  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorage
  ){}

  async delete(id: string): Promise<void> {
    this.localStorage.remove(this.key, id)
  }
}

const makeSut = (key: string) => {
  const localStorage = new LocalStorageAdapterSpy()
  const sut = new LocalDeleteTask(key, localStorage)
  return {
    sut,
    localStorage
  }
}


describe('LocalDeleteTask', () => {
  test('should delete task from localStorage', async () => {
    const { sut, localStorage } = makeSut('tasks')
    const id = 'any_id'
    await sut.delete(id)
    expect(localStorage.localStorage[0].value).toStrictEqual([])
  })
})