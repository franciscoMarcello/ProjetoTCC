import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthContext from "../contexts/auth";
import AuthRoutes from "./auth.routes";
import { ActivityIndicator, View } from "react-native";
const Routes: React.FC = () => {
  const {isAuthenticated, loading } = useContext(AuthContext);
  if(loading){
    return(
      <View
      style={{
        flex:1,
        backgroundColor:'#080705',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
        <ActivityIndicator size={60} color="#da2c38"/>
      </View>
    )
  }
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
  
};
export default Routes;
