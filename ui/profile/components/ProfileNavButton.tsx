import type { ButtonProps } from "@chakra-ui/react"
import { Box, Button, Flex, Skeleton, chakra } from "@chakra-ui/react"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import type { ProfileSideBarItem } from "../types"

type Props = {
  isLoading?: boolean
  isSelected?: boolean
} & Partial<ButtonProps> &
  Pick<ProfileSideBarItem, "icon" | "title" | "isDisabled" | "isComingSoon">

const ProfileNavButton = ({
  isLoading,
  isSelected,
  onClick,
  isDisabled,
  icon,
  title,
  isComingSoon,
  ...props
}: Props) => {
  return (
    <Skeleton isLoaded={!isLoading} borderRadius="0.25rem">
      <Button
        width="full"
        variant="sidebar"
        justifyContent="flex-start"
        paddingX={{ base: 2, lg: 3 }}
        paddingY={2}
        columnGap={3}
        alignItems="center"
        onClick={onClick}
        isDisabled={isDisabled}
        aria-selected={isSelected}
        backgroundColor="unset"
        _selected={{
          backgroundColor: "neutral.light.3",
        }}
        _hover={{
          backgroundColor: "neutral.light.3",
        }}
        _disabled={{
          cursor: "default",
          backgroundColor: "unset",
          _hover: {
            backgroundColor: "unset",
          },
        }}
        {...props}
      >
        {icon && (
          <IconSvg
            aria-disabled={isDisabled}
            boxSize={5}
            color="inherit"
            flexShrink={0}
            _hover={{ color: "inherit" }}
            _disabled={{ opacity: 0.5 }}
            name={icon}
          ></IconSvg>
        )}
        <Flex
          alignItems="center"
          gap={1}
          flex={1}
          justifyContent="space-between"
        >
          <chakra.span
            textStyle="1"
            aria-disabled={isDisabled}
            _disabled={{ opacity: 0.5 }}
          >
            {title}
          </chakra.span>
          {isComingSoon && (
            <Box
              borderColor="primary.light.2"
              bgColor="primary.light.1"
              color="primary.light.4"
              borderWidth="0.5px"
              borderRadius="0.125rem"
              paddingX={1}
              paddingY={0}
              textStyle="625"
            >
              Coming soon
            </Box>
          )}
        </Flex>
      </Button>
    </Skeleton>
  )
}

export default memo(ProfileNavButton)
