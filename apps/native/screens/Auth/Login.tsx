import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UserResponse } from "../../typings/user";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    fetch("http://localhost:6001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data: UserResponse) => {
        console.log(data.id_token);

        AsyncStorage.setItem("id_token", data.id_token);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-neutral-900">
      <View className="w-full px-8 space-y-4">
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={{ fontSize: 18 }}
            className="bg-neutral-800 border border-neutral-700 text-white py-3 px-3  w-full rounded-md"
          />
        </View>

        <View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="white"
            style={{ fontSize: 18 }}
            className="bg-neutral-800 border border-neutral-700 text-white py-3 px-3  w-full rounded-md"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-rose-500/60 border border-rose-600/60 hover:bg-rose-600/60 px-2 py-1.5 rounded-md"
          >
            <Text className="text-white text-lg text-center font-semibold">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
