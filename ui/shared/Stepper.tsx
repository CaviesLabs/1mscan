import { Center, Flex, HStack, chakra } from "@chakra-ui/react"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import IconSvg from "./IconSvg"

type Props = {
  countIndex: number
  steps: {
    title: string
  }[]
}

const Stepper = ({ countIndex, steps }: Props) => {
  return (
    <HStack
      alignSelf="center"
      maxWidth="full"
      overflowX="auto"
      sx={{
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
      }}
    >
      <Flex alignItems="center" gap="3rem" marginBottom={2}>
        {steps.map((step, index) => {
          const active = index + 1 > countIndex
          const done = index + 1 < countIndex
          return (
            <chakra.button
              key={generateKey(0, false, step.title)}
              position="relative"
              aria-selected={active}
              borderColor="primary.light.4"
              transition="all 0.2s ease-in-out"
              borderRadius={6}
              borderWidth="1px"
              paddingLeft={2}
              paddingRight={4}
              paddingY={2}
              gap={2}
              display="flex"
              alignItems="center"
              height="2.5rem"
              color="neutral.light.1"
              textStyle="875"
              backgroundColor="primary.light.4"
              _after={{
                content: '""',
                position: "absolute",
                top: "50%",
                left: "calc(100% + 0.125rem)",
                width: "2.75rem",
                height: "1px",
                backgroundColor: "neutral.light.7",
                zIndex: 0,
              }}
              _last={{
                _after: {
                  display: "none",
                },
              }}
              _selected={{
                color: "neutral.light.7",
                borderColor: "neutral.light.7",
                backgroundColor: "neutral.light.1",
              }}
              _hover={{}}
              _focus={{}}
            >
              {!done && (
                <Center
                  aria-selected={active}
                  boxSize={6}
                  borderRadius={6}
                  borderWidth="1px"
                  borderColor="neutral.light.1"
                  _selected={{
                    borderColor: "neutral.light.7",
                  }}
                  transition="all 0.2s ease-in-out"
                  flexShrink={0}
                >
                  {index + 1}
                </Center>
              )}
              {done && (
                <IconSvg
                  color="primary.light.4"
                  name="check"
                  boxSize={6}
                  borderRadius="full"
                  backgroundColor="neutral.light.1"
                />
              )}
              <chakra.span
                aria-selected={active}
                color="neutral.light.1"
                _selected={{
                  color: "neutral.light.7",
                }}
                transition="all 0.2s ease-in-out"
              >
                {step.title}
              </chakra.span>
            </chakra.button>
          )
        })}
      </Flex>
    </HStack>
  )
}

export default memo(Stepper, (prev, next) => {
  return prev.countIndex === next.countIndex && prev.steps === next.steps
})
