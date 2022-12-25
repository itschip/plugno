import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

type Conversation = {
  id: number;
  name: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Chip",
  },
  {
    id: 2,
    name: "Chippy",
  },
];

export const ChatScreen = () => {
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
      <Text className="font-semibold text-gray-600 text-lg">{item.name}</Text>
    </TouchableOpacity>
  );
};
