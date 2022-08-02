import { Image, Text } from "@rneui/base";
import { observer } from "mobx-react";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { appStore } from "../AppStore";
import HighlightIngredients from "./HighlightIngredients";

export default observer(({ data }: { data: Product }) => {
    return (
        <ScrollView style={styles.container}>
            {data.image_url && <View style={styles.imageWrapper}>
                <Image source={{ uri: data.image_url }} style={styles.image} />
            </View>}

            <View style={styles.detailsWrapper}>
                {data.product_name && <View style={styles.infoLine}>
                    <Text style={styles.bold}>Product name: </Text>
                    <Text>{data.product_name}</Text>
                </View>}

                {data.brands && <View style={styles.infoLine}>
                    <Text style={styles.bold}>Brand: </Text>
                    <Text>{data.brands}</Text>
                </View>}

                {data.ingredients_text && <View style={{ ...styles.infoLine, ...styles.twoLines }}>
                    <Text style={styles.bold}>Ingredients: </Text>
                    <HighlightIngredients ingredients={data.ingredients_text} highlightWords={appStore.allergies} />
                </View>}

                {!data.ingredients_text && <View style={{ ...styles.infoLine, ...styles.twoLines }}>
                    <Text style={styles.bold}>Ingredients: </Text>
                    <Text>Missing ingredients data</Text>
                </View>}
            </View>
        </ScrollView>
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
        flex: 1,
        paddingBottom: 24
    },
    infoLine: {
        flexDirection: "row",
        marginVertical: 2
    },
    twoLines: {
        flexDirection: "column"
    },
    bold: {
        fontWeight: "bold"
    }
})