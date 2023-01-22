import { TAcceptedJob } from "@typings/jobs";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

export type RequestListProps = {
  data: TAcceptedJob[] | null;
};

export const RequestList: React.FC<RequestListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 14 }}
    />
  );
};

const renderItem = ({ item }: { item: TAcceptedJob }) => (
  <RequestItem item={item} />
);

const RequestItem = ({ item }: { item: TAcceptedJob }) => {
  return (
    <View className="border-b border-slate-200 flex flex-row items-center space-x-4">
      <View>
        <Image
          source={{ uri: item.plugAvatar }}
          className="h-10 w-10 rounded-full"
        />
      </View>
      <View>
        <Text className="font-medium text-lg">{item.title}</Text>
        <Text className="text-sm text-slate-500">{item.status}</Text>
      </View>
    </View>
  );
};
