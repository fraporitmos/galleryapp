import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const HomeScreen = NativeStack => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => { 
          NativeStack.navigation.navigate("ImagesScreen")
        }}
        style={{ borderWidth: 2, borderRadius: 16, borderColor: '#000', width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>
          Imagenes
        </Text>
        <Image
          width={100}
          height={100}
          source={{ uri: "https://res.cloudinary.com/dokwcwo9t/image/upload/v1701539100/idat/fotos_hmzwwz.png" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { 
          NativeStack.navigation.navigate("VideosScreen")
        }}
        style={{ marginTop: 16, borderWidth: 2, borderRadius: 16, borderColor: '#000', width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>
          Videos
        </Text>
        <Image
          width={100}
          height={100}
          source={{ uri: "https://res.cloudinary.com/dokwcwo9t/image/upload/v1701539108/idat/video_vua2z2.png" }}
        />

      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
