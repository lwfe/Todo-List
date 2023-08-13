import { LocalLoadTasks } from '../../../data/useCases/localLoadTasks'
import { AsyncStorageAdapter } from '../../../infra/cache/asyncStorageAdapter'


export const localLoadTasksFactory = () => {
  const AsyncStorage = new AsyncStorageAdapter()
  const localLoadTasks = new LocalLoadTasks('tasks', AsyncStorage)
  return {
    localLoadTasks
  }
}