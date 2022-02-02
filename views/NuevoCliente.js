import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
import logError from 'react-native/Libraries/Utilities/logError';
import globalStyles from '../styles/global';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(['Remote debugger']);

const NuevoCliente = ({navigation,route}) => {

  const {guardarConsultarAPI} = route.params;
    //campos formulario
    const [nombre,guardarNombre]= useState('');
    const [telefono,guardarTelefono]= useState('');
    const [empresa,guardarEmpresa]= useState('');
    const [correo,guardarCorreo]= useState('');
    const [alerta,guardarAlerta]= useState(false);

   // detectar si estamos editando o no
   useEffect(() => {
   if(route.params.cliente){
       const { nombre, telefono, correo, empresa} = route.params.cliente;

       guardarNombre(nombre);
       guardarTelefono(telefono);
       guardarCorreo(correo);
       guardarEmpresa(empresa);
   }else{

   }
   }, [])

    //almacena el cliente en la base de datos
    const guardarCliente = async () =>{
        //validar
        if(nombre === '' || telefono === '' || empresa === '' || correo===''){
            guardarAlerta(true);
            return;
        }
        //generar el cliente
        const cliente ={nombre, telefono, empresa, correo};

        //si estamos editando o creando un nuevo cliente
       if(route.params.cliente){
         const {id} = route.params.cliente;
         cliente.id = id;
         const url = `http://10.0.2.2:3000/clientes/${id}`;
        
         try {
           await axios.put(url, cliente)
         } catch (error) {
           console.log(error);
         }
       }else{
         
        //guardar el cliente en la API
        try {
          if(Platform.OS === 'ios'){
             //para ios
             await axios.post('http://localhost:3000/clientes', cliente);
          }else{
               //para android
               await axios.post('http://10.0.2.2:3000/clientes', cliente);
         
          }
         
        } catch (error) {
          console.log(error);
        }
       }

        //redireccionar
          navigation.navigate('Inicio');
        //limpiar el form 

        guardarNombre('');
        guardarEmpresa('');
        guardarTelefono('');
        guardarCorreo('');

        //cambiar a verdadero para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }
  return (
    <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>{(route.params.cliente)? "Editar cliente" : "Añadir nuevo cliente"}</Headline>
        <TextInput
            label="Nombre"
            placeholder="Juan"
            onChangeText={texto => guardarNombre(texto)}
            value={nombre}
            style={styles.input}
        />
      
      <TextInput
            label="Telefono"
            placeholder="33010663"
            onChangeText={texto => guardarTelefono(texto)}
            value={telefono}
            style={styles.input}
        />
      
      <TextInput
            label="Correo"
            placeholder="Correo@Correo.com"
            onChangeText={texto => guardarCorreo(texto)}
            value={correo}
            style={styles.input}
        />
        <TextInput
            label="Empresa"
            placeholder="Nombre Empresa"
            onChangeText={texto => guardarEmpresa(texto)}
            value={empresa}
            style={styles.input}
        />
      <Button icon="pencil-circle"  mode="contained" onPress={() => guardarCliente()}>
      {(route.params.cliente)? "Editar" : "Guardar"}
      </Button>

      <Portal>
          <Dialog
          visible ={alerta}
          onDismiss={() => guardarAlerta(false)}
          >
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                  <Paragraph>
                    Todos los campos son obligatorios
                  </Paragraph>
              </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=> guardarAlerta(false)}>OK</Button>
                </Dialog.Actions>
          </Dialog>
      </Portal>
    </View>
  )
};

const styles = StyleSheet.create({
  input:{
      marginBottom: 20,
      backgroundColor: 'transparent'
  }
});
export default NuevoCliente;
