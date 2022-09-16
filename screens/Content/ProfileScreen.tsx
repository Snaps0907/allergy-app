import { Button } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView } from "react-native";
import AllergiesManagement from "../../components/AllergiesManagement";
import EditUserName from "../../components/EditUserName";
import { LinearGradient } from 'expo-linear-gradient';

export default observer(({ navigation }: { navigation: any }) => {
    const logout = () => {
        const auth = getAuth();
        auth.signOut();
        navigation.navigate("Welcome");
    }

    return (
        <ScrollView>
            <EditUserName />
            <AllergiesManagement />
            <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180}}><Button color="transparent" onPress={logout} title="logout" /></LinearGradient>
        </ScrollView>
    );
});