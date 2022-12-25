import React from "react";
import { ScrollView, Text, View } from "react-native";

type MessagesScrollViewProps = {
  messages: string[];
};

export const MessagesScrollView: React.FC<MessagesScrollViewProps> = ({
  messages,
}) => {
  return (
    <ScrollView className="flex-2 grow">
      {messages.map((message) => (
        <View key={message} className="flex items-stretch justify-start">
          <View className="bg-neutral-500 py-3 px-3 rounded-md w-auto float-right min-w-[10%] max-w-[30%] break-words">
            <Text>{message}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
