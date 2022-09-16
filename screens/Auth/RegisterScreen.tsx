import React from 'react';
import { Button, Input, Text } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

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
            <Text style={{textAlign:"center",fontSize:24,marginTop:20}}>Register</Text>

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
                {!!value.error && <Text style={{marginBottom:20,marginHorizontal:10,color:"#C70039"}}>{value.error}</Text>}
                <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180}}><Button color="transparent" title="Sign up" onPress={signUp} /></LinearGradient>
                <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180, marginTop:20}}><Button  color="transparent" title="Main screen" onPress={() => navigation.navigate('Welcome')} /></LinearGradient>
            </View>

            
        </SafeAreaView>
    );
}