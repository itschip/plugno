import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  TrackingStatus,
  useTrackingContext,
} from "../providers/TrackingProvider";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ActiveJobPlugView = () => {
  const navigation = useNavigation();
  const { sendTrackingMessage } = useTrackingContext();
  const { activeJob } = useSelector((state: RootState) => state.jobs);

  const updateTracking = (type: TrackingStatus) => {
    if (!activeJob) return;
    sendTrackingMessage({
      type,
      jobId: activeJob?.jobId,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-2 flex flex-row items-center space-x-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="close" size={30} color={"black"} />
        </TouchableOpacity>
        <Text className="text-2xl font-medium text-black">Aktiv jobb</Text>
      </View>

      <View className="px-4 mt-8 space-y-4">
        <TouchableOpacity
          className="bg-rose-500 p-4"
          onPress={() => updateTracking(TrackingStatus.InTransit)}
        >
          <Text>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-rose-500 p-4"
          onPress={() => updateTracking(TrackingStatus.InTransit)}
        >
          <Text>In transit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-rose-500 p-4"
          onPress={() => updateTracking(TrackingStatus.Active)}
        >
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-rose-500 p-4"
          onPress={() => updateTracking(TrackingStatus.Completed)}
        >
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
