/**
 * This file was generated from SearchableDropDown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue, ReferenceValue } from "mendix";

export interface SearchableDropDownProps<Style> {
    name: string;
    style: Style[];
    ValuetoSet: ReferenceValue;
    objectsDatasource: ListValue;
    displayAttribute: ListAttributeValue<string>;
    Onclick?: ActionValue;
    lab: string;
}

export interface SearchableDropDownPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    ValuetoSet: string;
    objectsDatasource: {} | { caption: string } | { type: string } | null;
    displayAttribute: string;
    Onclick: {} | null;
    lab: string;
}
