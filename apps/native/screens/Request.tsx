import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { classes } from "@utils/css";

const requestOptions = [
  {
    id: 1,
    title: "Frakt",
    description: "Hjelp med å frakte ting",
  },
  {
    id: 2,
    title: "Dyrepass",
    description: "Hjelp med å passe på dyr",
  },
  {
    id: 3,
    title: "Jeg trenger noe kjapt",
    description: "Hjelp med å hente noe",
  },
];

export const RequestScreen = () => {
  const [selectedRequestType, setSelectedRequestType] = useState<number | null>(
    null
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-4 pt-10 space-y-4">
        {requestOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedRequestType(option.id)}
            className={classes(
              "border-2 h-28 px-4 rounded-md flex-row items-center space-x-8",
              selectedRequestType === option.id
                ? "border-green-200 bg-green-100"
                : "border-gray-200 bg-gray-50"
            )}
          >
            <View className="flex flex-row items-center justify-start space-x-2">
              <View
                className={classes(
                  "rounded-full h-8 w-8 flex items-center justify-center",
                  selectedRequestType === option.id
                    ? "bg-green-200"
                    : "bg-gray-200"
                )}
              >
                <Ionicons
                  name="checkmark-sharp"
                  size={24}
                  color={
                    selectedRequestType === option.id ? "#166534" : "#1f2937"
                  }
                />
              </View>
            </View>

            <View>
              <Text className="text-2xl font-bold">{option.title}</Text>
              <Text className="text-sm">{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-10 px-4">
        <TouchableOpacity className="bg-gray-100 py-2 rounded-md">
          <Text className="text-center font-medium text-lg">Fortsett</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
