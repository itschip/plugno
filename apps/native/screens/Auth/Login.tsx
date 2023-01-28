import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PlugTextIcon from "../../icons/PlugTextIcon";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoaded, setSession, signIn } = useSignIn();

  const navigation = useNavigation();

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      setSession(completeSignIn.createdSessionId);
    } catch (err) {
      console.log("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white relative">
      <View className="absolute  top-40">
        <PlugTextIcon className="mx-auto" />
      </View>
      <View className="w-full px-8 space-y-4">
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
            className="bg-gray-100 py-3 px-3 w-full rounded-md border border-gray-200 "
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
            className="bg-gray-100 py-3 px-3 w-full rounded-md border border-gray-200"
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={onSignInPress}
            className="px-2 py-2 rounded-md bg-black"
          >
            <Text
              className="text-white text-xl text-center font-semibold"
              style={{ fontFamily: "Futura" }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            className="text-black text-center text-lg font-medium"
            style={{ fontFamily: "Futura" }}
          >
            Lag bruker.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
