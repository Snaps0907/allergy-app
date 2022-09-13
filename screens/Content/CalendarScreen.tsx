import { observer } from "mobx-react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStore } from "../../AppStore";





export default observer(({ navigation }: { navigation: any }) => {
    const markedDates: { [key: string]: any } = {};

    const resolveColor = (value: number) => {
        switch (value) {
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "green";
        }
    }

    appStore.wellbeing.map(x => {
        markedDates[x.date] = { selected: true, selectedColor: resolveColor(x.rating) };
    });


    return (
        <SafeAreaView style={{backgroundColor:"white"}}>
            <Calendar markedDates={markedDates} />
        </SafeAreaView>
       
    );
});