import { LocalStorageAdapterSpy } from '../../data/mocks/mockCache'


describe('LocalStorageAdapter', () => {

  test('should call localStorageAdapterSpy.get with correct key', () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'any_key'
    sut.get(key)
    expect(sut.key).toBe(key)
  })

  test('should call localStorageAdapterSpy.set with correct key and value', () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'any_key'
    const value = 'any_value'
    sut.set(key, value)
    expect(sut.key).toBe(key)
    expect(sut.value).toBe(value)
  })

  test('should return undefined if localStorageAdapterSpy.get returns undefined', () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'undefined_key'
    expect(sut.get(key)).toBeUndefined()
  })

  test('should return value if localStorageAdapterSpy.get returns value', () => {
    const sut = new LocalStorageAdapterSpy()
    const item = {
      key: '1',
      value: '123'
    }
    const response = sut.get(item.key)
    expect(response?.key).toBe(item.key)
    expect(response?.value).toBe(item.value)
  })

  test('should return undefined if localStorageAdapterSpy.set is missing value', () => {
    const sut = new LocalStorageAdapterSpy()
    const key = 'any_key'
    const response = sut.set(key)
    expect(response).toBeUndefined()
  })
})