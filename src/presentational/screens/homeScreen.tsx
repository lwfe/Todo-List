import { StatusBar } from 'expo-status-bar'
import { Button, FlatList, StyleSheet, Text, TextInput, Pressable, View, KeyboardAvoidingView, Platform, Alert} from 'react-native'
import { Task } from '../../domain/models/task'
import Constants from 'expo-constants'
import { useState, useRef } from 'react'
import LottieView from 'lottie-react-native'

interface HomeScreenProps {
  tasks: Task[]
  addTask: (title: string) => void
  removeTask: (id: string) => void
  updateTask: (id: string, done: boolean) => void
}

export default function HomeScreen({ tasks, addTask, removeTask, updateTask }: HomeScreenProps) {
  const animation = useRef<LottieView>(null)
  const [taskTitle, setTaskTitle] = useState('')

  function handleAddTask() {
    addTask(taskTitle)
    setTaskTitle('')
  }

  function handleRemoteTask(id: string) {
    return Alert.alert('Remover tarefa', 'Deseja remover essa tarefa?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => removeTask(id)
      }
    ])
  }

  function handleUpdateTask(id: string, done: boolean) {
    switch (done) {
    case true:
      updateTask(id, !done)
      animation.current?.reset()
      break
    
    default:
      updateTask(id, !done)
      animation.current?.play()
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
        </View>

        <FlatList
          ListEmptyComponent={() => (
            <View style={styles.emptyListView}>
              <Text style={styles.emptyListText}>Você ainda não adicionou nenhuma tarefa</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.flatList}
          data={tasks}
          renderItem={({ item }) => (
            <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.1 : 1 }, styles.taskItem]} onPress={() => handleUpdateTask(item.id, item.done)} onLongPress={() => handleRemoteTask(item.id)} key={item.id}>
              <Text style={styles.taskTitle}>
                {item.title}
              </Text>

              <LottieView loop={false} ref={animation} style={styles.defaultTask} source={require('../../../public/lottie/animation_ll8vebap.json')} />
            </Pressable>
          )}
        />

        <View style={styles.buttonView}>
          <TextInput placeholder='Adicione uma nova task' value={taskTitle} onChangeText={setTaskTitle} style={styles.input} />
          <Button title='Adicionar' onPress={handleAddTask} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
  },
  separator: {
    height: 20,
  },
  taskView: {
    display: 'flex',
    flexDirection: 'row',
  },
  taskItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 4
  },
  taskTitle: {
    flex: 1,
    fontSize: 18
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#9d9d9d'
  },
  emptyListView: {
    flex: 1,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#9d9d9d'
  },
  defaultTask: {
    width: 22,
    height: 22,
  }
})