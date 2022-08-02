import { Button, Text } from "@rneui/base";
import { observer } from "mobx-react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStore } from "../../AppStore";
import { useAuthentication } from "../../hooks/useAuthentication";

export default observer(({ navigation }: { navigation: any }) => {
    useAuthentication();

    React.useEffect(() => {
        if (appStore.user) navigation.navigate('Content');
    }, [appStore.user]);

    return (
        <SafeAreaView>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </SafeAreaView>
    );
});