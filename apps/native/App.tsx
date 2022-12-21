import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { LoginScreen } from "./screens/Auth/Login";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { Home } from "./screens/Home";

const Stack = createNativeStackNavigator();

function Container() {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    (async () => {
      const id_token = await AsyncStorage.getItem("id_token");

      fetch("http://localhost:6001/user", {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("user", data);
        })
        .catch((err) => console.log(`Error when getting user. Error: ${err}`));
    })();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTintColor: "black", headerTransparent: true }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTintColor: "black", headerTransparent: true }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
