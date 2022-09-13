import { Input, Badge } from "@rneui/base";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { addUserAllergy, removeUserAllergy } from "../api/queries";
import { appStore } from "../AppStore";
import { LinearGradient } from 'expo-linear-gradient';
import { autoAction } from "mobx/dist/internal";

export default observer(() => {
    const [value, setValue] = useState("");

    const removeAllergy = async (allergy: string) => {
        await removeUserAllergy(appStore.user!.uid, allergy);
        appStore.setAllergies(appStore.allergies.filter(x => x !== allergy));
    }

    const addAllergy = async () => {
        const allergy = value.trim().toLowerCase();

        if (appStore.allergies.includes(allergy)) {
            setValue("");
            return;
        }

        if (allergy) {
            await addUserAllergy(appStore.user!.uid, allergy);
            appStore.setAllergies([...appStore.allergies, allergy]);
            setValue("");
        }
    }

    return (
        <View>
            <Text>Allergies list</Text>
            <Input value={value} onChangeText={value => setValue(value)} />
            <Button title="add" onPress={addAllergy} />

            <View style={{flexDirection:"row",margin:10}}>
                {appStore.allergies.map(x =><LinearGradient colors={['#27AE60', '#85D454']} style={{borderRadius:10,margin:2}}><Badge key={x} value={`${x} X`} badgeStyle={styles.badge} textStyle={styles.badgeText} onPress={() => removeAllergy(x)} /></LinearGradient>)}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        height: "auto",
        backgroundColor:"transparent"
    },
    badgeText: {
        fontSize: 18,
        fontWeight: "normal"
    }
});