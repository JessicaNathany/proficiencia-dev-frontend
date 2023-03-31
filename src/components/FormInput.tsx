import {
  FormControl, Input,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { ForwardRefRenderFunction } from "react";

import { Controller, useFormContext } from "react-hook-form";

type InputProps = Omit<ChakraInputProps, "name"> & {
  name: string;
  placeholder?: string;
};

export const FormInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, placeholder, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <FormControl isInvalid={!!error}>
            <Input
              w="100%"
              bg="gray.700"
              borderRadius={5}
              fontSize="lg"
              padding={5}
              mb={5}
              color="white"
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              {...rest}
            />
           
          </FormControl>
        );
      }}
    />
  );
};

export default FormInput;
