import Select from "react-select";

import { FormControl } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

export type FormSelectOption = {
  value: number;
  label: string;
};

interface FormSelectProps {
  name: string;
  placeholder: string;
  options: FormSelectOption[];
}

export const FormSelect = ({
  name,
  placeholder,
  options,
  ...rest
}: FormSelectProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl isInvalid={!!error}>
            <Select
              options={options}
              onChange={(option) => onChange(option?.value)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "none",
                  boxShadow: "none",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 20,
                  color: "white",
                  background: "#2D3748",
                  marginBottom: 20,
                  "&:hover": {
                    border: "none",
                    boxShadow: "none",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#e2e8f0" : "white",
                  color: state.isSelected ? "black" : "black",
                  "&:hover": {
                    backgroundColor: "#e2e8f0",
                    color: "black",
                  },
                }),

                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),

                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "white",
                }),

                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: "none",
                }),

                menu: (provided) => ({
                  ...provided,
                  background: "#2D3748",
                  color: "white",
                  borderRadius: 5,
                }),

                menuList: (provided) => ({
                  ...provided,
                  padding: 0,
                }),

                placeholder: (provided) => ({
                  ...provided,
                  color: "#718096",
                }),

                valueContainer: (provided) => ({
                  ...provided,
                  padding: 0,
                }),
              }}
              placeholder={placeholder}
              {...rest}
            />
          </FormControl>
        );
      }}
    />
  );
};

export default FormSelect;
