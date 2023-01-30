import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { classes } from "../utils/css";
import { useRoute } from "@react-navigation/native";
import { ConversationScreenRouteProp } from "@typings/navigation";
import { useUser } from "@clerk/clerk-expo";

type Message = {
  id: string;
  createdAt: string;
  message: string;
  updatedAt: string;
  userId: string;
};

export const ChatConversation = () => {
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = useUser();

  const {
    params: { id: conversationId },
  } = useRoute<ConversationScreenRouteProp>();

  useEffect(() => {
    const _socket = new WebSocket(`ws://localhost:6001/ws/${conversationId}`);
    setSocket(_socket);
  }, [conversationId]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("Socket is open");
      };

      socket.onmessage = (msg) => {
        const msgData = JSON.parse(msg.data);

        setMessages((curVal) => [...curVal, msgData]);
      };

      socket.onclose = () => {
        console.log("Socket is closed");
      };
    }

    return () => {
      socket?.close();
    };
  }, [socket]);

  useEffect(() => {
    fetch(
      `http://localhost:6001/messages/getAll?conversationId=${conversationId}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, [conversationId]);

  const handleSendMessage = () => {
    socket?.send(
      JSON.stringify({
        userId: user?.id,
        message,
        roomId: conversationId,
      })
    );
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="grow w-full space-y-2 mt-2 px-3 mb-4">
        {messages.map((msg) => (
          <View key={msg.id}>
            <View
              className={classes(
                "flex flex-row items-stretch space-x-2",
                msg.userId == user?.id ? "justify-end" : "justify-start"
              )}
            >
              <View
                className={classes(
                  "py-3 px-3 rounded-md w-auto max-w-[80%] break-words",
                  msg.userId == user?.id
                    ? "bg-rose-400 border border-rose-500"
                    : "bg-gray-200 border border-gray-300"
                )}
              >
                <Text
                  className={classes(
                    msg.userId === user?.id ? "text-white" : ""
                  )}
                >
                  {msg.message}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="bg-white py-2 px-3 flex flex-row space-x-4 items-center">
        <TextInput
          placeholder="Send melding..."
          placeholderTextColor="gray"
          value={message}
          onChangeText={setMessage}
          className="px-3 bg-gray-100 grow py-4 border border-gray-300 rounded-md"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
