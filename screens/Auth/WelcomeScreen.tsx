import { Button, Text } from "@rneui/base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView>
            <Text>Welcome</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </SafeAreaView>
    );
}