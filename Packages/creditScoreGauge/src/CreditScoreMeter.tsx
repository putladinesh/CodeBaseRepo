import { createElement } from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Svg, Path, Circle, G } from "react-native-svg";
import Big from "big.js";

import { CreditScoreMeterProps } from "../typings/CreditScoreMeterProps";
import { Style } from "@mendix/pluggable-widgets-tools";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians)
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

function getNumericScore(val: unknown): number | null {
    if (typeof val === "object" && val !== null && "toNumber" in val) {
        try {
            return (val as Big).toNumber();
        } catch {
            return 0;
        }
    }
    return typeof val === "number" ? val : 0;
}



export function CreditScoreMeter(props: CreditScoreMeterProps<ViewStyle>) {
    const numericScore = getNumericScore(props.score?.value);

    if (numericScore === null || props.score === null || numericScore < 300 || numericScore > 900) {
        return (
            <View style={styles.container}>
                <Text style={styles.invalid}>Invalid or Missing Score</Text>
            </View>
        );
    }

    // Corrected dot direction: 300 = left (-90deg), 900 = right (90deg)
    const percent = (numericScore - 300) / 600; // Normalize to 0–1
    const angleDeg = -90 + percent * 180; // -90 to +90
    const angleRad = angleDeg * (Math.PI / 180); // in radians
    //const angle = (-100 + percent * 200) * (Math.PI / 180); // -90 to +90 degrees
    const rotationAngle = angleRad - Math.PI / 2;


    const radius = 85;
    const centerX = 125;
    const centerY = 125;
    // Calculate dot position
    // const dotAngle = angle - Math.PI / 2;
    const dotX = centerX + radius * Math.cos(rotationAngle);
    const dotY = centerY + radius * Math.sin(rotationAngle);



    // Needle shape: a diamond or clock-tick shaped triangle
    const needleLength = 80;
    const needleWidth = 6;

    const tipX = centerX + needleLength * Math.cos(rotationAngle);
    const tipY = centerY + needleLength * Math.sin(rotationAngle);
    const baseLeftX = centerX + needleWidth * Math.cos(rotationAngle + Math.PI / 2);
    const baseLeftY = centerY + needleWidth * Math.sin(rotationAngle + Math.PI / 2);
    const baseRightX = centerX + needleWidth * Math.cos(rotationAngle - Math.PI / 2);
    const baseRightY = centerY + needleWidth * Math.sin(rotationAngle - Math.PI / 2);

    const needlePath = `
        M ${baseLeftX},${baseLeftY}
        L ${tipX},${tipY}
        L ${baseRightX},${baseRightY}
        L ${centerX},${centerY}
        Z
    `;


    return (
        <View style={styles.container}>
            <Svg width="250" height="140">
                <G rotation="0" origin="125,125">
                    {/* Segment 1 - Red (300 to 599) */}
                    {/* <Path
                        d="M40,125 A85,85 0 0,1 125,40"
                        stroke="#e57373"
                        strokeWidth={10}
                        fill="none"
                    /> */}
                    {/* Segment 2 - Yellow (600 to 749) */}
                    {/* <Path
                        d="M125,40 A85,85 0 0,1 210,80"
                        stroke="#fdd835"
                        strokeWidth={10}
                        fill="none"
                    /> */}
                    {/* Segment 3 - Green (750 to 900) */}
                    {/* <Path
                        d="M210,80 A85,85 0 0,1 210,170"
                        stroke="#81c784"
                        strokeWidth={10}
                        fill="none"
                    /> */}
                    {/* <Path
                        d={describeArc(125, 125, 85, -90, -15)} // Red
                        stroke="#e57373"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, -15, 35)} // Yellow
                        stroke="#fdd835"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, 35, 90)} // Green
                        stroke="#81c784"
                        strokeWidth={10}
                        fill="none"
                    /> */}
                    <Path
                        d={describeArc(125, 125, 85, -90, 24)} // 300–680
                        stroke="#e57373"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, 24, 39)} // 681–730
                        stroke="#f48fb1"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, 39, 51)} // 731–770
                        stroke="#ffb74d"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, 51, 57)} // 771–790
                        stroke="#aed581"
                        strokeWidth={10}
                        fill="none"
                    />
                    <Path
                        d={describeArc(125, 125, 85, 57, 90)} // 791–900
                        stroke="#388e3c"
                        strokeWidth={10}
                        fill="none"
                    />

                </G>

                {/* Needle Line from center to dot */}
                {/* Needle */}
                <Path d={needlePath} fill="black" />

                {/* Dot Marker */}
                <Circle cx={dotX} cy={dotY} r={6} fill="black" />
            </Svg>

            <View style={styles.labels}>
                <Text style={styles.score}>{numericScore}</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 200,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff"
    },
    labels: {
        alignItems: "center",
        marginTop: -20
    },
    date: {
        fontSize: 14,
        color: "#666"
    },
    score: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#222"
    },
    invalid: {
        fontSize: 16,
        color: "red",
        padding: 10,
        textAlign: "center"
    }
});