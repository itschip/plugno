import { useNavigation } from "@react-navigation/native";
import { TConversation } from "@typings/conversations";
import { ConversationScreenNavigationProp } from "@typings/navigation";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ChatScreen = () => {
  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );

  return (
    <SafeAreaView className="bg-black flex-1">
      <View className="px-4">
        <Text className="text-white text-3xl font-extrabold">Chat</Text>
      </View>
      <FlatList renderItem={renderItem} data={conversations} className="mt-2" />
    </SafeAreaView>
  );
};

const renderItem = ({ item }: { item: TConversation }) => <Item item={item} />;

const Item = ({ item }: { item: TConversation }) => {
  const navigation = useNavigation<ConversationScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Conversation", { id: item.id })}
      className="p-4 w-full border-b border-neutral-600"
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start space-x-4 items-center">
          <Image
            source={{ uri: item.avatar }}
            className="h-12 w-12 rounded-full"
          />
          <Text className="font-medium text-white text-xl">
            {item.username}
          </Text>
        </View>
        <View>
          <Text className="text-white text-lg">{item.jobTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
