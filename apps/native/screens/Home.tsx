import { useTranslation } from "react-i18next";
import { Text, SafeAreaView, View, Dimensions, ScrollView } from "react-native";

export const Home = () => {
  const screenWidth = Dimensions.get("window").width;

  const numCols = 2;
  const tileSize = screenWidth / numCols - 15;

  const [t] = useTranslation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex flex-row justify-center items-center mt-8 space-x-4">
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
      <View className="px-2 mt-4">
        <Text className="text-2xl font-bold">{t("HOME.FEATURED_PLUGS")}</Text>
        <ScrollView horizontal></ScrollView>
      </View>
    </SafeAreaView>
  );
};
