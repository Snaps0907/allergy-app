import { Button } from "@rneui/base";
import { ScrollView } from "react-native";
import WellbeingInput from "../../components/WellbeingInput";

export default function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <ScrollView>
            <WellbeingInput />
            <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
            <Button title="Map" onPress={() => navigation.navigate('Map')} />
            <Button title="Scanner" onPress={() => navigation.navigate('Scanner')} />
        </ScrollView>
    );
}