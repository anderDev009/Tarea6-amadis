import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Genre from "./Components/Genre";
import QuizAge from "./Components/QuizAge";
import Home from "./Components/Home";
import Edad from "./Components/QuizAge";
import Country from "./Components/Country";
import Clima from "./Components/Clima";
import WordpressNews from "./Components/WordpressNews";
import AboutMeScreen from "./Components/AboutMe";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Genero" component={Genre}/>
        <Stack.Screen name="Edad" component={Edad}/>
        <Stack.Screen name="Pais" component={Country}/>
        <Stack.Screen name="Clima" component={Clima}/>
        <Stack.Screen name="WordpressApi" component={WordpressNews}/>
        <Stack.Screen name="Acerca de" component={AboutMeScreen}/>

        </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
