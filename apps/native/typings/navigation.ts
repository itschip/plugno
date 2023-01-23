import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Plugs: undefined;
  Request: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Hero: undefined;
  Requests: undefined;
};

export type RequestStackParamList = {
  RequestList: undefined;
  ActiveRequest: undefined;
  RequestSummary: {
    id: number;
  };
};

export type RequestStackNavigationProp =
  NativeStackNavigationProp<RequestStackParamList>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Requests"
>;

export type ChatStackParamList = {
  Conversations: undefined;
  Conversation: { id: number };
};

export type ConversationScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  "Conversation"
>;

export type ConversationScreenRouteProp = RouteProp<
  ChatStackParamList,
  "Conversation"
>;

export type ProfileScreenNavigationPropTest = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, "Profile">,
  NativeStackNavigationProp<AuthStackParamList>
>;
