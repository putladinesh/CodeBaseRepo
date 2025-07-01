/**
 * This file was generated from NativeTimer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface NativeTimerProps<Style> {
    name: string;
    style: Style[];
    duration: EditableValue<Big>;
    OnTimerEnd?: ActionValue;
}

export interface NativeTimerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    duration: string;
    OnTimerEnd: {} | null;
}
