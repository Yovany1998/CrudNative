import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Barra = ({navigation,route}) => {

    const handlePress =() =>{
        navigation.navigate("NuevoCliente")
    }

  return (
    //   <Button icon="plus-circle" color='#FFF' onPress={() => handlePress()}>
    //       Cliente
    //   </Button>
    <>
    </>
  )
};
const styles = StyleSheet.create({
   color:{
       color: '#000'
   }
});

export default Barra;
