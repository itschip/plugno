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
import { API_URL, CLERK_PUBLISHABLE_KEY } from "@utils/env";
import { User } from "@typings/user";
import { Text, TextInput, View, SafeAreaView } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@utils/cache";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

function Container() {
  return (
    <>
      <NavigationContainer>
        <ScreensContainer />
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
  const { role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <ClerkProvider
      publishableKey="pk_test_cG9saXNoZWQtZ29iYmxlci03OS5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
    >
      <SignedOut>
        <Stack.Navigator initialRouteName="Login">
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
      </SignedOut>
      <SignedIn>
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
      </SignedIn>
    </ClerkProvider>
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
