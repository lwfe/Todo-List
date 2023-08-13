import React, { useEffect, useState} from 'react'
import HomeScreen from './src/presentational/screens/homeScreen'
import { Task } from './src/domain/models/task'
import { generateUUID } from './src/core/utils/generateUUID'
import { localAddTaskFactory } from './src/core/factories/useCases/localAddTaskFactory'
import { localLoadTasksFactory } from './src/core/factories/useCases/localLoadTasksFactory'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  
  async function fetchTasks(): Promise<Task[]> {
    const { localLoadTasks } = localLoadTasksFactory()
    return await localLoadTasks.loadAll()
  }
  async function addTask(title: string): Promise<void> {
    const newTasks = [...tasks, { id: generateUUID(), title, done: false }]
    const { localAddTask } = localAddTaskFactory()
    await localAddTask.add(newTasks)
    setTasks(newTasks)
  }

  async function removeTask(id: string): Promise<void> {
    const newTasks = tasks.filter(task => task.id !== id)
    const { localAddTask } = localAddTaskFactory()
    await localAddTask.add(newTasks)
    setTasks(newTasks)
  }

  async function updateTask(id: string, done: boolean): Promise<void> {
    const newTasks = tasks.map(task => task.id === id ? { ...task, done } : task)
    const { localAddTask } = localAddTaskFactory()
    await localAddTask.add(newTasks)
    setTasks(newTasks)
  }

  useEffect(() => {
    async function loadTasks() {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    loadTasks()
  }, [])

  return <HomeScreen tasks={tasks} addTask={addTask} removeTask={removeTask} updateTask={updateTask} />
  
}
