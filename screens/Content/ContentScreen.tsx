import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import ScannerScreen from './ScannerScreen';
import { useAuthentication } from '../../hooks/useAuthentication';
import React from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../../AppStore';

const Tab = createBottomTabNavigator();

export default observer(({ navigation }: { navigation: any }) => {
    useAuthentication();

    React.useEffect(() => {
        if (!appStore.user) navigation.navigate('Welcome');
    }, [appStore.user]);
    
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Scanner" component={ScannerScreen} />
        </Tab.Navigator>
    );
})