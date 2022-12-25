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

export const ChatConversation = () => {
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
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

        console.log("New messsage", msgData);
        setMessages((curVal) => [...curVal, msgData.message]);
      };

      socket.onclose = () => {
        console.log("Socket is closed");
      };
    }

    return () => {
      socket?.close();
    };
  }, [socket]);

  const handleSendMessage = () => {
    socket?.send(JSON.stringify({ userId: user?.id, message }));
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-2 grow space-y-2 mt-2 px-3 mb-4">
        {messages.map((message) => (
          <View key={message} className="flex items-stretch justify-start">
            <View className="bg-gray-200 border border-gray-300 py-3 px-3 rounded-md w-auto float-right min-w-[10%] max-w-[50%] break-words">
              <Text>{message}</Text>
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
