import React from "react";
import { NavigationContainer }       from "@react-navigation/native";
import { createStackNavigator }      from "@react-navigation/stack";
import { createBottomTabNavigator }  from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen        from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import FavoritesScreen   from "../screens/FavoritesScreen";
import ProfileScreen     from "../screens/ProfileScreen";
import LoginScreen       from "../screens/LoginScreen";
import RegisterScreen    from "../screens/RegisterScreen";

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle:            { backgroundColor: "#000000", borderTopColor: "#1c1c1c" },
                tabBarActiveTintColor:  "#ffffff",
                tabBarInactiveTintColor:"#6e6e6e",
                tabBarIcon: ({ focused, color, size }) => {
                    const map = { Home: ["home","home-outline"], Favorites: ["heart","heart-outline"], Profile: ["person","person-outline"] };
                    return <Ionicons name={map[route.name][focused ? 0 : 1]} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home"      component={HomeScreen}      options={{ title: "Trang Chủ" }} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Yêu Thích" }} />
            <Tab.Screen name="Profile"   component={ProfileScreen}   options={{ title: "Cá Nhân"   }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle:      { backgroundColor: "#141414" },
                headerTintColor:  "#ffffff",
                headerTitleStyle: { fontWeight: "bold" },
                cardStyle:        { backgroundColor: "#0a0a0a" },
            }}>
                <Stack.Screen name="MainTabs"    component={MainTabs}          options={{ headerShown: false }} />
                <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: "Chi Tiết Phim" }} />
                <Stack.Screen name="Login"       component={LoginScreen}       options={{ title: "Đăng Nhập" }} />
                <Stack.Screen name="Register"    component={RegisterScreen}    options={{ title: "Đăng Ký" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}