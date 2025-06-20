import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import type { NativeMessageEvent } from "types/api/transaction"
import Collapse from "ui/shared/Collapse"
import ExpandIcon from "ui/shared/ExpandIcon"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  event: NativeMessageEvent
}

const TxMessageEventItem = ({ event }: Props) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })
  return (
    <Collapse
      groupProps={{ width: "full" }}
      open={isOpen}
      header={
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={onToggle}
          width="full"
          gap={2}
          marginBottom={6}
        >
          <Text color="neutral.light.7" textStyle="1">
            {event.type}
          </Text>
          <ExpandIcon
            boxSize={4}
            duration={0.2}
            color="neutral.light.5"
            isExpanded={isOpen}
          ></ExpandIcon>
        </Flex>
      }
    >
      <Grid templateColumns="1.5rem 1fr" width="full" gap={3}>
        <GridItem
          display="flex"
          flexDirection="column"
          height="full"
          alignItems="center"
          paddingX={2}
          position="relative"
        >
          <Box
            height="full"
            width="1px"
            borderRight="1px"
            borderStyle="dashed"
            borderColor="neutral.light.6"
          ></Box>
          <IconSvg
            name="arrows/east-mini"
            color="neutral.light.6"
            transform="rotate(-90deg)"
            boxSize={2}
          />
        </GridItem>

        <GridItem
          display="flex"
          flexDirection="column"
          flex={1}
          gap={3}
          overflow="hidden"
        >
          {event.attributes.map((attribute) => {
            return (
              <Flex
                overflow="hidden"
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Text
                  whiteSpace="wrap"
                  wordBreak="break-all"
                  width={{ base: "full", lg: "10.25rem" }}
                  color="neutral.light.6"
                  fontWeight={500}
                  textStyle="875"
                >
                  {attribute.key}
                </Text>
                <Box flex={1} overflow="hidden">
                  <Text
                    whiteSpace="wrap"
                    wordBreak="break-all"
                    color="neutral.light.6"
                    textStyle="875"
                  >
                    {attribute.value}
                  </Text>
                </Box>
              </Flex>
            )
          })}
        </GridItem>
      </Grid>
    </Collapse>
  )
}

export default TxMessageEventItem
