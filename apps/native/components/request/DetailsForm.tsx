import { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDebounce } from "../../hooks/useDebounce";
import { PlacesResponse } from "../../typings/gcp";
import { useState } from "react";
import { RequestFormData } from "@typings/form";
import { InputController } from "../../forms/InputController";
import { GOOGLE_PLACES_API } from "@utils/env";
import { useFormContext } from "react-hook-form";

export const DetailsFrom = () => {
  const [place, setPlace] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PlacesResponse | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const debouncedPlace = useDebounce(place, 500);

  const { setValue } = useFormContext<RequestFormData>();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${debouncedPlace}&key=${GOOGLE_PLACES_API}`
      );

      const response = await res.json();
      setSuggestions(response);
    })();
  }, [debouncedPlace]);

  const handleChangePlace = (place: string) => {
    setPlace(place);
    setValue("place", place);
    setOpen(false);
  };

  const handlePlaceText = (value: string) => {
    setPlace(value);
    setValue("place", value);
    if (value.trim()) {
      setOpen(true);
    }
  };

  return (
    <View className="mt-4 px-4 space-y-4">
      <InputController<RequestFormData>
        placeholder="Tittel"
        name="title"
        className="px-3 py-4 bg-gray-100 border border-gray-200 rounded-md text-[16px]"
      />

      <InputController<RequestFormData>
        name="description"
        multiline
        className="px-3 py-4 bg-gray-100 border border-gray-200 rounded-md text-[16px] h-32"
        placeholder="Beskrivelse"
      />

      <View className="mt-8 relative z-[99999]">
        <TextInput
          value={place}
          onChangeText={handlePlaceText}
          className="px-3 py-4 bg-gray-100 border border-gray-200 rounded-md text-[16px]"
          placeholder="Sted"
        />
        <View>
          {suggestions?.predictions.length !== 0 && open && (
            <View className="bg-gray-100 border border-gray-200 w-full mt-1 rounded-md shadow-xs absolute">
              {suggestions?.predictions.map((place) => (
                <TouchableOpacity
                  key={place.description}
                  onPress={() => handleChangePlace(place.description)}
                  className="px-2 py-3 border-b border-gray-200 flex flex-row space-x-2 items-center"
                >
                  <Feather name="map-pin" size={20} color="#64748b" />
                  <Text className="text-md text-slate-500 font-medium">
                    {place.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <InputController<RequestFormData>
        placeholder="Telefonnummer"
        name="phoneNumber"
        className="px-3 py-4 bg-gray-100 border border-gray-200 rounded-md text-[16px]"
      />
    </View>
  );
};
