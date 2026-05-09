import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../redux/actions";

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user     = useSelector(s => s.user);

    if (!user) return (
        <View style={styles.center}>
            <Ionicons name="person-circle-outline" size={80} color="#2a2a2a" />
            <Text style={styles.emptyTitle}>Chưa đăng nhập</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );

    const initials = user.full_name
        ? user.full_name.split(" ").map(w => w[0]).slice(-2).join("").toUpperCase()
        : "?";

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
            { text: "Huỷ", style: "cancel" },
            { text: "Đăng xuất", style: "destructive", onPress: () => dispatch(logout()) },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
            <Text style={styles.name}>{user.full_name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.menu}>
                {[
                    { icon: "heart-outline",  label: "Phim yêu thích",    onPress: () => navigation.navigate("Favorites") },
                    { icon: "time-outline",   label: "Lịch sử xem",       onPress: () => Alert.alert("Sprint 3") },
                    { icon: "person-outline", label: "Chỉnh sửa hồ sơ",  onPress: () => Alert.alert("Sprint 3") },
                ].map(item => (
                    <TouchableOpacity key={item.label} style={styles.menuItem} onPress={item.onPress}>
                        <Ionicons name={item.icon} size={20} color="#b3b3b3" />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <Ionicons name="chevron-forward-outline" size={16} color="#555" />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#e50914" style={{ marginRight: 8 }} />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:    { flex: 1, backgroundColor: "#0a0a0a", alignItems: "center", paddingTop: 40 },
    center:       { flex: 1, backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" },
    avatar:       { width: 80, height: 80, borderRadius: 40, backgroundColor: "#e50914", justifyContent: "center", alignItems: "center", marginBottom: 12 },
    avatarText:   { color: "#fff", fontSize: 28, fontWeight: "bold" },
    name:         { color: "#fff", fontSize: 20, fontWeight: "bold" },
    email:        { color: "#b3b3b3", fontSize: 14, marginBottom: 32 },
    menu:         { width: "100%", borderTopWidth: 1, borderColor: "#2a2a2a" },
    menuItem:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderColor: "#2a2a2a", gap: 12 },
    menuLabel:    { flex: 1, color: "#fff", fontSize: 15 },
    logoutBtn:    { flexDirection: "row", alignItems: "center", marginTop: 32, paddingVertical: 12, paddingHorizontal: 24, borderWidth: 1, borderColor: "#e50914", borderRadius: 8 },
    logoutText:   { color: "#e50914", fontSize: 15, fontWeight: "bold" },
    emptyTitle:   { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 16 },
    loginBtn:     { marginTop: 20, backgroundColor: "#e50914", borderRadius: 8, paddingHorizontal: 28, paddingVertical: 12 },
    loginBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});

export default ProfileScreen;