import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDebounce } from "../hooks/useDebounce";
import { PlacesResponse } from "../typings/gcp";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const API_KEY = "AIzaSyAk7iCk58fp8Do5N5S8FcFZdm4f8iHIi2Q";

export const RequestScreen = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PlacesResponse | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const debouncedPlace = useDebounce(place, 500);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${debouncedPlace}&key=${API_KEY}`
      );

      const response = await res.json();
      setSuggestions(response);
    })();
  }, [debouncedPlace]);

  const handleChangePlace = (place: string) => {
    setPlace(place);
    setOpen(false);
  };

  const handlePlaceText = (value: string) => {
    setPlace(value);
    if (value.trim()) {
      setOpen(true);
    }
  };

  const handleCreateJob = async () => {
    fetch("http://localhost:6001/jobs/newPlugJob", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        place,
        phoneNumber,
        userId: user?.id,
      }),
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="mt-4 px-4 space-y-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px]"
          placeholder="Tittel"
          placeholderTextColor="darkgray"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px] h-32"
          placeholder="Beskrivelse"
        />

        <View className="mt-8 relative z-[99999]">
          <TextInput
            value={place}
            onChangeText={handlePlaceText}
            className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px]"
            placeholder="Sted"
          />
          <View>
            {suggestions?.predictions.length !== 0 && open && (
              <View className="bg-gray-100 border border-gray-400 w-full mt-1 rounded-md shadow-xs absolute">
                {suggestions?.predictions.map((place) => (
                  <TouchableOpacity
                    key={place.description}
                    onPress={() => handleChangePlace(place.description)}
                    className="px-2 py-3 border-b border-gray-400 flex flex-row space-x-2 items-center"
                  >
                    <Feather name="map-pin" size={20} color="gray" />
                    <Text className="text-md font-medium">
                      {place.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px]"
          placeholder="Telefonnummer"
        />

        <View>
          <TouchableOpacity
            onPress={handleCreateJob}
            className="px-2 py-3 bg-black rounded-md"
          >
            <Text className="text-white font-bold text-lg text-center">
              Legg ut jobb
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
