import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

interface InputControllerProps<T = string> extends TextInputProps {
  name: keyof T;
}

export const InputController = <T = string,>({
  name,
  ...props
}: InputControllerProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextInput
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          {...props}
        />
      )}
    />
  );
};
