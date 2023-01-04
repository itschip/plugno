import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { fetchActiveJobs } from "@api/plugs-api";
import { TActiveJob } from "@typings/jobs";

export const ActiveJobs = () => {
  const navigation = useNavigation();
  // TODO: Move to rematch state
  const [activeJob, setActiveJob] = useState<TActiveJob | null>(null);

  useEffect(() => {
    fetchActiveJobs().then((data) => setActiveJob(data));
  }, []);

  // TODO: Eventually refactor to a FlatList, with dyanmic job page

  return (
    <SafeAreaView className="flex-1">
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl font-medium">Aktiv jobb</Text>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-lg font-medium">{activeJob?.title}</Text>
        <Text>{activeJob?.description}</Text>

        <View className="mt-4">
          <Text className="font-medium text-xl">Plug</Text>
          <View className="flex flex-row items-center space-x-2 mt-2">
            <Image
              source={{ uri: activeJob?.avatar }}
              className="h-10 w-10 rounded-full"
            />
            <Text className="text-lg font-medium underline">
              @{activeJob?.username}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
