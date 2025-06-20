import type { FlexProps } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { route } from "nextjs-routes"
import type { FC } from "react"
import { useState } from "react"
import IconSvg, { type IconName } from "ui/shared/IconSvg"

export type PromotedBadgeProps = FlexProps & {
  pathname: string
  defaultIcon: IconName
  activeIcon: IconName
  name: string
}

export const PromotedBadge: FC<PromotedBadgeProps> = ({
  pathname,
  name,
  defaultIcon,
  activeIcon,
  ...props
}) => {
  const [onHovered, setOnHovered] = useState(false)
  const router = useRouter()

  const isActivated = router.pathname === pathname

  return (
    <Flex
      gap="4px"
      pl="6px"
      pr="8px"
      borderRadius="4px"
      border="1px solid"
      borderColor={
        onHovered || isActivated ? "primary.light.4" : "secondary.01"
      }
      bg={onHovered || isActivated ? "primary.light.1" : "secondary.01.bg"}
      alignItems="center"
      position="relative"
      order={3}
      _hover={{
        borderColor: "primary.light.4",
        bg: "primary.light.1",
      }}
      cursor="pointer"
      onMouseMove={() => setOnHovered(true)}
      onMouseLeave={() => setOnHovered(false)}
      onClick={() =>
        router.push(
          route({
            pathname: pathname as any,
          }) as any,
        )
      }
      {...props}
    >
      <IconSvg
        name={onHovered || isActivated ? activeIcon : defaultIcon}
        boxSize="12px"
        fill="#BD0F36"
      />
      <Text
        size="md"
        colorScheme={onHovered || isActivated ? "primary4" : "orange"}
      >
        {name}
      </Text>
    </Flex>
  )
}
