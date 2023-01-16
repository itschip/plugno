import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/Auth/Login";
import { useEffect, useState } from "react";
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
import { API_URL } from "@utils/env";
import { User } from "@typings/user";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

const isUserLoggedIn = async (accessToken: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          return resolve(null);
        }

        return res.json();
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const refreshAccessToken = async (
  refreshToken: string
): Promise<{ access_token: string } | null> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/refresh`, {
      headers: {
        Authorization: `${refreshToken}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          resolve(null);
        }

        return res.json();
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

function Container() {
  const dispatch = useDispatch<Dispatch>();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await AsyncStorage.getItem("plug:access_token");
        const refreshToken = await AsyncStorage.getItem("plug:refresh_token");
        if (!accessToken || !refreshToken) {
          dispatch.auth.populate(null);
          setIsReady(true);
          return;
        }

        const user = await isUserLoggedIn(accessToken);

        if (!user) {
          // TODO: Try to refresh token and log user in
          const data = await refreshAccessToken(refreshToken);

          if (!data) {
            dispatch.auth.populate(null);
            setIsReady(true);
            return;
          }

          await AsyncStorage.setItem("plug:access_token", data.access_token);
          const user = await isUserLoggedIn(data.access_token);
          dispatch.auth.populate(user);
          setIsReady(true);
          return;
        }

        dispatch.auth.populate(user);
        setIsReady(true);
      } catch (err) {
        console.log("Error validating user", err);
        dispatch.auth.populate(null);
        setIsReady(true);
      }
    })();
  }, []);

  if (!isReady)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-extrabold text-3xl">Loading Plug.no...</Text>
      </View>
    );

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
    console.log("PUSH TOKEN:", token);
  }
};

const ScreensContainer = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
