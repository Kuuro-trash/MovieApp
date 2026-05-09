import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingSpinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#e50914" />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" },
});

export default LoadingSpinner;