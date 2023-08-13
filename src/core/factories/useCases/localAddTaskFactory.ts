import { LocalAddTask } from '../../../data/useCases/localAddTask'
import { AsyncStorageAdapter } from '../../../infra/cache/asyncStorageAdapter'

export const localAddTaskFactory = () => {
  const AsyncStorage = new AsyncStorageAdapter()
  const localAddTask = new LocalAddTask('tasks', AsyncStorage)
  return {
    localAddTask
  }
}