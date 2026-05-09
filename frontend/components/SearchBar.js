import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ placeholder, value, onChangeText }) => (
    <View style={styles.container}>
        <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 8 }} />
        <TextInput
            style={styles.input}
            placeholder={placeholder || "Tìm kiếm phim..."}
            placeholderTextColor="#555"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", backgroundColor: "#1c1c1c", borderRadius: 8, borderWidth: 1, borderColor: "#2a2a2a", paddingHorizontal: 12, marginHorizontal: 16, marginVertical: 10, height: 44 },
    input:     { flex: 1, fontSize: 15, color: "#ffffff" },
});

export default SearchBar;