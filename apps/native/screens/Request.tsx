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

const places = [
  {
    id: 1,
    name: "Jernbanealleen 21",
  },
  {
    id: 2,
    name: "Ivar Aasens vei 3",
  },
];

const API_KEY = "AIzaSyAk7iCk58fp8Do5N5S8FcFZdm4f8iHIi2Q";

export const RequestScreen = () => {
  const [place, setPlace] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const debouncedPlace = useDebounce(place, 500);
  const [suggestions, setSuggestions] = useState<PlacesResponse | null>(null);

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

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="mt-4 px-4 space-y-4">
        <TextInput
          className="px-3 py-4 bg-gray-100 border border-gray-200 rounded-md text-[16px]"
          placeholder="Tittel"
          placeholderTextColor="darkgray"
        />
        <TextInput
          className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px]"
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
              <View className="bg-gray-200 border border-gray-400 w-full mt-1 rounded-md shadow-sm absolute">
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
          className="px-3 py-4 bg-gray-100 border border-gray-300 rounded-md text-[16px]"
          placeholder="Telefonnummer"
        />
      </View>
    </SafeAreaView>
  );
};
