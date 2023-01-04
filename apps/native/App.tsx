import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/Auth/Login";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState, store } from "./store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./screens/Profile";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Plugs } from "./screens/Plugs";
import { TouchableOpacity } from "react-native";
import { ChatStack } from "./stacks/ChatStack";
import { RequestScreen } from "./screens/Request";
import { TrackingProvider } from "./providers/TrackingProvider";
import { HomeStack } from "./stacks/HomeStack";
import { RootStackParamList } from "@typings/navigation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();

function Container() {
  const dispatch = useDispatch<Dispatch>();

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
      <NavigationContainer>
        <TrackingProvider>
          <ScreensContainer />
        </TrackingProvider>
      </NavigationContainer>
    </>
  );
}

const ScreensContainer = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  return (
    <>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTintColor: "black", headerTransparent: true }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShadowVisible: false,
            tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarShowLabel: false,
              headerRight: () => (
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => navigation.navigate("Chat")}
                >
                  <Ionicons name="chatbox-outline" size={24} color={"black"} />
                </TouchableOpacity>
              ),
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="home"
                  size={24}
                  color={focused ? "white" : "gray"}
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
                  color={focused ? "white" : "gray"}
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
                    color={focused ? "white" : "gray"}
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
                  color={focused ? "white" : "gray"}
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
                  color={focused ? "white" : "gray"}
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
