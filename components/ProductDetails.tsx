import { Text } from "@rneui/base";
import { ScrollView } from "react-native";

export default function ProductDetails({ data }: { data: any }) {
    return (
        <ScrollView>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </ScrollView>
    );
}