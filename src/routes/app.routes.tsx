import React from "react";
import Chamados from "../screens/Chamados";
import Home from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "../screens/User";
import Endereco from "../screens/User/Endereco";
import Details from "../screens/Chamados/Details";
import CustomDrawer from "../components/CustomDrawer";
import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Mystacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Arear" component={User} />
      <Stack.Screen name="Endereço" component={Endereco} />
      <Stack.Screen
        name="Details"
        options={{ title: "Detalhes do chamado" }}
        component={Details}
      />
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
    <Drawer.Screen
      options={{
        drawerIcon: ({ color }) => {
          <AntDesign name="API" size={22} color={color} />;
        },
      }}
      name="Home"
      component={Home}
    />
    <Drawer.Screen
      options={{
        drawerIcon: ({ color }) => {
          <AntDesign name="API" size={22} color={color} />;
        },
      }}
      name="Chamados"
      component={Chamados}
    />
    <Drawer.Screen
      name="Area do Usuário"
      component={Mystacks}
      options={{
        drawerIcon: ({ color }) => {
          <AntDesign name="API" size={22} color={color} />;
        },
      }}
    />
  </Drawer.Navigator>
);
export default AppRoutes;
