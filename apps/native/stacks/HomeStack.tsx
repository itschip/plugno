import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActiveJobs } from "../screens/ActiveJobs";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Hero"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ animation: "slide_from_bottom", headerShown: false }}
        name="ActiveJobs"
        component={ActiveJobs}
      />
    </Stack.Navigator>
  );
};
