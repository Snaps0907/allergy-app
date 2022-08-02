import React from 'react';
import { Button, Input, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }: { navigation: any }) {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    });
    const auth = getAuth();

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
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

            <View >
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

                <Button title="Sign up" onPress={signUp} />
            </View>

            {!!value.error && <Text>{value.error}</Text>}
        </SafeAreaView>
    );
}