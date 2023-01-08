import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { classes } from "../../../utils/css";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useFormContext } from "react-hook-form";
import { RegisterFormData } from "@typings/form";

type RoleSelectionProps = {
  role: "plug" | "user";
  setRole: (role: "plug" | "user") => void;
};

type RoleProp = {
  role: "plug" | "user";
  title: string;
  description: string;
};

const roleOptions: RoleProp[] = [
  {
    role: "plug",
    title: "Plug",
    description: "Godta jobber, utfør dem og få betalt.",
  },
  {
    role: "user",
    title: "Kunde",
    description: "Du ønsker hjelp med noe kjapt.",
  },
];

export const RoleSelection = () => {
  return (
    <View className="space-y-4">
      {roleOptions.map((roleOpt) => (
        <View key={roleOpt.role}>
          <RoleOption {...roleOpt} />
        </View>
      ))}
    </View>
  );
};

const RoleOption: React.FC<RoleProp> = (roleOpt) => {
  const { watch, setValue, control } = useFormContext<RegisterFormData>();

  const role = watch("role");

  return (
    <Controller
      name="role"
      control={control}
      render={() => (
        <TouchableOpacity
          onPress={() => setValue("role", roleOpt.role)}
          activeOpacity={1}
          className="bg-white border border-gray-300 shadow-sm rounded-md p-4 h-32 flex flex-row items-center space-x-4"
        >
          <View className="flex flex-row items-center space-x-4">
            <View
              className={classes(
                "h-7 w-7 rounded-full border flex items-center justify-center",
                role === roleOpt.role
                  ? "border-rose-100 bg-rose-100"
                  : "border-gray-300"
              )}
            >
              {role === roleOpt.role && (
                <Ionicons name="checkmark-sharp" size={20} color="#9f1239" />
              )}
            </View>
          </View>
          <View>
            <Text className="font-medium text-xl">{roleOpt.title}</Text>
            <Text>{roleOpt.description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

/* 
 *
        <TouchableOpacity
          key={roleOpt.role}
          onPress={() => setRole(roleOpt.role)}
          activeOpacity={1}
          className="bg-white border border-gray-300 shadow-sm rounded-md p-4 h-32 flex flex-row items-center space-x-4"
        >
          <View className="flex flex-row items-center space-x-4">
            <View
              className={classes(
                "h-7 w-7 rounded-full border flex items-center justify-center",
                role === roleOpt.role
                  ? "border-rose-100 bg-rose-100"
                  : "border-gray-300"
              )}
            >
              {role === roleOpt.role && (
                <Ionicons name="checkmark-sharp" size={20} color="#9f1239" />
              )}
            </View>
          </View>
          <View>
            <Text className="font-medium text-xl">{roleOpt.title}</Text>
            <Text>{roleOpt.description}</Text>
          </View>
        </TouchableOpacity>
 * */
