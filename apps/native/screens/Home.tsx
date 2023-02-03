import { useAuth } from "@clerk/clerk-expo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TConversation } from "@typings/conversations";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ChatBubbleIcon } from "../icons/ChatBubbleIcon";
import { axiosInstance } from "../lib/axios-instance";
import { Dispatch, RootState } from "../store";

export const Home = () => {
  const screenWidth = Dimensions.get("window").width;

  const numCols = 2;
  const tileSize = screenWidth / numCols - 25;

  const [t] = useTranslation();
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch<Dispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversations.conversations
  );

  const { getToken } = useAuth();
  const navigation = useNavigation();

  const handleGetConversations = async () => {
    const token = await getToken();
    axiosInstance
      .get<TConversation[]>("/conversations/getAll", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        dispatch.conversations.populateConversations(res.data);
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
    <SafeAreaView className="bg-main flex-1">
      {role === "plug" && (
        <View className="px-4 mt-2 flex">
          <TextInput
            placeholder="Søk på jobber..."
            className="bg-white shadow-sm border border border-gray-200 px-3 py-3 rounded-md text-[16px] font-medium"
          />
        </View>
      )}
      <View className="flex flex-row justify-center items-center mt-6 space-x-4">
        <View
          style={{ width: tileSize }}
          className="bg-black h-48 rounded-lg relative"
        >
          <Text className="absolute text-white font-bold bottom-2 right-2 text-2xl">
            {t("HOME.FIND_A_PLUG")}
          </Text>
        </View>

        <View
          style={{ width: tileSize }}
          className="bg-gray-400 h-48 rounded-lg relative"
        >
          <Text className="absolute text-gray-100 font-bold bottom-2 right-2 text-2xl">
            {t("HOME.ASK_FOR_HELP")}
          </Text>
        </View>
      </View>
      <View className="px-4 mt-4">
        <View className="flex flex-row items-center justify-start gap-2">
          <ChatBubbleIcon className="w-6 h-6 text-slate-500" />
          <Text className="text-lg text-slate-500 font-main mr-4">
            {t("HOME.RECENT_MESSAGES")}
          </Text>
          <Text className="text-purple-800 font-main">Show all</Text>
        </View>
        <View className="py-2 rounded-md bg-white shadow-xs border border-gray-200 mt-2">
          {conversations.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Conversation", { id: item.id })
              }
              className="p-1 px-4 w-full"
            >
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row justify-start space-x-4 items-center">
                  <Image
                    source={{ uri: item.avatar }}
                    className="h-8 w-8 rounded-full"
                  />
                  <Text className="font-medium text-slate-500 text-md">
                    {item.username}
                  </Text>
                </View>
                <View>
                  <Text className="text-purple-800 font-medium text-md">
                    {item.jobTitle}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="px-4 mt-4">
        <View className="flex flex-row items-center justify-start gap-2">
          <ChatBubbleIcon className="w-6 h-6 text-slate-500" />
          <Text className="text-lg text-slate-500 font-main mr-4">
            {t("HOME.RECENT_JOBS")}
          </Text>
          <Text className="text-purple-800 font-main">Show all</Text>
        </View>
        <View className="h-32 bg-white border border-gray-200 rounded-xs rounded-md mt-2"></View>
      </View>
    </SafeAreaView>
  );
};
