import { HStack, Text, VStack } from "@chakra-ui/react"
import { chainConfigs } from "configs/frontend/chain/chainConfigs"
import { CONTACTS } from "lib/contact"
import { useRouter } from "next/router"
import { useMemo } from "react"
import HeaderLogo from "ui/snippets/header/HeaderLogo"
import IconSvg from "../IconSvg"
import LinkExternal from "../LinkExternal"

type Props = {
  isMaintenanceMode?: boolean
}

const AppMaintenance = ({ isMaintenanceMode }: Props) => {
  const chain = useRouter().query.chain as string

  const chainConfig = useMemo(
    () => chainConfigs.find((item) => item.chainKey === chain),
    [chain],
  )

  return (
    <VStack
      width="100%"
      minHeight="100%"
      justifyContent="space-between"
      inset={0}
      flex={1}
      paddingY={{
        base: "1.5rem",
        lg: "3rem",
      }}
      backgroundColor="neutral.light.1"
      paddingX={4}
      gap={{
        base: "3rem",
        lg: "6.25rem",
      }}
      color="neutral.light.7"
      marginX="auto"
      position="relative"
    >
      <HeaderLogo as="div" />

      <VStack gap={6} flex={1} justifyContent="center">
        <VStack>
          <IconSvg
            name="maintenance"
            boxSize={{
              base: "13.75rem",
              lg: "17.5rem",
            }}
            maxWidth="calc(100vw - 2rem)"
          />
        </VStack>

        <VStack gap={3}>
          <Text textStyle="225" textAlign="center">
            {isMaintenanceMode
              ? "Website Maintenance"
              : `${chainConfig?.networkType.capitalizeFirstLetter()} Maintenance`}
          </Text>

          <Text textStyle="1" textAlign="center">
            Our{" "}
            {isMaintenanceMode
              ? "website"
              : `${chainConfig?.networkType.capitalizeFirstLetter()} network`}{" "}
            is currently undergoing scheduled maintenance to improve your
            experience.
            <br />
            We'll be back online shortly. Thank you for your patience.
          </Text>
        </VStack>
      </VStack>

      <VStack gap={8}>
        {!isMaintenanceMode && (
          <VStack gap={3}>
            <Text>You can switch to another network</Text>
          </VStack>
        )}

        <VStack gap={6}>
          <Text textStyle="1" textAlign="center">
            {isMaintenanceMode ? "You can contact us via" : "Or contact us via"}
          </Text>

          <HStack gap={6}>
            {CONTACTS.map((contact) => (
              <LinkExternal href={contact.href} key={contact.href} noIcon>
                <IconSvg
                  name={contact.name}
                  boxSize="1.5rem"
                  color="neutral.light.7"
                />
              </LinkExternal>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default AppMaintenance
