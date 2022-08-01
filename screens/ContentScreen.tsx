import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import AllergiesScreen from './AllergiesScreen';
import CalendarScreen from './CalendarScreen';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import ScannerScreen from './ScannerScreen';
import WellBeingScreen from './WellBeingScreen';

const Tab = createBottomTabNavigator();

export default function ContentScreen() {
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Allergies" component={AllergiesScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Scanner" component={ScannerScreen} />
            <Tab.Screen name="WellBeing" component={WellBeingScreen} />
        </Tab.Navigator>
    );
}