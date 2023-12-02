import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ImagesScreen from '../screens/ImagesScreen';
import VideosSreen from '../screens/VideosSreen';

const Stack = createNativeStackNavigator();

function NativeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
      }}

    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="ImagesScreen" component={ImagesScreen} />

      <Stack.Screen name="VideosScreen" component={VideosSreen} />


    </Stack.Navigator>
  );
}

export default NativeStack;