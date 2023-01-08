import { RegisterFormData } from "@typings/form";
import { View } from "react-native";
import { InputController } from "../../../forms/InputController";

export const UserInfo = () => {
  return (
    <View className="space-y-6">
      <View>
        <InputController<RegisterFormData>
          name="name"
          autoCapitalize="none"
          placeholderTextColor="gray"
          placeholder="Navn"
          style={{ fontSize: 18 }}
          className="border border-gray-300 py-3 px-3 w-full rounded-md"
        />
      </View>
      <View>
        <InputController<RegisterFormData>
          name="email"
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ fontSize: 18 }}
          className="border border-gray-300 py-3 px-3 w-full rounded-md"
        />
      </View>

      <View>
        <View className="space-y-4">
          <InputController<RegisterFormData>
            name="password"
            placeholder="Passord"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry
            style={{ fontSize: 18 }}
            className="border border-gray-300 py-3 px-3 w-full rounded-md"
          />
          <InputController<RegisterFormData>
            name="confirmPassword"
            placeholder="Gjenta passord"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry
            style={{ fontSize: 18 }}
            className="border border-gray-300 py-3 px-3 w-full rounded-md"
          />
        </View>
      </View>
    </View>
  );
};
