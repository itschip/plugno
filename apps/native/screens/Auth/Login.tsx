import { useSignIn, useSignUp } from "@clerk/clerk-expo";
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
import { FontAwesome5 } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoaded, setSession, signIn } = useSignIn();
  const { signUp } = useSignUp();

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
      console.log("Sign in normal Error:> " + JSON.stringify(err));
    }
  };

  const handleSignInWithDiscordPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/oauth_callback",
      });

      try {
        await signIn.create({
          strategy: "oauth_discord",
          redirectUrl,
        });
      } catch (err) {
        console.error(`[signIn.create] - Error: ${err}`);
      }

      const {
        firstFactorVerification: { externalVerificationRedirectURL },
      } = signIn;

      if (!externalVerificationRedirectURL)
        throw "externalVerificationRedirectURL failed";

      try {
        const authResult = await AuthSession.startAsync({
          authUrl: externalVerificationRedirectURL.toString(),
          returnUrl: redirectUrl,
        });

        if (authResult.type !== "success") {
          console.log(authResult.params);
        }

        // Get the rotatingTokenNonce from the redirect URL parameters
        const { rotating_token_nonce: rotatingTokenNonce } = authResult.params;

        await signIn.reload({ rotatingTokenNonce });

        const { createdSessionId } = signIn;

        if (createdSessionId) {
          // If we have a createdSessionId, then auth was successful
          await setSession(createdSessionId);
        } else {
          // If we have no createdSessionId, then this is a first time sign-in, so
          // we should process this as a signUp instead
          // Throw if we're not in the right state for creating a new user
          if (!signUp) {
            throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
          }

          if (signIn.firstFactorVerification.status === "transferable") {
            console.log("Not transferable");
          }

          console.log(
            "Didn't have an account transferring, following through with new account sign up"
          );

          // Create user
          await signUp.create({ transfer: true });
          await signUp.reload({
            rotatingTokenNonce: authResult.params.rotating_token_nonce,
          });
          await setSession(signUp.createdSessionId);
        }
      } catch (err) {
        console.log(`Whole thing fucked: Error: ${JSON.stringify(err)}`);
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
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
            className="px-2 py-2.5 rounded-md bg-black"
          >
            <Text
              className="text-white text-xl text-center font-semibold"
              style={{ fontFamily: "Futura" }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row">
          <TouchableOpacity
            onPress={handleSignInWithDiscordPress}
            className="bg-blue-500 px-4 py-3 rounded-md"
          >
            {/* Actually discord */}
            <FontAwesome5 name="facebook-f" size={24} color="white" />
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
