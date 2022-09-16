import { Icon, Input, Text } from "@rneui/base";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { View } from "react-native";
import { appStore } from "../AppStore";

enum Status {
    Display,
    Edit,
    Saving
}

export default observer(() => {
    const [status, setStatus] = useState(Status.Display);
    const [value, setValue] = useState(appStore.user?.displayName || "");

    const handleOnPress = async () => {
        if (status === Status.Edit) {
            setStatus(Status.Saving);
            await appStore.updateUserName(value);
            setStatus(Status.Display);
        } else if (status === Status.Display) {
            setStatus(Status.Edit);
        }
    }

    const getIconName = () => {
        switch (status) {
            case Status.Display:
                return "edit";
            case Status.Edit:
                return "save";
            default:
                return "cached";
        }
    }

    return <View style={{flexDirection:"row",width:100, alignItems:"center",marginHorizontal:100}}>
        <Text style={{fontSize:22}}>Name: </Text>
        <Input disabled={status !== Status.Edit} value={value} placeholder="set your name" onChangeText={setValue} inputContainerStyle={{borderBottomWidth:0,top:12}}/>
        <Icon name={getIconName()} onPress={handleOnPress} />
    </View>
});