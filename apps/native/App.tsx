import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/Auth/Login";
import { useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState, store } from "./store";
import { Home } from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./screens/Profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Plugs } from "./screens/Plugs";
import { Text, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Container() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<Dispatch>();

  console.log("FUCK YOU", user);

  useLayoutEffect(() => {
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
          dispatch.auth.populate(data);
        })
        .catch((err) => {
          console.log(`Error when getting user. Error: ${err}`);
          dispatch.auth.populate(null);
        });
    })();
  }, []);

  return (
    <>
      {/*<View className="absolute bottom-24 rounded-md right-4 left-4 z-[999999] bg-white shadow-sm px-2 py-4 px-4 flex justify-between flex-row items-center">
        <View>
          <Text className="font-semibold">Plug is on the way</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Feather name="map-pin" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>*/}
      <NavigationContainer>
        {!user ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerTintColor: "black", headerTransparent: true }}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                  <Feather
                    name="home"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Plugs"
              component={Plugs}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="flash"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                  <Feather
                    name="user"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
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
