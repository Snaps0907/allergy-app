import { Input, Badge,Icon } from "@rneui/base";
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
        <View style={{borderBottomWidth:1,borderBottomColor:"lightgray",marginBottom:20}}>
            <View style={{flexDirection:"row",width:200, alignItems:"center",marginHorizontal:30}}>
            <Text style={{fontSize:16}}>Allergies list:</Text>
            <Input inputContainerStyle={{borderWidth:0,top:12}} style={{fontSize:16}} value={value} onChangeText={value => setValue(value)} placeholder="add your allery here..."/>
            {/* <Button title="add" onPress={addAllergy} /> */}
            <Icon name="add" onPress={addAllergy}/>
            </View>
            

            <View style={{flexDirection:"row",margin:10,flexWrap:"wrap"}}>
                {appStore.allergies.map(x =><LinearGradient key={x} colors={['#27AE60', '#85D454']} style={{borderRadius:10,margin:2,width:"auto"}}><Badge key={x} value={`${x} X`} badgeStyle={styles.badge} textStyle={styles.badgeText} onPress={() => removeAllergy(x)} /></LinearGradient>)}
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