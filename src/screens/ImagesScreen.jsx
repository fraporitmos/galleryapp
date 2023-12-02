import React, { useEffect, useState } from 'react'
import { Alert, AppState, FlatList, Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native'
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions'
import ImageView from "react-native-image-viewing";
import RNFS from 'react-native-fs'

const ImagesScreen = () => {
  const [stateRequest, setStateRequest] = useState('')
  const [imageList, setImageList] = useState([])
  const [visible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        fetchImages()
      }
    });
    checkPermission()
  }, [])

  const checkPermission = async () => {
    let stateCheck;
    if (Platform.OS == 'android') {
      if (Platform.Version >= 13) {
        stateCheck = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
      }
      stateCheck = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }
    if (stateCheck === 'granted') {
      setStateRequest('granted')
      fetchImages()
    } else {
      requestPermission()
    }
  }




  const requestPermission = async () => {
    let stateRequest;
    if (Platform.OS == 'android') {
      if (Platform.Version >= 13) {
        stateRequest = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
      }
      stateRequest = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }
    switch (stateRequest) {
      case 'granted':
        setStateRequest('granted')
        fetchImages()
        break;
      case 'blocked':
        openSettingApp()
    }
  }

  const fetchImages = async () => {
    setStateRequest('granted')
    const folderScreenshot = RNFS.ExternalStorageDirectoryPath + '/DCIM/Screenshots'
    const folderPhotos = RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera'

    const filesScreenshots = await RNFS.readDir(folderScreenshot)
    const filesImageScreenshots = filesScreenshots.filter(file => file.isFile() && file.path.endsWith('.jpg' || '.png' || '.jpeg'))
  
    const filesPhotos = await RNFS.readDir(folderPhotos)
    const filesImagePhotos = filesPhotos.filter(file => file.isFile() && file.path.endsWith('.jpg' || '.png' || '.jpeg'))
   
   
    const imagesScreenshot = filesImageScreenshots.map(file => ({ uri: 'file://' + file.path }))
    const imagesPhotos = filesImagePhotos.map(file => ({ uri: 'file://' + file.path }))
    const images = [...imagesPhotos,...imagesScreenshot]
   
    setImageList(images)
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

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      {
        stateRequest === 'granted' ?
          <View>
            <FlatList
              data={imageList}
              numColumns={3}
              keyExtractor={(item) => item.uri}

              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentIndex(imageList.indexOf(item))
                    setIsVisible(true)
                  }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: 200, height: 200 }}
                  />
                </TouchableOpacity>

              }
            />
            <ImageView
              images={imageList}
              imageIndex={currentIndex}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>
          :
          <TouchableOpacity
            onPress={() => { checkPermission() }}
            style={{ backgroundColor: 'rgb(27, 0, 109)', width: '50%', borderRadius: 16 }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', padding: 8 }}>
              Permisos de storage
            </Text>
          </TouchableOpacity>
      }
    </View>
  )
}

export default ImagesScreen
