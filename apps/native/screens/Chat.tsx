import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

type Conversation = {
  id: number;
  lastMessageId: number;
  createdAt: string;
  username: string;
  avatar: string;
  jobId: string;
  jobTitle: string;
};

export const ChatScreen = () => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      fetch("http://localhost:6001/conversations/getAll")
        .then((res) => res.json())
        .then((data) => {
          setConversations(data);
        });
    }, [])
  );

  return (
    <SafeAreaView>
      <FlatList renderItem={renderItem} data={conversations} />
    </SafeAreaView>
  );
};

const renderItem = ({ item }: { item: Conversation }) => <Item item={item} />;

const Item = ({ item }: { item: Conversation }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Conversation")}
      className="p-4 w-full border-b border-gray-300 flex "
    >
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start space-x-4 items-center">
          <Image
            source={{ uri: item.avatar }}
            className="h-10 w-10 rounded-full"
          />
          <Text className="font-medium text-black text-xl">
            {item.username}
          </Text>
        </View>
        <View>
          <Text>{item.jobTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
