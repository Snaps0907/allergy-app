import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import AuthScreen from './screens/Auth/AuthScreen';
import ContentScreen from './screens/User/ContentScreen';
import './firebase';
import { useAuthentication } from './hooks/useAuthentication';

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuthentication();

  console.log(user);

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