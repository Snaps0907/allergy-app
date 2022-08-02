import { Button, Input, Text } from "@rneui/base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    });
    const auth = getAuth();

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Content');
        } catch (error: any) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <SafeAreaView>
            <Text>Register</Text>

            <View>
                <Input
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    keyboardType="email-address"
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                />

                <Input
                    placeholder='Password'
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='key'
                        size={16}
                    />}
                />

                <Button title="Sign in" onPress={signIn} />
            </View>

            {!!value.error && <Text>{value.error}</Text>}
        </SafeAreaView>
    );
}