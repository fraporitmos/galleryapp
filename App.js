import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import NativeStack from './src/navigator/NativeStack'

const App = () => {
  return (
    <NavigationContainer>
        <NativeStack />
    </NavigationContainer>
  )
}

export default App
