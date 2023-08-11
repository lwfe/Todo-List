import { LocalLoadTasks } from '../../../src/data/useCases/localLoadTasks'
import { LocalStorageAdapterSpy } from '../mocks/mockCache'

export const makeSut = (key: string) => {
  const localStorage = new LocalStorageAdapterSpy()
  const sut = new LocalLoadTasks(key, localStorage)

  return {
    localStorage, sut
  }
}

describe('LocalLoadTasks', () => {
  
  it('should call localStorage with corret key', async () => {
    const key = 'tasks'
    const { localStorage, sut } = makeSut(key)
    await sut.loadAll()
    expect(localStorage.key).toBe(key)
  })

  it('should return tasks on success', async () => {
    const { sut } = makeSut('tasks')
    const tasks = await sut.loadAll()
    expect(tasks).toStrictEqual([])
  })

  it('should return undefined on error', async () => {
    const { sut } = makeSut('undefined_key')
    const tasks = await sut.loadAll()
    expect(tasks).toBeUndefined()
  })
})