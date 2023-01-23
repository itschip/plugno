import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActiveRequestScreen } from "@screens/requests/ActiveRequestScreen";
import { AcceptedJobsScreen } from "@screens/RequestsScreen";

const Stack = createNativeStackNavigator();

export const RequestsStack = () => {
  return (
    <Stack.Navigator initialRouteName="RequestList">
      <Stack.Screen
        name="RequestList"
        component={AcceptedJobsScreen}
        options={{ animation: "slide_from_bottom", headerShown: false }}
      />
      <Stack.Screen
        name="ActiveRequest"
        component={ActiveRequestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
