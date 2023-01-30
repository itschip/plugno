import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-expo";

export const UserDetails = () => {
  const [t] = useTranslation();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <View className="mt-8 px-4 space-y-4">
      <View>
        <Text className="mb-2 text-slate-400 font-medium text-lg">
          {t("PROFILE.USERNAME")}
        </Text>

        <View className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-md">
          <Text className="font-medium text-slate-500 text-lg">
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
      </View>

      <View>
        <Text className="mb-2 text-slate-400 font-medium text-lg">
          {t("PROFILE.EMAIL")}
        </Text>

        <View className="bg-gray-100 border border-gray-200 px-2 py-2 rounded-md">
          <Text className="font-medium text-slate-500 text-md text-lg">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};
