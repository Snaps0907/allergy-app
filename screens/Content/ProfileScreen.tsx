import { observer } from "mobx-react";
import React from "react";
import { ScrollView } from "react-native";
import AllergiesManagement from "../../components/AllergiesManagement";

export default observer(() => {
    return (
        <ScrollView>
            <AllergiesManagement />
        </ScrollView>
    );
});