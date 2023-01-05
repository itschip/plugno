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
    <SafeAreaView className="flex-1 bg-black relative">
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"white"} />
        </TouchableOpacity>
        <Text className="text-2xl font-medium text-white">
          {activeJob?.title}
        </Text>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-neutral-100 text-lg">
          {activeJob?.description}
        </Text>

        <View className="mt-8 space-y-4">
          <View className="rounded-full h-8 w-8 bg-green-300 border border-green-300 flex items-center justify-center">
            <Ionicons name="checkmark-sharp" size={20} color="#166534" />
          </View>

          <View className="rounded-full h-8 w-8 bg-blue-300 border border-blue-300 flex items-center justify-center">
            <Ionicons name="sync-sharp" size={24} color="#1e40af" />
          </View>

          <View className="rounded-full h-8 w-8 bg-neutral-800 border border-neutral-800 flex items-center justify-center">
            <Ionicons name="checkmark-sharp" size={20} color="#d4d4d4" />
          </View>
        </View>
      </View>
      <View className="mt-4 absolute bottom-10 px-4">
        <Text className="font-medium text-xl text-white">Plug</Text>
        <View className="flex flex-row items-center space-x-2 mt-2">
          <Image
            source={{ uri: activeJob?.avatar }}
            className="h-10 w-10 rounded-full"
          />
          <Text className="text-lg font-medium underline text-white">
            @{activeJob?.username}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
