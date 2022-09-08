import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import AuthContext from "../../contexts/auth";
import api from "../../service/auth";

const Home = () => {
  const [task, setTask] = useState("");
  function addTask() {
    api
      .post("/tasks", {
        task: task,
      })
      .then((response) => console.log(response.data));
    Alert.alert("Task criada");
    setTask("");
  }

  const { Logout } = useContext(AuthContext);
  async function handleLogout() {
    Logout();
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HOME</Text>
      <TextInput value={task} onChangeText={setTask} />
      <Button title="Sair" onPress={handleLogout} />
      <Button title="Enviar" onPress={addTask} />
    </View>
  );
};

export default Home;
