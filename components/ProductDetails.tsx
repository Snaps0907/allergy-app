import { Image, Text } from "@rneui/base";
import { observer } from "mobx-react";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appStore } from "../AppStore";
import HighlightIngredients from "./HighlightIngredients";

export default observer(({ data }: { data: Product }) => {
    const checkIfContainsExcludedAllergens = () => {
        const ingredients = data.ingredients_text?.replace(/_/gi, "");

        if (!ingredients) return false;

        for (const allergen of appStore.allergies) {
            if (ingredients.includes(allergen.toLocaleLowerCase())) return true;
        }

        return false;
    }

    const hasExcludedAllergens = checkIfContainsExcludedAllergens();

    return (
        <View style={styles.container}>
            {data.image_url ? <View style={styles.imageWrapper}>
                {hasExcludedAllergens ? <Text style={styles.warning}>!</Text> : null}
                <Image source={{ uri: data.image_url }} style={hasExcludedAllergens ? styles.imageWarning : styles.image} />
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
        paddingHorizontal: 12,
        width: "100%",
        alignItems: "center"
    },
    warning: {
        width: 24,
        height: 24,
        backgroundColor: "red",
        color: "white",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 20,
        position: "absolute",
        right: -12,
        top: -12,
        zIndex: 100
    },
    imageWrapper: {
        alignItems: 'center',
        marginVertical: 24,
        width: "50%",
        position: "relative",
        backgroundColor: "blue"
    },
    image: {
        width: "100%",
        aspectRatio: 1
    },
    imageWarning: {
        width: "100%",
        aspectRatio: 1,
        borderWidth: 5,
        borderColor: "red"
    },
    detailsWrapper: {
        paddingBottom: 24,
    },
    infoLine: {
        flexDirection: "row",
        marginVertical: 2,
        flexWrap: "nowrap"
    },
    twoLines: {
        flexDirection: "column"
    },
    bold: {
        fontWeight: "bold"
    }
})