import { Text, SafeAreaView, View, Dimensions } from "react-native";

export const Home = () => {
  const screenWidth = Dimensions.get("window").width;

  const numCols = 2;
  const tileSize = screenWidth / numCols - 15;

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex flex-row justify-center items-center mt-8 space-x-4">
        <View
          style={{ width: tileSize }}
          className="bg-black h-48 rounded-lg relative"
        >
          <Text className="absolute text-white font-bold bottom-2 right-4 text-3xl">
            Plugs
          </Text>
        </View>

        <View
          style={{ width: tileSize }}
          className="bg-gray-400 h-48 rounded-lg relative"
        >
          <Text className="absolute text-gray-400 font-bold bottom-2 right-4 text-3xl">
            Map
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
