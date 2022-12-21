import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
import { UserResponse } from "../../typings/user";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<Dispatch>();

  const handleLogin = async () => {
    fetch("http://localhost:6001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data: UserResponse) => {
        AsyncStorage.setItem("id_token", data.id_token);

        dispatch.auth.populate(data.user);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-full px-8 space-y-4">
        <View>
          <Text className="text-center text-8xl font-extrabold">PLUG</Text>
        </View>
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="gray"
            style={{ fontSize: 18 }}
            className="bg-gray-300 py-3 px-3 w-full rounded-md border border-gray-300"
          />
        </View>

        <View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="gray"
            style={{ fontSize: 18 }}
            className="bg-gray-300 py-3 px-3 w-full rounded-md border border-gray-300"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-black hover:bg-yellow-600 px-2 py-2.5 rounded-md"
          >
            <Text className="text-white text-lg text-center font-bold">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
