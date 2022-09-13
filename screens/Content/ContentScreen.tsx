import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import ScannerScreen from './ScannerScreen';
import { useAuthentication } from '../../hooks/useAuthentication';
import React from 'react';
import { observer } from 'mobx-react';
import ProductInfo from './ProductInfo';
import { Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

export default observer(({ navigation }: { navigation: any }) => {
    useAuthentication();

    return (
        <>
            <Tab.Navigator initialRouteName='Home' safeAreaInsets={{ bottom: 50, left: 8, right: 8, }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" /> }} />
                <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: () => <Icon name="calendar" type="material-community" /> }} />
                <Tab.Screen name="Map" component={MapScreen} options={{ tabBarIcon: () => <Icon name="map" type="material-community" /> }} />
                <Tab.Screen name="Scanner" component={ScannerScreen} options={{ tabBarIcon: () => <LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}}><Icon name="barcode-scan" type="material-community" color="white"/></LinearGradient> }} />
                <Tab.Screen name="Search" component={ProductInfo} options={{ tabBarIcon: () => <Icon name="search" /> }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Icon name="person" /> }} />
                
               
            </Tab.Navigator>
        </>
    );
})

