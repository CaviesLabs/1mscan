import {
  Box,
  Center,
  Flex,
  Skeleton,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react"
import type React from "react"

import CopyToClipboard from "./CopyToClipboard"

interface Props {
  data: React.ReactNode
  title?: string
  className?: string
  rightSlot?: React.ReactNode
  beforeSlot?: React.ReactNode
  textareaMaxHeight?: string
  showCopy?: boolean
  isLoading?: boolean
}

const RawDataSnippet = ({
  data,
  className,
  title,
  rightSlot,
  beforeSlot,
  textareaMaxHeight,
  showCopy = true,
  isLoading,
}: Props) => {
  // see issue in theme/components/Textarea.ts
  const bgColor = useColorModeValue("#f5f5f6", "#1a1b1b")
  const isShowCopy = typeof data === "string" && showCopy
  return (
    <Box
      className={className}
      as="section"
      title={title}
      display="flex"
      flexDirection="column"
      gap={{ base: 2, lg: "0.38rem" }}
    >
      {(title || rightSlot || showCopy) && (
        <Flex
          justifyContent={title ? "space-between" : "flex-end"}
          alignItems="center"
          flexWrap="wrap"
          columnGap={{ base: 3, lg: 5 }}
          rowGap={2}

          // height="2rem"
        >
          <Flex
            flex={1}
            flexShrink={0}
            order={1}
            flexWrap="nowrap"
            height="2rem"
          >
            {title && (
              <Skeleton
                fontWeight={500}
                isLoaded={!isLoading}
                display="flex"
                alignItems="center"
              >
                <Text
                  as="span"
                  color="neutral.light.8"
                  fontSize="1rem"
                  fontWeight={500}
                  lineHeight="1.5rem"
                >
                  {title}
                </Text>
              </Skeleton>
            )}
          </Flex>
          {rightSlot && (
            <Box
              order={{ base: 3, lg: 2 }}
              flexShrink={0}
              flexGrow={isShowCopy ? { base: 1, lg: 0 } : 0}
              height="2rem"
              display="flex"
              _empty={{ display: "none" }}
            >
              {rightSlot}
            </Box>
          )}

          {isShowCopy && (
            <Center
              boxSize="2rem"
              order={{ base: 2, lg: 3 }}
              _empty={{ display: "none" }}
            >
              <CopyToClipboard text={data} isLoading={isLoading} />
            </Center>
          )}

          {/* </Flex> */}
        </Flex>
      )}
      {beforeSlot}
      <Skeleton isLoaded={!isLoading} borderRadius="0.5rem">
        <Box
          p={4}
          bgColor={isLoading ? "inherit" : bgColor}
          maxH={textareaMaxHeight || "20rem"}
          minH={isLoading ? "200px" : undefined}
          borderRadius="0.5rem"
          wordBreak="break-all"
          whiteSpace="pre-wrap"
          overflowY="auto"
          color="neutral.light.7"
          fontSize="1rem"
          fontWeight={400}
          lineHeight="1.5rem"
          backgroundColor="neutral.light.1"
          borderWidth="1px"
          borderColor="neutral.light.3"
        >
          {data}
        </Box>
      </Skeleton>
    </Box>
  )
}

export default chakra(RawDataSnippet)
