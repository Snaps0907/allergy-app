import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContentScreen from './screens/ContentScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Content' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Content" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}