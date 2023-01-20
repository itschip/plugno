import { Ionicons } from "@expo/vector-icons";
import { RequestFormData } from "@typings/form";
import { classes } from "@utils/css";
import { useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

type RequestProps = {
  id: number;
  type: "delivery" | "shipping";
  title: string;
  description: string;
};

const requestOptions: RequestProps[] = [
  {
    id: 1,
    type: "shipping",
    title: "Frakt",
    description: "Hjelp med å frakte ting fra A til B",
  },
  {
    id: 2,
    type: "delivery",
    title: "Jeg trenger noe kjapt",
    description: "Hjelp med å fikse noe ASAP",
  },
];

export const RequstTypeForm = () => {
  const { watch, setValue } = useFormContext<RequestFormData>();

  const requestType = watch("requestType");

  return (
    <View className="px-4 pt-10 space-y-4">
      {requestOptions.map((option) => (
        <TouchableOpacity
          activeOpacity={1}
          key={option.id}
          onPress={() => setValue("requestType", option.type)}
          className={classes(
            "border-2 h-28 px-4 rounded-md flex-row items-center space-x-8",
            requestType === option.type
              ? "border-green-200 bg-green-100"
              : "border-gray-200 bg-gray-50"
          )}
        >
          <View className="flex flex-row items-center justify-start space-x-2">
            <View
              className={classes(
                "rounded-full h-8 w-8 flex items-center justify-center",
                requestType === option.type ? "bg-green-200" : "bg-gray-200"
              )}
            >
              <Ionicons
                name="checkmark-sharp"
                size={24}
                color={requestType === option.type ? "#166534" : "#1f2937"}
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
  );
};
