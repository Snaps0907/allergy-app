import { Icon, Image } from "@rneui/base";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import data from '../../data/pollination.json';

export default function MapScreen() {
    const regions = Object.keys(data);
    const [region, setRegion] = useState(regions[0]);

    const getCurrentMonth = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        return months[d.getMonth()];
    }

    const getIcon = (value: string) => {
        switch (value) {
            case "none":
                return <Icon name="emoji-happy" type="entypo" color="green" />;
            case "low":
                return <Icon name="emoji-neutral" type="entypo" color="orange" />
            case "high":
                return <Icon name="emoji-sad" type="entypo" color="red" />
        }
    }

    // @ts-ignore
    const selectedData = data[region][getCurrentMonth()];

    return (
        <ScrollView>
            <Text>Select region:</Text>
            <SelectDropdown data={regions} onSelect={setRegion} buttonTextAfterSelection={selectedItem => selectedItem} rowTextForSelection={item => item} defaultValue={region} />
            <Image source={require("../../assets/map.png")} style={{ width: 300, height: 300, resizeMode: "contain" }} />
            <Text>Tendencje stężenia alergenów</Text>
            <View style={{flexDirection:"row",alignItems:"center",marginVertical: 4, justifyContent:"space-around"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-happy" type="entypo" color="green"/><Text>None</Text></View>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-neutral" type="entypo" color="orange"/><Text>Low</Text></View>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-sad" type="entypo" color="red"/><Text>High</Text></View>
            </View>
            {Object.entries(selectedData).map(([key, value]) => <View key={key} style={styles.line}>
                {getIcon(value as string)}
                <Text style={{marginLeft:10}}>{key}</Text>
            </View>)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    line: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        width: "50%",
        marginVertical: 4
    }
})