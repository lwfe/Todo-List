import { LocalStorageAdapterSpy } from '../mocks/mockCache'
import { LocalDeleteTask } from '../../../src/data/useCases/localDeleteTask'

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