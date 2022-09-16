import { Button, Text,Image } from "@rneui/base";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStore } from "../../AppStore";
import { useAuthentication } from "../../hooks/useAuthentication";
import { LinearGradient } from 'expo-linear-gradient';

export default observer(({ navigation }: { navigation: any }) => {
    useAuthentication();

    React.useEffect(() => {
        if (appStore.user) navigation.navigate('Content');
    }, [appStore.user]);

    return (
        
            
        <SafeAreaView style={styles.screen}>
        <Image source={require("../../assets/AS-logo.png")} style={styles.logo}/>
        <Text style={{fontSize:32,color:"#939393",fontWeight:"bold"}}>Allergy Support</Text>
        <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180, marginTop:20}}><Button color="#00000000" title="Login" onPress={() => navigation.navigate('Login')} /></LinearGradient>
        <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180, marginTop:20}}><Button color="#00000000" title="Register" onPress={() => navigation.navigate('Register')} /></LinearGradient>
        </SafeAreaView>

    );
});

const styles = StyleSheet.create({
    logo:{
        display:"flex",
         justifyContent:"center",
         alignItems:"center",
         width: 150,
         height: 150,
         resizeMode: "contain" 
    },
    screen:{
          backgroundColor:"#fff",
         height:"100%",
         display:"flex",
         justifyContent:"center",
         alignItems:"center"
    },
    buttons:{
        width:200,
        padding:10,
        margin:20,
        borderColor:"white",
        borderWidth:3,
        borderRadius:5,
    }
})