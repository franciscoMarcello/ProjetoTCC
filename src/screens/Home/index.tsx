import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import AuthContext from "../../contexts/auth";


const Home = () => {
  
 

  const { Logout } = useContext(AuthContext);
  async function handleLogout() {
    Logout();
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HOME</Text>
     
      <Button title="Sair" onPress={handleLogout} />
    
    </View>
  );
};

export default Home;
