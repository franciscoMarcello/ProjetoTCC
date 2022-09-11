import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator

} from "react-native";




import { StackParamsList } from "../../routes/auth.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const SignUp: React.FC = () => {
  const {  signUp,loadingAuth,error } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function handleRegistre() {
    await signUp({ email, password,phone,name });
 
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nome"
        placeholderTextColor={"white"}
      />
       <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor={"white"}
        autoCapitalize='none'
        keyboardType="email-address"
      />
       <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Telefone"
        placeholderTextColor={"white"}
      />
         <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Senha"
        placeholderTextColor={"white"}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={ConfirmPassword}
        placeholder="Confirmação de senha"
        secureTextEntry
        placeholderTextColor={"white"}
       
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistre}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#fff"/>
        ) : (<Text style={styles.text}> Cadastrar</Text>)}
        
      </TouchableOpacity>
      <TouchableOpacity onPress={
        () => navigation.navigate('SignIn')}>
        <Text style={styles.text}> Já póssui conta? Logar</Text>
      </TouchableOpacity>

      <View style={styles.viewError}>
          {error ? (<Text style={styles.error}>{error}</Text>): null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090A",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 8,
    margin: 5,
    color: "white",
    borderColor:"#DDD",
    
  },
  button: {
    backgroundColor: "#9400D3",
    padding: 10,
    width: "80%",
    borderRadius: 8,
    margin: 5,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  error: {
    textAlign: "center",
    color: "#DA2C38",
    fontWeight:"bold"
    
  },
  viewError:{
    marginTop:10,
  }
});
export default SignUp;
