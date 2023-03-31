import { Select, SelectProps } from "@chakra-ui/react";

export type FormSelectOption = {
  id: number;
  label: string;
};

interface FormSelectProps extends SelectProps {
  placeholder: string;
  options: FormSelectOption[];
}

export const FormSelect = ({
  placeholder,
  options,
  ...otherProps
}: FormSelectProps) => {
  return (
    <Select
      variant="outline"
      w="100%"
      bg="tomato"
      borderColor="tomato"
      borderRadius={5}
      fontSize="lg"
      p={5}
      mb={5}
      size="lg"
      color="white"
      placeholder={placeholder}
      {...otherProps}
    >
      {options.map((option) => (
        <option style={{ padding: 20 }} key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default FormSelect;
