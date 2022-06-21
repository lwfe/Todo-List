import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Keyboard, Alert } from "react-native";
import {
  Container,
  List,
  InputContainer,
  Input,
  AddIcon,
  AddIconText,
  ListText,
  ItemsView,
  Item,
} from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

export default function Tasks() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function addTask() {
    const search = task.filter((task) => task === newTask);

    if (newTask === "") {
      return;
    }

    if (search.length !== 0) {
      Alert.alert(
        "Erro ao adicionar tarefa",
        "Nome de tarefa repetido, tente adicionando com outro nome"
      );
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");
    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Tarefa",
      "Você tem certeza que deseja remover essa tarefa?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTask(task.filter((tasks) => tasks !== item));
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);

  function HandleRenderItem({ item }) {
    return (
      <ItemsView>
        <ListText>{item}</ListText>
        <Item onPress={() => removeTask(item)}>
          <Ionicons name="trash" size={25} color="#f53b57" />
        </Item>
      </ItemsView>
    );
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <List
        data={task}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={HandleRenderItem}
      />
      <InputContainer>
        <Input
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Adicione uma tarefa"
          maxLength={25}
        />
        <AddIcon onPress={() => addTask()}>
          <AddIconText>+</AddIconText>
        </AddIcon>
      </InputContainer>
    </Container>
  );
}
