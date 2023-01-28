import { acceptPlugJob, fetchPlugJogs } from "@api/plugs-api";
import { TPlugJobResponse } from "@typings/jobs";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store";
import { classes } from "../utils/css";

export const Plugs = () => {
  const dispatch = useDispatch<Dispatch>();
  const plugJobs = useSelector((state: RootState) => state.jobs.plugs);

  useEffect(() => {
    fetchPlugJogs().then((data) => {
      dispatch.jobs.populatePlugJobs(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 px-4">
      <View className="px-4">
        <Text className="text-white text-4xl font-extrabold">Jobs</Text>
      </View>
      <View className="px-4 mt-2">
        {plugJobs && <FlatList data={plugJobs} renderItem={renderItem} />}
      </View>
    </SafeAreaView>
  );
};

const renderItem = ({ item }: { item: TPlugJobResponse }) => {
  return <ListItem item={item} />;
};

const ListItem = ({ item }: { item: TPlugJobResponse }) => {
  const handleAcceptJob = async () => {
    await acceptPlugJob(item.id, item.userId);
  };

  return (
    <View className="bg-gray-100 border border-gray-200 rounded-md p-2 mt-4">
      <View className="flex flex-row items-center space-x-2">
        <Image
          source={{ uri: item.avatar }}
          className="h-10 w-10 rounded-full"
        />
        <Text className="text-slate-500 text-lg font-medium">
          {item.username}
        </Text>
      </View>

      <View className="mt-2">
        <Text className="text-slate-500 font-medium text-md text-[15px]">
          {item.description}
        </Text>
      </View>

      <View className="mt-4">
        <TouchableOpacity
          disabled={item.isAccepted}
          onPress={handleAcceptJob}
          className={classes(
            "px-2 py-3 rounded-md",
            item.isAccepted ? "bg-neutral-700" : "bg-rose-500"
          )}
        >
          <Text
            className={classes(
              "text-center font-bold",
              item.isAccepted ? "text-neutral-400" : "text-white"
            )}
          >
            {item.isAccepted ? "Accepted" : "Accept"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
