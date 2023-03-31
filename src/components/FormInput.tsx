import { Input, InputProps } from "@chakra-ui/react";

interface FormInputProps extends InputProps {
  placeholder: string;
}

export const FormInput = ({ placeholder, ...otherProps }: FormInputProps) => {
  return (
    <Input
      w="100%"
      bg="gray.700"
      borderRadius={5}
      fontSize="lg"
      padding={5}
      mb={5}
      color="white"
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default FormInput;
