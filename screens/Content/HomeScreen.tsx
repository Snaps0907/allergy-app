import { Button, Text } from "@rneui/base";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
import { appStore } from "../../AppStore";
import WellbeingInput from "../../components/WellbeingInput";

export default observer(({ navigation }: { navigation: any }) => {
    const userName = appStore.user?.displayName ? ` ${appStore.user?.displayName}` : '';

    return (
        <ScrollView>
            <Text>Hi{userName}!</Text>
            <WellbeingInput />
            <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
            <Button title="Search products" onPress={() => navigation.navigate('Search')} />
            <Button title="Map" onPress={() => navigation.navigate('Map')} />
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
            <Button title="Scanner" onPress={() => navigation.navigate('Scanner')} />
        </ScrollView>
    );
});