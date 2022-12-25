import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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

        console.log("New messsage", msgData.message);
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
  };
  return (
    <SafeAreaView>
      <View>
        <TextInput
          value={message}
          onChangeText={setMessage}
          className="bg-gray-300 px-3 w-full py-2"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="bg-black px-3 py-2"
        >
          <Text className="font-semibold text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
