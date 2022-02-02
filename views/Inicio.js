import React, {useEffect, useState} from 'react';
import { Text,FlatList, View,StyleSheet } from 'react-native';
import axios from 'axios';
import { List, Headline,Button,FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Inicio = ({navigation, route}) => {

  //state de la app
  const [clientes, guardarClientes] = useState([]);
  const [consultarAPI, guardarConsultarAPI]= useState(true)

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const resultado = await axios.get('http://10.0.2.2:3000/clientes');
        guardarClientes(resultado.data)
        guardarConsultarAPI(false);
      } catch (error) {
        console.log(error);
      }
    }
    if(consultarAPI){
      obtenerClientesApi();
    }
  }, [consultarAPI])
  return (
     <View style={globalStyles.contenedor}> 
     {/* <Button icon="plus-circle" onPress={()=> navigation.navigate("NuevoCliente",{guardarConsultarAPI})}>Nuevo Cliente</Button> */}

       <Headline style={globalStyles.titulo}>{clientes.length> 0 ? "Clientes" : "Aun no hay clientes"}</Headline>
       <FlatList
       data={clientes}
       keyExtractor={cliente => (cliente.id).toString()}
       renderItem={({item}) =>(
         <List.Item
         title = {item.nombre}
         description = {item.empresa}
         onPress={() => navigation.navigate("DetallesCliente", {item, guardarConsultarAPI})}
         />

       )}
       />
       <FAB
       icon="plus"
       style ={globalStyles.fab} 
       onPress={()=> navigation.navigate("NuevoCliente",{guardarConsultarAPI})}    
       />
     </View>
  )
};



export default Inicio;
