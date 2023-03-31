import { Box, chakra, HStack, Image, Text, useRadio } from "@chakra-ui/react";

export const FormRadio = (props: any) => {
  const { image, ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        bg="transparent"
        w={12}
        p={1}
        mb="5"
        rounded="full"
      >
        <HStack>
          {state.isChecked ? (
            <Image  alt="ativo" src="/radio_on.png" rounded="full" {...getLabelProps()} />
          ) : (
            <Image alt="inativo" src="/radio_off.png" rounded="full" {...getLabelProps()} />
          )}

          <Text
            fontSize="2xl"
            color={state.isChecked ? "#1F6640" : "white"}
            mt={2}
          >
            {props.label}
          </Text>
        </HStack>
      </Box>
    </chakra.label>
  );
};

export default FormRadio;
