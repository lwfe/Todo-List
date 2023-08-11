import { LocalStorageAdapterSpy } from '../../data/mocks/mockCache'


describe('LocalStorageAdapter', () => {
  test('should call localStorageAdapterSpy.get with correct key', async () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'any_key'
    await sut.get(key)
    expect(sut.key).toBe(key)
  })

  test('should call localStorageAdapterSpy.set with correct key and value', async () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'any_key'
    const value = 'any_value'
    await sut.set(key, value)
    expect(sut.key).toBe(key)
    expect(sut.value).toBe(value)
  })

  test('should return undefined if localStorageAdapterSpy.get returns undefined', async () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'undefined_key'
    const response = await sut.get(key)
    expect(response).toBeUndefined()
  })

  test('should return value if localStorageAdapterSpy.get returns value', async () => {
    const sut = new LocalStorageAdapterSpy()
    const item = {
      key: 'tasks',
      value: []
    }
    const response = await sut.get(item.key)
    expect(response).toStrictEqual(item.value)
  })
})