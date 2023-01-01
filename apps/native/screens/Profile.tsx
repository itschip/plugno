import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store";

export const Profile = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<Dispatch>();

  const [plugEnabled, setPlugEnabled] = useState(role === "plug");

  const handleRoleChange = () => {
    setPlugEnabled((prev) => !prev);
  };

  useEffect(() => {
    dispatch.auth.changeRole(plugEnabled);
  }, [plugEnabled, dispatch.auth]);

  return (
    <SafeAreaView className="bg-black flex-1">
      <View className="px-4">
        <Text className="text-white text-3xl font-extrabold">Profil</Text>
      </View>
      <View className="mt-8 px-4 space-y-4">
        <View>
          <Text className="mb-2 text-neutral-200 font-semibold text-xl">
            Brukernavn
          </Text>
          <View className="bg-neutral-800 border border-neutral-700 px-2 py-3 rounded-md">
            <Text className="font-semibold text-white text-lg">
              {user?.username}
            </Text>
          </View>
        </View>

        <View>
          <Text className="mb-2 text-neutral-200 font-semibold text-xl">
            E-post
          </Text>
          <View className="bg-neutral-800 border border-neutral-700 px-2 py-3 rounded-md">
            <Text className="font-semibold text-white text-md text-lg">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text className="mb-2 text-neutral-200 font-semibold text-xl">
          Endre rolle til {role === "user" ? "Plug" : "Bruker"}
        </Text>
        <Switch
          className="mt-2"
          trackColor={{ true: "#f43f5e" }}
          value={plugEnabled}
          onValueChange={handleRoleChange}
        />
      </View>
    </SafeAreaView>
  );
};
