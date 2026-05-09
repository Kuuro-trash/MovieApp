import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider }  from "react-redux";
import store         from "./redux/index";
import AppNavigator  from "./routes/AppNavigator";

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar style="light" backgroundColor="#000000" />
            <AppNavigator />
        </Provider>
    );
}