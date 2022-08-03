import { Button } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView } from "react-native";
import AllergiesManagement from "../../components/AllergiesManagement";
import EditUserName from "../../components/EditUserName";

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
            <Button onPress={logout} title="logout" />
        </ScrollView>
    );
});