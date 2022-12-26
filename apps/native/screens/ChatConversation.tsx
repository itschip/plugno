import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Feather } from "@expo/vector-icons";
import { MessagesScrollView } from "../components/chat/MessageScrollView";
import { classes } from "../utils/css";

type Message = {
  id: string;
  createdAt: string;
  message: string;
  updatedAt: string;
  userId: number;
};

export const ChatConversation = () => {
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const _socket = new WebSocket("ws://localhost:6001/ws");
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("Socket is open");
      };

      socket.onmessage = (msg) => {
        console.log("new data:", msg);
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
    fetch("http://localhost:6001/messages/getAll?conversationId=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("all messages", data);
        setMessages(data);
      });
  }, []);

  const handleSendMessage = () => {
    socket?.send(JSON.stringify({ userId: user?.id, message }));
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="grow space-y-2 mt-2 px-3 mb-4">
        {messages.map((msg) => (
          <View key={msg.id}>
            <View
              className={classes("flex items-stretch justify-start space-x-2")}
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