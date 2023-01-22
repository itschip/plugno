import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { axiosInstance } from "../lib/axios-instance";
import { useEffect, useState } from "react";
import { TAcceptedJob } from "@typings/jobs";
import { RequestList } from "@components/requests/RequestList";

export const AcceptedJobsScreen = () => {
  const [acceptedJobs, setAcceptedJobs] = useState<TAcceptedJob[] | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    axiosInstance
      .get<TAcceptedJob[]>("/jobs/getAcceptedPlugJobs")
      .then((res) => {
        console.log(res.data);
        setAcceptedJobs(res.data);
      });
  }, []);

  return (
    <SafeAreaView>
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <RequestList data={acceptedJobs} />
      </View>
    </SafeAreaView>
  );
};
