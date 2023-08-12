import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Task } from '../../domain/models/task'

interface HomeScreenProps {
  tasks: Task[]
  addTask: () => void
}

export default function HomeScreen({ tasks, addTask }:HomeScreenProps ) {

  console.log(tasks)

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />

      {tasks?.map(task => (
        <Text key={task.id}>{task.title}</Text>
      ))}

      <Button title='Adicionar' onPress={() => addTask()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})