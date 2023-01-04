import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreenNavigationProp } from "@typings/navigation";

export const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView className="bg-gray-100">
      <View className="px-2">
        <TouchableOpacity onPress={() => navigation.navigate("ActiveJobs")}>
          <Ionicons name="flash" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-4 justify-between px-2 mt-8">
        <View className="bg-black flex-2 h-48 w-[200px] rounded-lg relative">
          <Text className="absolute text-white font-bold bottom-2 right-4 text-3xl">
            Plugs
          </Text>
        </View>

        <View className="bg-gray-400 flex-2 h-48 w-[200px] rounded-lg relative">
          <ImageBackground
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            source={{
              uri: "https://media.istockphoto.com/id/1095330908/vector/city-street-map.jpg?s=612x612&w=0&k=20&c=pDt1LMofvdygE3IL2SUqLNPBwZcHXu744zirZ4DQXRo=",
            }}
          />
          <Text className="absolute text-gray-400 font-bold bottom-2 right-4 text-3xl">
            Map
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
