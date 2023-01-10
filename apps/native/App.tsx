import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/Auth/Login";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState, store } from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./screens/Profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Plugs } from "./screens/Plugs";
import { ChatStack } from "./stacks/ChatStack";
import { RequestScreen } from "./screens/Request";
import { TrackingProvider } from "./providers/TrackingProvider";
import { HomeStack } from "./stacks/HomeStack";
import { RootStackParamList } from "@typings/navigation";
import { RegisterScreen } from "./screens/Auth/Register";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

function Container() {
  const dispatch = useDispatch<Dispatch>();

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
      <NavigationContainer>
        <TrackingProvider>
          <ScreensContainer />
        </TrackingProvider>
      </NavigationContainer>
    </>
  );
}

const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
};

const ScreensContainer = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync();
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTintColor: "white", headerTransparent: true }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShadowVisible: false,
            tabBarStyle: { backgroundColor: "white", borderTopWidth: 0 },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
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
          {role === "user" && (
            <Tab.Screen
              name="Request"
              component={RequestScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                  <Feather
                    name="plus-circle"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
              }}
            />
          )}
          <Tab.Screen
            name="Chat"
            component={ChatStack}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="chatbox-outline"
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
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
