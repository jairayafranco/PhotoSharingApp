import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null)

  let abrirImagePicker = async () => {
    let permisoResultado = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(permisoResultado.granted === false) {
      alert("Se necesitan permisos para acceder a la galeria")
      return
    }

    let escogerResultado = await ImagePicker.launchImageLibraryAsync()
    
    if(escogerResultado.cancelled === true) {
      return
    }

    setSelectedImage({LocalUri: escogerResultado.uri})
  }

  let abrirDialog = async () => {
    if(!(await Sharing.isAvailableAsync())) {
      alert("La opcion de compartir no es compatible con este dispositivo")
      return
    }

    await Sharing.shareAsync(selectedImage.LocalUri)
  }

  if(selectedImage !== null) {
    return(
      <View style={styles.container}>
        <Image
          source={{uri: selectedImage.LocalUri}} 
          style={styles.thumbnail}>
        </Image>
        <TouchableOpacity onPress={abrirDialog} style={styles.button}>
            <Text style={styles.buttonText}>Compartir esta imagen</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image source={logo} style={styles.logo} />
      <Text style={styles.centerText}>Para compartir una imagen, solo presiona el boton en la parte inferior</Text>

      <TouchableOpacity
        onPress={abrirImagePicker}
        style={styles.button}>
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 300, 
    height: 150
  },

  centerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15
  },

  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  },

  buttonText: {
    fontSize: 18, 
    color: '#fff'
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
});
