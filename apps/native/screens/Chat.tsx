import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

type Conversation = {
  id: number;
  /**
   * JSON string of participants
   */
  conversationList: string;
  lastMessageId: number;
  createdAt: string;
};

export const ChatScreen = () => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:6001/conversations/getAll")
      .then((res) => res.json())
      .then((data) => {
        setConversations(data);
      });
  }, []);

  return (
    <SafeAreaView>
      <FlatList renderItem={renderItem} data={conversations} />
    </SafeAreaView>
  );
};

const renderItem = ({ item }: any) => <Item item={item} />;

const Item = ({ item }: { item: Conversation }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Conversation")}
      className="p-4 w-full border-b border-gray-300"
    >
      <Text className="font-semibold text-gray-600 text-lg">
        {item.conversationList}
      </Text>
    </TouchableOpacity>
  );
};
