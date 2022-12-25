import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatScreen } from "../screens/Chat";
import { ChatConversation } from "../screens/ChatConversation";

const Stack = createNativeStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conversations"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Conversation" component={ChatConversation} />
    </Stack.Navigator>
  );
};
