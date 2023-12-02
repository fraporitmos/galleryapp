import React, { useEffect, useState } from 'react'
import { Alert, AppState, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions'
import RNFS from 'react-native-fs'
import Video from 'react-native-video'


const VideosSreen = () => {
  const [videoList, setVideoList] = useState([])
  const [currentVideo, setCurrentVideo] = useState(null)

  useEffect(() => {
    checkPermission()
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        fetchVideos()
      }
    });
    fetchVideos()
  }, [])

  const checkPermission = async () => {
    let stateCheck;
    if (Platform.OS == 'android') {
      if (Platform.Version >= 13) {
        stateCheck = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO)
      }
      stateCheck = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }

    if (stateCheck == 'granted') {
      fetchVideos()

    } else {
      requestPermission()
    }
    console.log(stateCheck)
  }

  const requestPermission = async () => {
    let stateRequest;
    if (Platform.OS == 'android') {
      if (Platform.Version >= 13) {
        stateRequest = await request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO)
      }
      stateRequest = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }

    switch (stateRequest) {
      case 'granted':
        fetchVideos()

        break;
      case 'blocked':
        openSettingApp()
        break;
      
    }

  }
  const openSettingApp = () => {
    Alert.alert(
      'Permiso de storage bloqueado',
      'Es necesario que habilites los permisos de la App en Permisos>Almacenamiento>Permitir',
      [
        {
          text: 'Continnuar',
          style: 'default',
          onPress: () => {
            openSettings();
          }
        },
      ],
      { cancelable: false }
    )
  }

  const fetchVideos = async () => {
    const folderCamera = RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera'
    const filesVideos = await RNFS.readDir(folderCamera)
    const filesVideosCameraFiltered = filesVideos.filter(video =>
      video.isFile() && video.path.endsWith('.mp4' || '.mkv' || '.m3u8')
    )
    const videosCamera = filesVideosCameraFiltered.map(file => ({ uri: 'file://' + file.path }))
    setVideoList(videosCamera)
    
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.uri}
        renderItem={({ item , index}) => (

          <TouchableOpacity
          onPress={()=>{
            setCurrentVideo(index)
          } }
      

          >
          <View style={{
            backgroundColor: '#000',
            width: '100%', 
            aspectRatio: 16 / 9, marginVertical: 10,
          }}>
         
           
          
            <Video
              paused={currentVideo !== index}
              source={{ uri: item.uri }}
              resizeMode="contain"
              poster="https://res.cloudinary.com/dokwcwo9t/image/upload/v1701544621/idat/thumbnail_vr9mwa.webp"
              style={{ flex: 1 }}

            />
                      
          </View>
          </TouchableOpacity>


        )}

      />


    </View>
  )
}

export default VideosSreen

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})
