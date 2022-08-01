import { Button, Text } from "@rneui/base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
    const user = useAuthentication();

    React.useEffect(() => {
        if (user) navigation.navigate('Content');
    }, [user]);

    return (
        <SafeAreaView>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </SafeAreaView>
    );
}