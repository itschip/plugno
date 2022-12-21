import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { LoginScreen } from "./screens/Auth/Login";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-900">
      <Text className="text-white">Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    (async () => {
      const id_token = await AsyncStorage.getItem("id_token");

      console.log("token from storage", id_token);

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
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTintColor: "white", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
