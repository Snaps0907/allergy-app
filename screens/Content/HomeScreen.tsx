import { Button, Text,Icon } from "@rneui/base";
import { StyleSheet,View } from "react-native";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
import { appStore } from "../../AppStore";
import WellbeingInput from "../../components/WellbeingInput";
import { LinearGradient } from 'expo-linear-gradient';

export default observer(({ navigation }: { navigation: any }) => {
    const userName = appStore.user?.displayName ? ` ${appStore.user?.displayName}` : '';

    return (
        <ScrollView style={{backgroundColor:"#fff"}}>
            <Text style={{fontSize:22}}>Hi{userName}!</Text>
            <WellbeingInput />
            <Button color="transparent" style={styles.buttons} onPress={() => navigation.navigate('Calendar')}><View style={[styles.btnView,styles.shadowProp]}><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10, width:90}}><Icon name="calendar" type="material-community" size={50} color="white" style={{padding:15,margin:0}}/></LinearGradient><Text style={{marginLeft:20,fontSize:24}}>Calendar</Text></View></Button>
            <Button color="transparent" style={styles.buttons} onPress={() => navigation.navigate('Search')}><View style={[styles.btnView,styles.shadowProp]}><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10, width:90}}><Icon name="search" size={50} color="white" style={{padding:15,margin:0}}/></LinearGradient><Text style={{marginLeft:20,fontSize:24}}>Search</Text></View></Button>
            <Button color="transparent" style={styles.buttons} onPress={() => navigation.navigate('Map')}><View style={[styles.btnView,styles.shadowProp]}><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10, width:90}}><Icon name="map" type="material-community" size={50} color="white" style={{padding:15,margin:0}}/></LinearGradient><Text style={{marginLeft:20,fontSize:24}}>Map</Text></View></Button>
            <Button color="transparent" style={styles.buttons} onPress={() => navigation.navigate('Profile')}><View style={[styles.btnView,styles.shadowProp]}><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10, width:90}}><Icon name="account" type="material-community" size={50} color="white" style={{padding:15,margin:0}}/></LinearGradient><Text style={{marginLeft:20,fontSize:24}}>Profile</Text></View></Button>
            <Button color="transparent" style={styles.buttons} onPress={() => navigation.navigate('Scanner')}><View style={[styles.btnView,styles.shadowProp]}><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10, width:90}}><Icon name="barcode-scan" type="material-community" size={50} color="white" style={{padding:15,margin:0}}/></LinearGradient><Text style={{marginLeft:20,fontSize:24}}>Scanner</Text></View></Button>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
 
    buttons:{
        color:"#000",
        width:"100%",
        padding:0,
        marginRight:0,
        alignItems:"center",
        textAlign:"center",
    },
    btnView:{
        backgroundColor:"#DFDFDF",
        borderRadius:10, 
        width:"100%", 
        alignItems:"center",
        flexDirection:"row", 
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 5,
      }
})