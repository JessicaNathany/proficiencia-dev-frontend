import { Box, chakra, HStack, Image, Text, useRadio } from "@chakra-ui/react";

export const FormRadio = (props: any) => {
  const { image, ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer" alignSelf="flex-start">
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        bg="transparent"
        p={1}
        mb="1"
        rounded="full"
        w="100%"
        flex={1}
      >
        <HStack>
          {state.isChecked ? (
            <Image
              alt="ativo"
              src="/radio_on.png"
              rounded="full"
              {...getLabelProps()}
            />
          ) : (
            <Image
              alt="inativo"
              src="/radio_off.png"
              rounded="full"
              {...getLabelProps()}
            />
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
