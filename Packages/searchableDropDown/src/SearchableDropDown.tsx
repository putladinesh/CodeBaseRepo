import { createElement, useState, useEffect } from "react";

import { View, TextStyle, ViewStyle, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { SearchableDropDownProps } from "../typings/SearchableDropDownProps";

import { ObjectItem } from "mendix";


// interface DisplayItem {
//     id: string;
//     displayValue: string;
//     object: ObjectItem;
// }

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}



export function SearchableDropDown(props: SearchableDropDownProps<ViewStyle>) {
    const [searchText, setSearchText] = useState("");
    const [selectedText , setSelectedText]=useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        if (props.ValuetoSet?.value && props.displayAttribute) {
            const value = props.displayAttribute.get(props.ValuetoSet.value)?.value;
            if (value) setSelectedText(value);
        }
    }, [props.ValuetoSet?.value]);


     const filteredOptions = props.objectsDatasource?.items?.filter(item => {
        const label = props.displayAttribute.get(item)?.value ?? "";
        return label.toLowerCase().includes(searchText.toLowerCase());
    }) ?? [];



    const handleSelect = (item: ObjectItem) => {
        try {
            if (props.ValuetoSet?.setValue) {
                props.ValuetoSet.setValue(item);
               props.Onclick?.execute();
               setSelectedText(props.displayAttribute.get(item)?.value ?? "Unnamed")
            }
           // const selected = props.displayAttribute.get(item)?.value ?? "Unnamed";
            setSearchText("");
            setIsDropdownVisible(false);
            if (!item) {
              
            }
        } catch (error) {
           
        }
    };

    const toggleDropdown = (): void => {
         setIsDropdownVisible(prev => !prev);
    };

     const handleClear = (): void => {
        setSearchText("");
        props.ValuetoSet?.setValue(undefined);
    };

    return (
    <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown}>
                <View style={styles.input}>
                    <Text style={styles.inputText}>
                        {selectedText || "Select..."}
                    </Text>
                    <View style={styles.icons}>
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={handleClear}>
                                <Text style={styles.clearText}>✖️</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.chevron}>{isDropdownVisible ? "▲" : "▼"}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder="Search..."
                        value={searchText}
                        onChangeText={setSearchText}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <FlatList
                        data={filteredOptions}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                             const label = props.displayAttribute.get(item)?.value ?? "Unnamed";
                             return (
                                <TouchableOpacity
                                    onPress={() => handleSelect(item)}
                                    style={[
                                        styles.item,
                                        props.ValuetoSet?.value?.id === item.id ? styles.selectedItem : null
                                    ]}
                                >
                                    <Text style={styles.itemText}>{label}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        ListEmptyComponent={
                            <Text style={styles.noResults}>No results found</Text>
                        }
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            )}
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
        minHeight: 60,
        position: "relative",     // Makes absolute positioning relative to this
        zIndex: 1
    },
    input: {
        minHeight: 48,
        minWidth:48,
        borderColor: "#cdcdcd",
        borderWidth: 1,
        paddingHorizontal: 8,
        rippleColr:"#f3f3f3",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputText: {
        fontSize: 16,
        color: "#333",
        flex: 1
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        gap: 8
    },
    chevron: {
        fontSize: 16,
        color: "#666",
        marginLeft: 6
    },
    clearText: {
        fontSize: 16,
        color: "black",
        marginRight: 6
    },
    dropdown: {
        position: "absolute",      // This makes it float over others
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 250,
        zIndex: 999,               // Makes sure it stacks above others
        elevation: 5,              // For Android shadow
        width: "100%"  ,
        bottom : 0            // Match parent width
    },
    searchBox: {
        height: 40,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingHorizontal: 10
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomColor: "#eee",
        borderBottomWidth: 1
    },
    selectedItem: {
        backgroundColor: "#e6f2ff"
    },
    itemText: {
        fontSize: 16
    },
    noResults: {
        padding: 10,
        fontStyle: "italic",
        color: "gray"
    }
});