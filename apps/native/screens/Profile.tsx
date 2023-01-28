import { useClerk } from "@clerk/clerk-expo";
import { UserDetails } from "@components/profile/UserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../i18n";
import { Dispatch, RootState } from "../store";

export const Profile = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<Dispatch>();

  const [plugEnabled, setPlugEnabled] = useState(role === "plug");
  const { signOut } = useClerk();

  const [t] = useTranslation();

  const handleRoleChange = () => {
    setPlugEnabled((prev) => !prev);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogOut = async () => {
    dispatch.auth.populate(null);
  };

  useEffect(() => {
    dispatch.auth.changeRole(plugEnabled);
  }, [plugEnabled, dispatch.auth]);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="px-4">
        <Text className="text-slate-500 text-3xl font-extrabold">
          {t("PROFILE.PROFILE")}
        </Text>
      </View>

      <UserDetails />

      <View className="px-4 mt-4">
        <Text className="mb-2 text-slate-400 font-semibold text-xl">
          Endre rolle til {role === "user" ? "Plug" : "Bruker"}
        </Text>
        <Switch
          className="mt-2"
          trackColor={{ true: "#f43f5e" }}
          value={plugEnabled}
          onValueChange={handleRoleChange}
        />
      </View>

      <View className="px-4 mt-2">
        <Text className="mb-2 text-slate-400 font-semibold text-xl">
          {t("PROFILE.CHANGE_LANGUAGE")}
        </Text>

        <TouchableOpacity onPress={() => handleChangeLanguage("en")}>
          <Text>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeLanguage("no")}>
          <Text>NO</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-4 absolute bottom-10 right-0 left-0">
        <TouchableOpacity
          className="px-3 py-3 bg-red-100  rounded-md"
          onPress={() => signOut()}
        >
          <Text className="text-red-800 font-medium text-center text-md">
            {t("PROFILE.ACTIONS.LOGOUT")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
