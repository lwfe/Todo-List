import React, { useEffect, useState} from 'react'
import HomeScreen from './src/presentational/screens/homeScreen'
import { Task } from './src/domain/models/task'
import { AsyncStorageAdapter } from './src/infra/cache/asyncStorageAdapter'
import { LocalLoadTasks } from './src/data/useCases/localLoadTasks'
import { LocalAddTask } from './src/data/useCases/localAddTask'

async function fetchTasks(): Promise<Task[]> {
  const AsyncStorage = new AsyncStorageAdapter()
  const localLoadTasks = new LocalLoadTasks('tasks', AsyncStorage)
  return await localLoadTasks.loadAll()
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  async function addTask(): Promise<void> {
    const AsyncStorage = new AsyncStorageAdapter()
    const localAddTask = new LocalAddTask('tasks', AsyncStorage)
    await localAddTask.add('teste2')
    const tasks = await fetchTasks()
    setTasks(tasks)
  }

  useEffect(() => {
    async function loadTasks() {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    loadTasks()
  }, [])

  return (
    <HomeScreen tasks={tasks} addTask={addTask} />
  )
}
