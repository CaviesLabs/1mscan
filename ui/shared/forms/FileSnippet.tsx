import { Button, Center, Flex, Text } from "@chakra-ui/react"
import { filesize } from "filesize"
import { memo } from "react"
import IconSvg from "../IconSvg"
import { getFileExtension } from "./utils/files"

type Props = {
  file: File
  onDelete?: (file: File) => void
  isDisabled?: boolean
}

const FileSnippet = ({ file, onDelete, isDisabled }: Props) => {
  const fileExtension = getFileExtension(file)
  return (
    <Flex
      paddingX="0.375rem"
      paddingY={1}
      gap={2}
      alignItems="center"
      backgroundColor={isDisabled ? "neutral.light.4" : "neutral.light.2"}
      borderRadius="0.5rem"
      borderWidth="1px"
      borderColor="neutral.light.3"
      onClick={(e) => e.stopPropagation()}
    >
      <Center boxSize={8} borderRadius="full" backgroundColor="neutral.light.3">
        <IconSvg
          name={`files/${fileExtension}` as any}
          boxSize={5}
          color="neutral.light.6"
        ></IconSvg>
      </Center>
      <Flex gap={2} flex={1}>
        <Flex flexDirection="column">
          <Text variant="light7">
            {file.name.replace(`.${fileExtension}`, "").length > 6
              ? `${file.name.slice(0, 6)}...${fileExtension}`
              : file.name}
          </Text>
          <Text variant="light6">
            {filesize(file.size, { round: 1, spacer: "" })}
          </Text>
        </Flex>

        <Center
          as={Button}
          variant="unstyled"
          boxSize={5}
          onClick={(e: any) => {
            onDelete?.(file)
            e.stopPropagation()
          }}
          isDisabled={isDisabled}
        >
          <IconSvg boxSize={3} color="neutral.light.6" name="close"></IconSvg>
        </Center>
      </Flex>
    </Flex>
  )
}

export default memo(FileSnippet)
