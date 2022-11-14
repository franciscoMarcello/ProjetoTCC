import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import { NativeBaseProvider} from "native-base";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
      <NativeBaseProvider>
        <Routes />
        </NativeBaseProvider>
      </AuthProvider>
     
    </NavigationContainer>
  );
};
export default App;
