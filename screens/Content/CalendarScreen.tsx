import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStore } from "../../AppStore";

export default observer(() => {
    const isFocused = useIsFocused();

    useEffect(() => {
        const updateWellbeing = async () => {
            try {
                await appStore.refreshWellbeing();
            } catch (err) {
                console.error(err)
            }
        }

        if (isFocused) {
            updateWellbeing();
        }
    }, [isFocused]);

    const resolveColor = (value: number) => {
        switch (value) {
            case 1:
                return "#C70039";
            case 2:
                return "#EBD64E";
            case 3:
                return "#3C9C2A";
        }
    }

    const getDatesToHighlight = () => {
        const markedDates: { [key: string]: any } = {};

        appStore.wellbeing.map(x => {
            markedDates[x.date] = { selected: true, selectedColor: resolveColor(x.rating) };
        });

        return markedDates;
    }


    return (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
            <Calendar markedDates={getDatesToHighlight()} />
        </SafeAreaView>
    );
});