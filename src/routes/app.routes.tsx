import React from "react";
import Chamados from "../screens/Chamados";
import Home from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "../screens/User";
import Endereco from "../screens/User/Endereco";
import Details from "../screens/Chamados/Details";
import CustomDrawer from "../components/CustomDrawer";

import Historico from "../screens/Chamados/Historico";
import Avaliacao from "../screens/Avaliacao";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyUser() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Arear" component={User} />
      <Stack.Screen name="Endereço" component={Endereco} />
    </Stack.Navigator>
  );
}
function MyHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dash" component={Home} />
      <Stack.Screen name="Avaliacao" component={Avaliacao} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Historico" component={Historico} />
    </Stack.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: "#080705",

        width: 240,
      },
      drawerActiveBackgroundColor: "#580ef6",
      drawerLabelStyle: {
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#3d3a50",
      },
      headerTintColor: "white",
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={MyHome} />
    <Drawer.Screen name="Novo Chamado" component={Chamados} />
    <Drawer.Screen name="User" component={MyUser} />
  </Drawer.Navigator>
);
export default AppRoutes;
