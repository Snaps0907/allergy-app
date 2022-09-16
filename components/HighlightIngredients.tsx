import React from "react";
import { View,Text } from "react-native";
import Highlighter from 'react-native-highlight-words';

interface IHighlightIngredientsProps {
    ingredients: string;
    highlightWords: string[]
}

export default function HighlightIngredients(props: IHighlightIngredientsProps) {
    return <Text style={{fontWeight:"normal"}}>
        <Highlighter textToHighlight={props.ingredients.replace("_", "")} searchWords={props.highlightWords} highlightStyle={{ color: "red", fontWeight: "bold" }} />
    </Text>;
}