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

    return <View>
        <Text>How do you feel today?</Text>

        <View>
            <View style={styles.labelsWrapper}>
                <Text>bad</Text>
                <Text>so-so</Text>
                <Text>good</Text>
            </View>
            <View>
                <Slider value={appStore.todayWellbeing} minimumValue={1} maximumValue={3} onSlidingComplete={setWellbeing} step={1} disabled={disabled} />
            </View>
        </View>
    </View>
});

const styles = StyleSheet.create({
    labelsWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between"
    }
});