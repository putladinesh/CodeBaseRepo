import {  createElement } from "react";
import { TextStyle,  Image, StyleSheet, View, Dimensions, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";


import { EncodedImageViewerProps } from "../typings/EncodedImageViewerProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function EncodedImageViewer(props: EncodedImageViewerProps<ViewStyle>): JSX.Element {
    const { EnocdedString, imgheight, imgwidth } = props;

    if (!EnocdedString?.value) {
        return <View style={styles.placeholder} />;
    }

    const screen = Dimensions.get("window");
    const width = (imgwidth / 100) * screen.width;
    const height = (imgheight / 100) * screen.height;

    const base64Image = `data:image/png;base64,${EnocdedString.value}`;

    return (
        <Image
            source={{ uri: base64Image }}
            style={{ width, height, resizeMode: "contain" }}
        />
    );
}

const styles = StyleSheet.create({
    placeholder: {
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 100
    }
});
