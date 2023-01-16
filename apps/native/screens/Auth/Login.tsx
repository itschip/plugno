import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@utils/env";
import { useState } from "react";
import {
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

  const navigation = useNavigation();

  const handleLogin = async () => {
    fetch(`${API_URL}/login`, {
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
        AsyncStorage.setItem("plug:access_token", data.access_token);
        AsyncStorage.setItem("plug:refresh_token", data.refresh_token);

        dispatch.auth.populate(data.user);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <View className="w-full px-8 space-y-4">
        <View>
          <Text className="text-center text-white text-8xl font-extrabold">
            PLUG
          </Text>
        </View>
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="gray"
            cursorColor="white"
            style={{ fontSize: 18 }}
            className="bg-neutral-800 py-3 px-3 w-full rounded-md border border-neutral-700 text-white"
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
            cursorColor="white"
            className="bg-neutral-800 py-3 px-3 w-full rounded-md border border-neutral-700 text-white"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleLogin}
            className="px-2 py-2.5 rounded-md bg-neutral-600"
          >
            <Text className="text-white text-xl text-center font-semibold">
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-white text-center text-lg font-medium">
            Lag bruker.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
