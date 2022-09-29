import React, { useState, useContext, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator

} from "react-native";

type DadosProps = {
    id: string;
    name: string;
    email: string;
    phone:number;
   
    
  
  };
 type ChamadosProps={
    map(arg0: (item: any) => JSX.Element): React.ReactNode;
    id:string;
    title:string;
    description:string;
    status:string;
    tecninc:string;
    category:string;
    }
type EnderecoProps ={
    map(arg0: (item: any) => JSX.Element): React.ReactNode;
    
    id:string;
    street:string;
    city:string;
    complement:string;
    cep:number;
    

}
  
  import { Avatar } from "native-base";
import api from "../../service/auth";
import { StackParamsList } from "../../routes/auth.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const User: React.FC = () => {
  const {  user } = useContext(AuthContext);
  const [dados, setDados] = useState<DadosProps>([])
  const [Enderecos, setEnderecos] = useState<EnderecoProps>([])
  const [Chamados, setChamados] = useState<ChamadosProps>([])
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  useEffect(() => {
    async function me() {
       const response = await api.get("/customer/me", {
            params:{
                customerId: user.id
            }
           
        })
        setDados(response.data)
        setEnderecos(response.data.Endereco)
        setChamados(response.data.Chamado)
        
    }
    me()
  },[]) 

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Avatar bg="green.500" source={{
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }}>
        AJ
      </Avatar>
      <Text style={styles.text}>Area User</Text>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{dados.phone}</Text>
      {Enderecos.map((item)=>(
        <View key={item.id}>
        <Text style={styles.text}>{item.street}</Text>
        <Text style={styles.text}>{item.city}</Text>
        <Text style={styles.text}>{item.cep}</Text>
        <Text style={styles.text}>{item.complement}</Text>
        </View>
      ))}
       {Chamados.map((item)=>(
        <View key={item.id}>
        <Text style={styles.text}>{item.id}</Text>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.status}</Text>
        </View>
      ))}
      
      
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08090A",
    color:'#ffff'
  },
  text:{
    color:'#fff'
  }
})
  
export default User;
