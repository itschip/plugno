import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { fetchActiveJobs } from "@api/plugs-api";
import { TActiveJob } from "@typings/jobs";

export const ActiveJobs = () => {
  const navigation = useNavigation();
  // TODO: Move to rematch state
  const [activeJob, setActiveJob] = useState<TActiveJob | null>(null);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchActiveJobs().then((data) => setActiveJob(data));
  }, []);

  // TODO: Eventually refactor to a FlatList, with dyanmic job page
  //
  //
  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    anim.start();

    return () => {
      anim.reset();
      anim.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl font-medium text-black">
          {activeJob?.title}
        </Text>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-gray-500 text-lg">{activeJob?.description}</Text>

        <View className="mt-8 space-y-4">
          <View className="flex flex-row justify-start items-center space-x-4">
            <View className="rounded-full h-8 w-8 bg-green-100 border border-green-100 flex items-center justify-center">
              <Ionicons name="checkmark-sharp" size={20} color="#166534" />
            </View>
            <Text className="text-gray-600 text-[16px] font-semibold">
              @{activeJob?.username} har godtatt jobben.
            </Text>
          </View>

          <View className="flex flex-row justify-start items-center space-x-4">
            <View className="rounded-full h-8 w-8 bg-indigo-100 border border-indigo-100 flex items-center justify-center">
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons name="sync-sharp" size={24} color="#3730a3" />
              </Animated.View>
            </View>
            <Text className="text-gray-600 text-[16px] font-semibold">
              Plugen er på vei.
            </Text>
          </View>

          <View className="flex flex-row justify-start items-center space-x-4">
            <View className="rounded-full h-8 w-8 bg-gray-100 border border-gray-100 flex items-center justify-center">
              <Ionicons name="checkmark-sharp" size={20} color="#1f2937" />
            </View>
            <Text className="text-gray-600 text-[16px]">Jobb utført.</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 absolute bottom-10 px-4 left-0 right-0">
        <Text className="font-medium text-xl text-black">Plug</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex flex-row items-center space-x-2 mt-2">
            <Image
              source={{ uri: activeJob?.avatar }}
              className="h-10 w-10 rounded-full"
            />
            <Text className="text-lg font-medium underline text-gray-500">
              @{activeJob?.username}
            </Text>
          </View>

          <TouchableOpacity className="bg-rose-100 h-10 w-10 flex items-center justify-center rounded-lg">
            <Ionicons name="chatbubble" color="#9f1239" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
