import { Image, Text } from "@rneui/base";
import { observer } from "mobx-react";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appStore } from "../AppStore";
import HighlightIngredients from "./HighlightIngredients";

export default observer(({ data }: { data: Product }) => {

    return (
        <View style={styles.container}>
            {data.image_url ? <View style={styles.imageWrapper}>
                <Image source={{ uri: data.image_url }} style={styles.image} />
            </View> : null}

            <View style={styles.detailsWrapper}>
                {data.product_name ? <View style={styles.infoLine}>
                    <Text><Text style={styles.bold}>Product name: </Text>{data.product_name}</Text>
                </View> : null}

                {data.brands ? <View style={styles.infoLine}>
                    <Text><Text style={styles.bold}>Brand: </Text>{data.brands}</Text>
                </View> : null}

                {data.ingredients_text ? <View style={{ ...styles.infoLine, ...styles.twoLines }}>
                    <Text style={styles.bold}>Ingredients: <HighlightIngredients ingredients={data.ingredients_text.replace(/_/gi, "")} highlightWords={appStore.allergies} /></Text>   
                </View> : null}

                {!data.ingredients_text ? <View style={{ ...styles.infoLine, ...styles.twoLines }}>
                    <Text style={styles.bold}>Ingredients: <Text>Missing ingredients data</Text></Text>   
                </View> : null}
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12
    },
    imageWrapper: {
        alignItems: 'center',
        marginVertical: 24
    },
    image: {
        width: "50%",
        aspectRatio: 1
    },
    detailsWrapper: {
        paddingBottom: 24,
    },
    infoLine: {
        flexDirection: "row",
        marginVertical: 2,
        flexWrap:"nowrap"
    },
    twoLines: {
        flexDirection: "column"
    },
    bold: {
        fontWeight: "bold"
    }
})