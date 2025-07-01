import { createElement, useEffect, useState } from "react";
import { Text, TextStyle, View, ViewStyle, StyleSheet } from "react-native";
import Big from "big.js";
import { Style } from "@mendix/pluggable-widgets-tools";
import { NativeTimerProps } from "../typings/NativeTimerProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

function toNumberSafe(val: unknown): number {
    if (typeof val === "object" && val !== null && "toNumber" in val) {
        try {
            return (val as Big).toNumber();
        } catch {
            return 0;
        }
    }
    return typeof val === "number" ? val : 0;
}

export function NativeTimer(props: NativeTimerProps<ViewStyle>) {
    const initialSeconds = toNumberSafe(props.duration?.value);
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
     

    useEffect(() => {
        setSecondsLeft(initialSeconds);
        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (props.OnTimerEnd && props.OnTimerEnd.canExecute && !props.OnTimerEnd.isExecuting) {
                        props.OnTimerEnd.execute(); // ✅ Ensure this runs as soon as value reaches 0
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [initialSeconds]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return createElement(
        View,
        { style: [styles.container, ...(props.style ?? [])] },
        createElement(Text, { style: styles.timerText }, formattedTime)
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    timerText: {
        fontSize: 32,
        fontWeight: "bold"
    }
});
