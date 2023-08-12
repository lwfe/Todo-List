import { AddTask } from '../../domain/useCases/addTask'
import { LocalStorage } from '../protocols/localStorage'

function generateRandomHex(length: number): string {
  let result = ''
  const characters = '0123456789abcdef'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateUUID(): string {
  const sections = [
    generateRandomHex(8),
    generateRandomHex(4),
    '4' + generateRandomHex(3),
    (8 | (Math.random() * 4)).toString(16) + generateRandomHex(3),
    generateRandomHex(12)
  ]
  return sections.join('-')
}

export class LocalAddTask implements AddTask {
  constructor(
    private readonly key: string,
    private readonly localStorage: LocalStorage
  ) { }

  async add(title: string): Promise<void> {
    const id = generateUUID()

    await this.localStorage.set(this.key, {
      id,
      title,
      done: false
    })
  }
}