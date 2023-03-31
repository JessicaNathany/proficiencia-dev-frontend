import Select from "react-select";

export type FormSelectOption = {
  value: number;
  label: string;
};

interface FormSelectProps {
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
      options={options}
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
          marginBottom: 10,
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
          color: "white",
        }),

        valueContainer: (provided) => ({
          ...provided,
          padding: 0,
        }),
      }}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default FormSelect;
