import { Animated, Text, View } from "react-native";
import { classes } from "../../utils/css";
import { Ionicons } from "@expo/vector-icons";

type TrackingItemProps = { label: string; active: boolean; completed: boolean };

export const TrackingItem: React.FC<TrackingItemProps> = (item) => {
  return (
    <View className="flex flex-row justify-start items-center space-x-4">
      <View
        className={classes(
          "rounded-full h-8 w-8 flex items-center justify-center",
          item.completed
            ? "bg-green-100 border border-green-100"
            : item.active
            ? "bg-indigo-100 border border-indigo-100"
            : "bg-gray-100 border border-gray-100"
        )}
      >
        {item.completed ? (
          <Ionicons name="checkmark-sharp" size={20} color={"#166534"} />
        ) : item.active ? (
          <Animated.View style={{}}>
            <Ionicons name="sync-sharp" size={24} color="#3730a3" />
          </Animated.View>
        ) : (
          <Ionicons name="checkmark-sharp" size={20} color={"#1f2937"} />
        )}
      </View>
      <Text className="text-gray-600 text-[16px] font-semibold">
        {item.label}
      </Text>
    </View>
  );
};
