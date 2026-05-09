import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tag = ({ label, color = "#e50914" }) => (
    <View style={[styles.tag, { borderColor: color }]}>
        <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    tag:  { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start", marginRight: 6, marginBottom: 6 },
    text: { fontSize: 11, fontWeight: "bold" },
});

export default Tag;