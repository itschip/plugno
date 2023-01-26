import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const UserDetails = () => {
  const [t] = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View className="mt-8 px-4 space-y-4">
      <View>
        <Text className="mb-2 text-slate-400 font-medium text-lg">
          {t("PROFILE.USERNAME")}
        </Text>

        <View className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-md">
          <Text className="font-semibold text-slate-500 text-lg">
            {user?.username}
          </Text>
        </View>
      </View>

      <View>
        <Text className="mb-2 text-slate-400 font-medium text-lg">
          {t("PROFILE.EMAIL")}
        </Text>

        <View className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-md">
          <Text className="font-semibold text-slate-500 text-md text-lg">
            {user?.email}
          </Text>
        </View>
      </View>
    </View>
  );
};
