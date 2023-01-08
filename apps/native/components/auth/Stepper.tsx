import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { classes } from "../../utils/css";

type Step = {
  component: React.ReactNode;
  icon: typeof Feather | typeof Ionicons;
  iconName: any;
};

type StepperProps = {
  activeStep?: boolean;
  steps: Step[];
};

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    if (steps.length === activeStep) return;
    setActiveStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (activeStep === 0) return;
    setActiveStep((prev) => prev - 1);
  };

  return (
    <View className="w-full">
      <View className="w-full mx-auto">
        <View className="flex flex-row justify-between items-center">
          {steps.map((step, index) => (
            <>
              <View
                className={classes(
                  "rounded-full border border-gray-300 h-10 w-10 flex items-center justify-center",
                  activeStep > index
                    ? "border border-green-100 bg-green-100"
                    : index === activeStep
                    ? "border border-rose-100 bg-rose-100"
                    : "border border-gray-300"
                )}
              >
                {activeStep > index ? (
                  <Feather name="check" color="#166534" size={24} />
                ) : (
                  <step.icon
                    name={step.iconName}
                    color={
                      activeStep > index
                        ? ""
                        : index === activeStep
                        ? "#9f1239"
                        : "black"
                    }
                    size={20}
                  />
                )}
              </View>
              {index + 1 !== steps.length && (
                <View
                  className={classes(
                    "border w-24",
                    activeStep > index ? "border-gray-300" : "border-gray-300"
                  )}
                />
              )}
            </>
          ))}
        </View>
      </View>
      <View className="mt-8">{steps[activeStep].component}</View>

      <View className="mt-8 mx-auto">
        {steps.length !== activeStep + 1 && (
          <TouchableOpacity
            onPress={handleNextStep}
            className="flex flex-row items-baseline justify-center space-x-2 bg-gray-100 py-2 px-3 rounded-md"
          >
            <Text className="font-medium text-lg ">Gå videre</Text>
            <Feather name="arrow-right" size={20} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handlePreviousStep}
          className="flex flex-row items-baseline justify-center space-x-2 mt-8"
        >
          <Text className="text-md">Tilbake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
