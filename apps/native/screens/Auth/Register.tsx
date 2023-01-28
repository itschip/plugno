import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Stepper } from "@components/auth/Stepper";
import { RoleSelection } from "@components/auth/steps/RoleSelection";
import { UserInfo } from "@components/auth/steps/UserInfo";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormData } from "@typings/form";

export const RegisterScreen = () => {
  const methods = useForm<RegisterFormData>({
    defaultValues: { role: "plug" },
  });
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-4 flex flex-row">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="bg-gray-100 rounded-full px-4 py-1"
        >
          <Feather name="arrow-left" size={18} color="#1f2937" />
        </TouchableOpacity>
      </View>
      <View className="px-4 mt-4">
        <Text className="text-black font-extrabold text-3xl font-main">
          Lag bruker.
        </Text>
      </View>

      <View className="px-4 mt-6">
        <FormProvider {...methods}>
          <Stepper
            steps={[
              {
                icon: Feather,
                iconName: "users",
                component: <RoleSelection />,
              },
              {
                icon: Feather,
                iconName: "edit",
                component: <UserInfo />,
              },
              {
                icon: Ionicons,
                iconName: "checkmark-done-sharp",
                component: <View></View>,
              },
            ]}
          />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};
