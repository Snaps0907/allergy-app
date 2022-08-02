import { Input, Badge } from "@rneui/base";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { addUserAllergy, removeUserAllergy } from "../api/queries";
import { appStore } from "../AppStore";

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

            <View>
                {appStore.allergies.map(x => <Badge key={x} value={`${x} X`} badgeStyle={styles.badge} textStyle={styles.badgeText} onPress={() => removeAllergy(x)} />)}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        height: "auto",
        borderRadius: 100
    },
    badgeText: {
        fontSize: 16,
        fontWeight: "bold"
    }
});