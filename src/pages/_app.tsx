import { useEffect, useState } from "react";

import { theme } from "@/styles/theme";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next/types";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { AuthEnabledComponentConfig } from "../types";

type AppAuthProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppAuthProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {Component.isPublic ? (
          <Component {...pageProps} />
        ) : (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  const { status, data } = useSession({ required: true });

  const router = useRouter();
  const isUser = !!data?.user?.email;
  const loading = status === "loading";

  useEffect(() => {
    if (loading) return;
    if (!isUser) {
      router.push("/login");
    }
  }, [router, isUser, loading]);

  if (isUser) {
    return children;
  }
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Spinner size="lg" width={100} height={100} />
    </Flex>
  );
}
