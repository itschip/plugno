import { SafeAreaView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView>
      <View className="mt-8 px-4 space-y-4">
        <View>
          <Text className="mb-2 text-gray-500 font-semibold">Brukernavn</Text>
          <View className="bg-white border border-gray-300 px-2 py-4 rounded-md">
            <Text className="font-semibold text-md">{user?.username}</Text>
          </View>
        </View>

        <View>
          <Text className="mb-2 text-gray-500 font-semibold">E-post</Text>
          <View className="bg-white border border-gray-300 px-2 py-4 rounded-md">
            <Text className="font-semibold text-md">{user?.email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
