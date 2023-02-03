import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { axiosInstance } from "../lib/axios-instance";
import { useEffect, useState } from "react";
import { TAcceptedJob } from "@typings/jobs";
import { RequestList } from "@components/requests/RequestList";
import { useAuth } from "@clerk/clerk-expo";

export const AcceptedJobsScreen = () => {
  const [acceptedJobs, setAcceptedJobs] = useState<TAcceptedJob[] | null>(null);
  const navigation = useNavigation();
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      axiosInstance
        .get<TAcceptedJob[]>("/jobs/getAcceptedPlugJobs", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setAcceptedJobs(res.data);
        });
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <RequestList data={acceptedJobs} />
      </View>
    </SafeAreaView>
  );
};
