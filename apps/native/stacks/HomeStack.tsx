import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Text } from "react-native";
import { Home } from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "@typings/navigation";
import { RequestsStack } from "./RequestStack";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Hero"
        component={Home}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <View className="flex flex-row space-x-2 items-center">
              <View className="relative inline-block">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Requests")}
                >
                  <Ionicons name="flash" size={30} color="black" />
                </TouchableOpacity>
                <View className="absolute top-0 left-1 block h-1.5 w-1.5 rounded-full bg-purple-500 ring-2 ring-rose-400" />
              </View>
              <View className="bg-green-200 px-3 py-1 rounded-full">
                <Text className="font-medium text-[#166534]">Active</Text>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Requests"
        component={RequestsStack}
        options={{ animation: "slide_from_bottom", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
