import { Text, SafeAreaView, View } from "react-native";

export const Home = () => {
  return (
    <SafeAreaView className="bg-gray-100">
      <View className="flex-row flex-4 justify-between px-2 mt-8">
        <View className="bg-black flex-2 h-48 w-[200px] rounded-lg relative">
          <Text className="absolute text-white font-bold bottom-2 right-4 text-3xl">
            Plugs
          </Text>
        </View>

        <View className="bg-gray-400 flex-2 h-48 w-[200px] rounded-lg relative">
          <Text className="absolute text-white font-bold bottom-2 right-4 text-3xl">
            Map
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
