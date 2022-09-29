import React from "react";
import Chamados from "../screens/Chamados";
import Home from "../screens/Home";
import { createDrawerNavigator } from '@react-navigation/drawer';
import User from "../screens/User";

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => (
  <Drawer.Navigator
  screenOptions={{
    drawerStyle: {
      backgroundColor: '#080705',
     
      width: 240,
      
    },
    drawerActiveBackgroundColor:'#9400d3',
    drawerLabelStyle:{
      color:"white"
    }

    
  }}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Chamados" component={Chamados} />
    <Drawer.Screen name="Area do user" component={User} />
  </Drawer.Navigator>
);
export default AppRoutes;
