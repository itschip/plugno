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

  return (
    <SafeAreaView>
      <View className="mt-4 px-4 space-y-4">
        <TextInput
          className="px-3 py-3 bg-gray-200 border border-gray-400 rounded-md"
          placeholder="Tittel"
        />
        <TextInput
          className="px-3 py-3 bg-gray-200 border border-gray-400 rounded-md"
          placeholder="Beskrivelse"
        />

        <View className="mt-8 relative z-[99999]">
          <TextInput
            value={place}
            onChangeText={setPlace}
            className="px-3 py-3 bg-gray-200 border border-gray-400 rounded-md"
            placeholder="Sted"
          />
          <View>
            {suggestions?.predictions.length !== 0 && (
              <View className="bg-gray-200 border border-gray-400 w-full mt-1 rounded-md shadow-sm absolute -bottom-24">
                {suggestions?.predictions.map((place) => (
                  <TouchableOpacity
                    onPress={() => setPlace(place.description)}
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
          className="px-3 py-3 bg-gray-200 border border-gray-400 rounded-md"
          placeholder="Telefonnummer"
        />
      </View>
    </SafeAreaView>
  );
};
