import { observer } from "mobx-react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStore } from "../../AppStore";

export default observer(() => {
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