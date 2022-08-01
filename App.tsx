import './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import AuthScreen from './screens/Auth/AuthScreen';
import ContentScreen from './screens/Content/ContentScreen';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage"]);

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Content" component={ContentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}