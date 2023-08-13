import { LocalAddTask } from '../../../src/data/useCases/localAddTask'
import { LocalStorageAdapterSpy } from '../mocks/mockCache'

const makeSut = (key: string) => {
  const localStorage = new LocalStorageAdapterSpy()
  const sut = new LocalAddTask(key, localStorage)
  return {
    sut,
    localStorage
  }
}

describe('LocalAddTask', () => {
  it('should add a new task', async () => {
    const { localStorage, sut } = makeSut('tasks')
    const title = 'any_title'
    await sut.add([{ id: 'test', title, done: false }])
    expect(localStorage.key).toBe('tasks')
    expect(localStorage.value).toEqual([{
      id: expect.any(String),
      title,
      done: false
    }])
  })
})