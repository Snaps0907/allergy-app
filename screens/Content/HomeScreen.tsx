import { Button } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView>
            <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
            <Button title="Allergies" onPress={() => navigation.navigate('Allergies')} />
            <Button title="Map" onPress={() => navigation.navigate('Map')} />
            <Button title="Scanner" onPress={() => navigation.navigate('Scanner')} />
            <Button title="WellBeing" onPress={() => navigation.navigate('WellBeing')} />
        </SafeAreaView>
    );
}