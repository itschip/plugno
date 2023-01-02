import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ActiveJobs = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="px-2">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
