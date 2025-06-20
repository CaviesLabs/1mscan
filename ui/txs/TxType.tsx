import { memo } from "react"
import Tag, { type TagProps } from "ui/shared/chakra/Tag"

type Props = {
  label: string
  isLoading?: any
} & Omit<TagProps, "isLoading">

const TxType = ({ label, colorScheme, isLoading, ...props }: Props) => {
  return (
    <Tag
      colorScheme={colorScheme}
      variant="subtle"
      isLoading={Boolean(isLoading)}
      {...props}
    >
      {label}
    </Tag>
  )
}

export default memo(TxType)
