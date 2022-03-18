import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import api from "../service/auth";

type SignInData = {
  email: string;
  password: string;
};

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn: ({ email, password }: SignInData) => Promise<void>;
  Logout(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@App:user");
      const storagedToken = await AsyncStorage.getItem("@App:token");

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
    }
    loadStoragedData();
  }, []);
  async function signIn({ email, password }: SignInData) {
    const response = await api.post("/sessions", {
      email: email,
      password: password,
    });
    setUser(response.data.user);
    await AsyncStorage.setItem("@App:user", JSON.stringify(response.data.user));
    await AsyncStorage.setItem("@App:token", response.data.token);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }

  function Logout() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
