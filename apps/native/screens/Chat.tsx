import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ConversationScreenNavigationProp } from "@typings/navigation";
import { API_URL } from "@utils/env";
import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { axiosInstance } from "../lib/axios-instance";

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

  const { getToken } = useAuth();

  const handleGetConversations = async () => {
    const token = await getToken();
    axiosInstance
      .get<Conversation[]>("/conversations/getAll", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log("ERROR", JSON.stringify(err));
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetConversations();
    }, [])
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

const renderItem = ({ item }: { item: Conversation }) => <Item item={item} />;

const Item = ({ item }: { item: Conversation }) => {
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
