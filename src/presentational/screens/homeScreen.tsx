import { StatusBar } from 'expo-status-bar'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Task } from '../../domain/models/task'
import Constants from 'expo-constants'

interface HomeScreenProps {
  tasks: Task[]
  addTask: () => void
  removeTask: (id: string) => void
}

export default function HomeScreen({ tasks, addTask, removeTask }: HomeScreenProps) {

  console.log(tasks)

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
      </View>

      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.flatList}
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => removeTask(item.id)} key={item.id}>
            <Text style={styles.taskTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonView}>
        <Button title='Adicionar' onPress={() => addTask()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    padding: 16
  },
  title: {
    fontWeight: '600',
    fontSize: 28
  },
  flatList: {
    flex: 1,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  separator: {
    height: 20,
  },
  taskView: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 4
  },
  taskTitle: {
    fontSize: 18
  }
})