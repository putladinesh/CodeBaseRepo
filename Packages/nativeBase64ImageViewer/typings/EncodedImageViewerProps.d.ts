/**
 * This file was generated from EncodedImageViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export interface EncodedImageViewerProps<Style> {
    name: string;
    style: Style[];
    EnocdedString: EditableValue<string>;
    imgheight: number;
    imgwidth: number;
}

export interface EncodedImageViewerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    EnocdedString: string;
    imgheight: number | null;
    imgwidth: number | null;
}
