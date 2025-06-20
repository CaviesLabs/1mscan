import { Link } from "@chakra-ui/next-js"
import { Box, Button, Center, Stack, chakra } from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import { useRouter } from "next/router"
import { type Route, route } from "nextjs-routes"
import { type ReactNode, memo } from "react"
import AppErrorIcon from "./AppErrorIcon"
import AppErrorTitle from "./AppErrorTitle"
import AppMaintenance from "./AppMaintenance"

type Props = {
  error?: any
  title?: ReactNode
  text?: ReactNode
}

const DATA_RESOURCE = {
  "/address/[hash]": {
    text: "address",
  },
  "/block/[height_or_hash]": {
    text: "block",
  },
  "/tx/[hash]": {
    text: "transaction",
  },
  "/ibc-relayer/[channel_id]/counterparty/[counterparty_channel_id]": {
    text: "IBC relayer",
  },
  "/token/[...slug]": {
    text: "token",
  },
  "/proposal/[id]": {
    text: "proposal",
  },
  "/validator/[hash]": {
    text: "validator",
  },
  "/subscriptions/[id]": {
    text: "subscription",
  },
  "/code-id/[id]": {
    text: "Code ID",
  },
} as const satisfies {
  [K in Route["pathname"]]?: {
    // title: string;
    text: string
  }
}

const AppContentError = ({ title, text, error }: Props) => {
  console.log(error)
  const router = useRouter()
  const pathname = router.pathname
  const { text: resource } = DATA_RESOURCE[pathname] || {
    text: "",
  }

  if (error === "MAINTENANCE_MODE") {
    return <AppMaintenance />
  }

  return (
    <Box position="static">
      <Stack
        flexDirection="column"
        top="calc(7rem + 1px)"
        left={0}
        right={0}
        bottom={{ base: "31.3125rem", lg: "16.8125rem" }}
        zIndex={2}
        minHeight="100vh"
        backgroundImage="/icons/error-background.svg"
        backgroundRepeat="no-repeat"
        backgroundSize={{
          base: "200%",
          lg: "150%",
          xl: "100%",
        }}
        position="absolute"
        backgroundPosition="center"
        alignItems="center"
      >
        {error?.status === 429 && (
          <AppErrorIcon
            id="error-icon"
            zIndex={0}
            position="absolute"
            // width="100%"
            // height="100%"
            inset={0}
            minHeight="unset"
            maxWidth="calc(100vw - 2rem)"
            // transform="translate(-50%, -50%)"
            status={error.status}
          />
        )}
        <Center
          zIndex={1}
          flexDirection="column"
          overflow="hidden"
          gap={4}
          margin={4}
          marginTop="30dvh"
          alignItems="stretch"
          fontSize="1rem"
          fontWeight={400}
          lineHeight="1.5rem"
          sx={{
            WebkitTextStroke: 0,
          }}
          color="neutral.light.8"
        >
          <AppErrorTitle title={title || "Data unavailable here"} />

          <chakra.span
            wordBreak="break-word"
            textAlign="center"
            marginX="auto"
            noOfLines={3}
            display="inline-block"
            whiteSpace="pre-wrap"
          >
            {(error?.status === 429 &&
              "Quotas exceeded. Please try again later.") ||
              text ||
              (resource && (
                <>
                  We couldn't find this {resource} on{" "}
                  {currentChainConfig.chainPrettyName
                    .replace("(", "")
                    .replace(")", "")}
                  .
                  <br />
                  It might be available on other networks or hasn't been indexed
                  yet.
                </>
              )) ||
              "Sorry! We encountered an unexpected error. Please try back again shortly."}
          </chakra.span>

          {error?.status !== 429 && (
            <Button
              as={Link}
              whiteSpace="nowrap"
              minWidth="9.1875rem"
              textAlign="center"
              variant="solid"
              marginX="auto"
              href={
                route({
                  pathname: "/",
                  query: {
                    chain: chainKey,
                  },
                }) as any
              }
            >
              Back home
            </Button>
          )}
        </Center>
      </Stack>
    </Box>
  )
}

export default memo(
  AppContentError,
  (prev, next) =>
    prev.error === next.error &&
    prev.title === next.title &&
    prev.text === next.text,
)
