import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stepper } from "../../components/auth/Stepper";
import { RoleSelection } from "../../components/auth/steps/RoleSelection";

export const RegisterScreen = () => {
  const [roleSelected, setRoleSelected] = useState<"plug" | "user">("plug");
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Text>Tilbake</Text>
        </TouchableOpacity>
      </View>
      <View className="px-4 mt-4">
        <Text className="text-black font-extrabold text-2xl">Lag bruker.</Text>
      </View>

      <View className="px-4 mt-6">
        <Stepper
          steps={[
            {
              icon: Feather,
              iconName: "users",
              component: (
                <RoleSelection role={roleSelected} setRole={setRoleSelected} />
              ),
            },
            {
              icon: Feather,
              iconName: "edit",
              component: <View></View>,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};
