import { Button } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { appStore } from "../AppStore";

export const ContactRequest = observer(() => {
    const [text, setText] = useState("");

    const submit = async () => {
        try {
            await appStore.sendContactRequest(text);
            setText("");
        } catch (err) {
            console.error(err);
        }
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Contact us:</Text>
        <TextInput multiline value={text} onChangeText={setText} style={styles.input} placeholder="Describe your issue..." numberOfLines={5} textAlignVertical="top" />
        <LinearGradient colors={['#27AE60', '#85D454']} style={{ alignSelf: "center", borderRadius: 10, width: 180 }}>
            <Button color="transparent" onPress={submit} title="submit" />
        </LinearGradient>
    </View>
});

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingTop: 0
    },
    title: {
        fontSize: 20,
        marginBottom: 4
    },
    input: {
        backgroundColor: "white",
        marginBottom: 12,
        padding: 4
    }
});