import { TAcceptedJob } from "@typings/jobs";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RequestStackNavigationProp } from "@typings/navigation";
import { classes } from "@utils/css";

export type RequestListProps = {
  data: TAcceptedJob[] | null;
};

// TODO:
// You will have two different pages.
// One for the summary page of the request and another for the active job page

const REQUEST_STATUS: Record<string, any> = {
  completed: {
    textColor: "text-green-800",
    bgColor: "bg-green-100",
    text: "Completed",
    icon: <Ionicons name="checkmark-done-sharp" size={20} color="#166534" />,
  },
  active: {
    textColor: "text-blue-800",
    bgColor: "bg-blue-100",
    text: "Active",
    icon: <Ionicons name="play" size={20} color="#166534" />,
  },
  cancelled: {
    textColor: "text-red-800",
    bgColor: "bg-red-100",
    text: "Cancelled",
    icon: <Ionicons name="play" size={20} color="#166534" />,
  },
};

export const RequestList: React.FC<RequestListProps> = ({ data }) => {
  return (
    <View>
      {data?.some((job) => job.status === "active") && (
        <>
          <View className="px-4 mb-2 flex flex-row">
            <Text className="font-medium text-slate-500 text-lg">
              Active jobs
            </Text>
          </View>
          <FlatList
            data={data?.filter((job) => job.status === "active")}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 14 }}
          />
        </>
      )}

      <View className="px-4 mb-2 mt-4 flex flex-row">
        <Text className="font-medium text-slate-500 text-lg">
          Previous jobs
        </Text>
      </View>
      <FlatList
        data={data?.filter((job) => job.status !== "active")}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 14 }}
      />
    </View>
  );
};

const renderItem = ({ item }: { item: TAcceptedJob }) => (
  <RequestItem item={item} />
);

const RequestItem = ({ item }: { item: TAcceptedJob }) => {
  const navigation = useNavigation<RequestStackNavigationProp>();

  const handlePress = () => {
    if (item.status === "accepted") {
      navigation.navigate("RequestSummary", { id: item.jobId });
    } else if (item.status === "active") {
      navigation.navigate("ActiveRequest");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="border-b border-slate-200 flex flex-row items-center justify-between  pb-3 pt-2"
    >
      <View className="flex flex-row items-center space-x-4">
        <View>
          <Image
            source={{ uri: item.plugAvatar }}
            className="h-10 w-10 rounded-full"
          />
        </View>
        <View>
          <Text className="font-medium text-lg text-slate-800">
            {item.title}
          </Text>
        </View>
      </View>
      <View>
        <View
          className={classes(
            "px-3 py-1 rounded-full",
            REQUEST_STATUS[item.status].bgColor
          )}
        >
          <Text
            className={classes(
              "font-medium",
              REQUEST_STATUS[item.status].textColor
            )}
          >
            {REQUEST_STATUS[item.status].text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
