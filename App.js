import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import Barra from './components/ui/Barra';

import { DefaultTheme, Provider } from 'react-native-paper';

const Stack = createStackNavigator();


//
// Definir el tema
const theme ={
    ...DefaultTheme,
    //reescribir colores
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
}
const App = () => {

  return (
   <>
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle:{
          backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle:{
            fontWeight: 'bold',
          }
        }}
        >
            <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={({navigation, route}) => ({
              headerTitleAlign: 'center',
              headerLeft : (props) => <Barra {...props}
                              navigation ={navigation}
                              route={route}
              
              />
            })}
            />

            <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title:" Nuevo Cliente"
            }}
            />
            
            <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{
              title:" Detalle Cliente"
            }}
            />

      
        </Stack.Navigator>
    </NavigationContainer>
   </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
