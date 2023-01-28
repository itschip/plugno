import { useTranslation } from "react-i18next";
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Home = () => {
  const screenWidth = Dimensions.get("window").width;

  const numCols = 2;
  const tileSize = screenWidth / numCols - 25;

  const [t] = useTranslation();
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <SafeAreaView className="bg-white flex-1">
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
        <Text className="text-2xl font-bold">{t("HOME.FEATURED_PLUGS")}</Text>
        <ScrollView horizontal></ScrollView>
      </View>
    </SafeAreaView>
  );
};
