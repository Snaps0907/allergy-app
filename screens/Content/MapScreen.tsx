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
        <ScrollView style={{backgroundColor:"#fff"}}>
            <Text>Select region:</Text>
            <SelectDropdown data={regions} onSelect={setRegion} buttonTextAfterSelection={selectedItem => selectedItem} rowTextForSelection={item => item} defaultValue={region} />
            <View style={{justifyContent:"center",alignItems:"center",paddingVertical:20}}><Image source={require("../../assets/map.png")} style={{ width: 300, height: 300, resizeMode: "contain" }} /></View>
            <Text style={{marginHorizontal:15,textAlign:"center"}}>Tendencje stężenia alergenów</Text>
            <View style={{flexDirection:"row",alignItems:"center",marginVertical: 4,paddingVertical: 10, justifyContent:"space-around", borderBottomWidth:1, borderBottomColor:"lightgray"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-happy" type="entypo" color="green"/><Text style={{marginLeft:10}}>None</Text></View>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-neutral" type="entypo" color="orange"/><Text style={{marginLeft:10}}>Low</Text></View>
            <View style={{flexDirection:"row",alignItems:"center"}}><Icon name="emoji-sad" type="entypo" color="red"/><Text style={{marginLeft:10}}>High</Text></View>
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
        marginVertical: 10,
        marginHorizontal:15,
    }
})