import { configureStore } from "@reduxjs/toolkit";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import Fetch from "./Fetch";
import  useReducer  from "./Redux/user";
const store = configureStore({
  reducer: {
    user: useReducer,
  },
});
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Fetch />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
