import { Animated, Easing, Text, View } from "react-native";
import { classes } from "../../utils/css";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type TrackingItemProps = { label: string; active: boolean; completed: boolean };

export const TrackingItem: React.FC<TrackingItemProps> = (item) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    if (item.active) {
      anim.start();
    }

    return () => {
      anim.reset();
      anim.stop();
    };
  }, [item.active]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
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
