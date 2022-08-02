import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IHighlightIngredientsProps {
    ingredients: string;
    highlightWords: string[]
}

export default function HighlightIngredients(props: IHighlightIngredientsProps) {
    const display: React.ReactNode[] = [];

    const ingredients = props.ingredients.split(',').map(x => x.replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase());
    ingredients.map(ingredient => {
        if (props.highlightWords.some(x => ingredient.includes(x))) {
            display.push(<Text style={styles.highlighted} key={ingredient}>{ingredient}</Text>);
        } else {
            display.push(<Text key={ingredient}>{ingredient}</Text>);
        }
    });

    return <View>
        {display.map(x => x)}
    </View>;
}

const styles = StyleSheet.create({
    highlighted: {
        color: "red",
        fontWeight: "bold"
    }
});