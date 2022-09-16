import { Slider, Text } from "@rneui/base";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { appStore } from "../AppStore";

export default observer(() => {
    const [disabled, setDisabled] = useState(false);

    const setWellbeing = async (value: number) => {
        setDisabled(true);
        await appStore.setTodayWellbeing(value);
        setDisabled(false);
    }

    return <View style={{marginVertical:20}}>
        <View style={{alignItems:"center"}}>
        <Text style={styles.labelsWrapper.text}>How do you feel today?</Text>
        </View>
        <View style={{marginHorizontal:20}}>
            <View style={styles.labelsWrapper}>
                <Text style={[styles.labelsWrapper.text,{color:"#C70039"}]}>bad</Text>
                <Text style={[styles.labelsWrapper.text,{color:"#EBD64E"}]}>so-so</Text>
                <Text style={[styles.labelsWrapper.text,{color:"#3C9C2A"}]}>good</Text>
            </View>
            <View>
                <Slider value={appStore.todayWellbeing} minimumValue={1} maximumValue={3} onSlidingComplete={setWellbeing} step={1} disabled={disabled} thumbStyle={styles.thumb} trackStyle={styles.track}/>
            </View>
        </View>
    </View>
});

const styles = StyleSheet.create({
    labelsWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",

        text:{
            fontSize:18,
            fontWeight:"bold"
        }
    },
    track:{
        justifyContent:"center",
        height:30,
        borderRadius:30,
        borderWidth:0,
        borderColor:"gray",
        backgroundColor:"#fff"
    },
    thumb:{
        height:28,
        width:28,
        backgroundColor:"#fff"
    }
});