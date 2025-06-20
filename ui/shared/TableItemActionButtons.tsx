import { HStack, IconButton, Skeleton, Tooltip } from "@chakra-ui/react"
import React from "react"

import IconSvg from "ui/shared/IconSvg"

type Props = {
  onEditClick: () => void
  onDeleteClick: () => void
  isLoading?: boolean
}

const TableItemActionButtons = ({
  onEditClick,
  onDeleteClick,
  isLoading,
}: Props) => {
  return (
    <HStack spacing={3} justifyContent={"end"} alignSelf="flex-end">
      <Tooltip label="Edit">
        <Skeleton isLoaded={!isLoading} borderRadius="full">
          <IconButton
            aria-label="edit"
            variant="rounded"
            boxSize={9}
            onClick={onEditClick}
            icon={<IconSvg name="edit_v2" boxSize={4} />}
            flexShrink={0}
          />
        </Skeleton>
      </Tooltip>
      <Tooltip label="Delete">
        <Skeleton isLoaded={!isLoading} borderRadius="full">
          <IconButton
            aria-label="delete"
            variant="rounded"
            boxSize={9}
            onClick={onDeleteClick}
            icon={<IconSvg name="delete_v2" boxSize={4} />}
            flexShrink={0}
          />
        </Skeleton>
      </Tooltip>
    </HStack>
  )
}

export default React.memo(TableItemActionButtons)
