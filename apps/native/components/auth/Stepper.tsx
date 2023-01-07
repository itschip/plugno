import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { classes } from "../../utils/css";

type Step = {
  component: React.ReactNode;
  icon: any;
  iconName: string;
};

type StepperProps = {
  activeStep?: boolean;
  steps: Step[];
};

// {
//      [key]: {
//          active: bool,
//          completed: bool
//      }
// }

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <View className="w-full">
      <View className="w-full mx-auto">
        <View className="flex flex-row justify-between items-center">
          {steps.map((step, index) => (
            <>
              <View
                className={classes(
                  "rounded-full border border-gray-300 h-10 w-10 flex items-center justify-center",
                  index === activeStep
                    ? "border border-rose-100 bg-rose-100"
                    : "border border-gray-300"
                )}
              >
                <step.icon
                  name={step.iconName}
                  color={index === activeStep ? "#9f1239" : "black"}
                  size={20}
                />
              </View>
              <View className="border border-gray-300 w-24" />
            </>
          ))}
        </View>
      </View>
      <View className="mt-8">{steps[activeStep].component}</View>

      <View className="mt-8 mx-auto">
        <TouchableOpacity className="flex flex-row items-baseline justify-center space-x-2">
          <Text className="font-medium text-lg">Gå videre</Text>
          <Feather name="arrow-right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
