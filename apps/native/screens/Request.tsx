import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { RequestFormData } from "@typings/form";
import { Ionicons } from "@expo/vector-icons";
import { DetailsFrom } from "@components/request/DetailsForm";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { axiosInstance } from "../lib/axios-instance";
import { useState } from "react";
import { RequstTypeForm } from "@components/request/RequestTypeForm";

export const RequestScreen = () => {
  const [step, setStep] = useState(1);

  const methods = useForm<RequestFormData>({
    defaultValues: {
      requestType: "shipping",
    },
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (data: RequestFormData) => {
    console.log(data);
    if (user) {
      axiosInstance
        .post("/jobs/newPlugJob", {
          ...data,
          userId: user.id,
        })
        .catch((err) => console.log("ERROR:", err.response.data));
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="px-4">
        <Text className="text-slate-500 text-2xl font-bold">Ny jobb</Text>
      </View>

      <RequestStepper />
      <FormProvider {...methods}>
        {step === 1 && <RequstTypeForm />}
        {step === 2 && <DetailsFrom />}
      </FormProvider>
      <View className="mt-10 px-4 absolute bottom-10 left-0 right-0">
        <TouchableOpacity
          className="bg-gray-100 py-2 rounded-md"
          onPress={
            step === 1 ? () => setStep(2) : methods.handleSubmit(handleSubmit)
          }
        >
          <Text className="text-center font-medium text-lg">
            {step === 1 ? "Fortsett" : "Legg ut jobb"}
          </Text>
        </TouchableOpacity>
        {step === 2 && (
          <TouchableOpacity onPress={() => setStep(1)}>
            <Text>Avbryt</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const RequestStepper = () => {
  return (
    <View className="w-full flex items-center mt-8">
      <View className="flex flex-row items-center space-x-4">
        <View className="h-8 w-8 border border-green-100 bg-gray-100 rounded-full flex items-center justify-center">
          <Ionicons name="checkmark-sharp" size={24} color="gray" />
        </View>
        <View className="h-0.5 w-24 bg-gray-100" />
        <View className="h-8 w-8 bg-gray-100 rounded-full items-center justify-center">
          <Ionicons name="checkmark-sharp" size={24} color="gray" />
        </View>
      </View>
    </View>
  );
};
