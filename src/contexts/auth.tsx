import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import api from "../service/auth";
import { StackParamsList } from "../routes/auth.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SignInData = {
  email: string;
  password: string;
};
type SignUpData = {
  email: string;
  password: string;
  name:string;
  phone:string
};
type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};


interface AuthContextData {
  isAuthenticated: boolean;
  user: UserProps ;
  signIn: (credentials: SignInData) => Promise<void>;
  Logout(): void;
  loadingAuth:boolean;
  loading:boolean
  error:string
  signUp:(credentials:SignUpData) => Promise<void>
  
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    token: "",
    email: ""
  });
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading,setLoading] = useState(true)
  const [error, setError] =useState('')
  const isAuthenticated = !!user.id
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@App:user");
      const storagedToken = await AsyncStorage.getItem("@App:token");

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storagedToken}`;
      }
      setLoading(false)
    }
    loadStoragedData();
  }, []);
  async function signIn({ email, password }: SignInData) {
    setLoadingAuth(true)
    try{
      const response = await api.post("/auth", {
        email: email,
        password: password,
      });
      
      const {id,name,token} = response.data

      const data = {
        ...response.data
      }
       setUser({
        id,
        name,
        email,
        token
       });
     await AsyncStorage.setItem("@App:user", JSON.stringify(data));
     await AsyncStorage.setItem("@App:token", token);

    api.defaults.headers.common[
       "Authorization"
     ] = `Bearer ${token}`;
     setError('')
    setLoadingAuth(false)
    }catch(err:any){
      setLoadingAuth(false)
     setError(err.response.data.message )
    }
   
    
  }
  async function signUp({ email, password, name,phone }: SignUpData) {
    setLoadingAuth(true)
    try{
      const response = await api.post("/customer", {
        email: email,
        password: password,
        name:name,
        phone:phone
      });
      
     
        
    setLoadingAuth(false)
    setError('')
    navigation.navigate('SignIn')
    }catch(err:any){
      setLoadingAuth(false)
     setError(err.response.data.message )
    }
   
    
  }

  async function Logout() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        token: "",
        email: "",
      });
  })
}
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, Logout,loadingAuth,loading,error,signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
