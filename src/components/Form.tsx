import { Flex } from "@chakra-ui/react";

type FormProps = {
  children: React.ReactNode;
  onSubmit: any;
};

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Flex as="form" width="100%" flexDir="column" onSubmit={onSubmit}>
      {children}
    </Flex>
  );
}
