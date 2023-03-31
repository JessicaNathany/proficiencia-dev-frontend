import { extendBaseTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#FFB78B",
    100: "#FD8338",
    500: "#F85F00",
  },
};

const styles = {
  global: {
    body: {
      bg: "gray.900",
      color: "white",
    },
  },
};

export const theme = extendBaseTheme({
  colors,
  styles,
});
