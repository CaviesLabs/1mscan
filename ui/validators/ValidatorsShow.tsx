import { HStack, VStack } from "@chakra-ui/react"
import { memo, useMemo } from "react"
import type { IValidatorDelegator } from "types/api/validator"
import PopoverShow from "ui/shared/PopoverModal/PopoverShow"
import Tag from "ui/shared/chakra/Tag"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"

type Props = {
  isLoading?: boolean
  validators: IValidatorDelegator["validators"] | undefined
}

const ValidatorsShow = ({ isLoading, validators }: Props) => {
  const items = useMemo(() => {
    if (isLoading) return { first: undefined, others: [] }

    const allItems = [...(validators || [])]
    const first = allItems.shift()

    return {
      first: first,
      others: allItems,
    }
  }, [validators, isLoading])

  return (
    <HStack gap={2}>
      <AddressEntityV2
        address={{
          hash: items.first?.operator_address,
          name: items.first?.name,
          image_url: items.first?.image_url,
        }}
        gap={3}
        iconProps={{
          boxSize: 8,
        }}
        nameProps={{
          textStyle: "87500",
        }}
        isLoading={isLoading}
        isValidator
        showAddress={false}
        noCopy
      />

      {Boolean(items.others.length) && (
        <PopoverShow
          isDisabled={!items.others.length || isLoading}
          bodyProps={{
            padding: "0.25rem 0",
            overflowY: "auto",
            maxHeight: "15rem",
          }}
          content={
            <VStack gap={0} alignItems="stretch" borderRadius={2}>
              {items.others.map((item) => (
                <AddressEntityV2
                  key={item.operator_address}
                  address={{
                    hash: item.operator_address,
                    name: item.name,
                    image_url: item.image_url,
                  }}
                  paddingY={2}
                  paddingX={3}
                  gap={2}
                  iconProps={{
                    boxSize: 8,
                  }}
                  nameProps={{
                    textStyle: "87500",
                  }}
                  isValidator
                  showAddress={false}
                  noCopy
                />
              ))}
            </VStack>
          }
        >
          <Tag
            isLoading={isLoading}
            sx={{
              _hover: {
                borderColor: "secondary.04",
                _groupHover: {
                  borderColor: "secondary.04",
                },
              },
            }}
          >
            +{items.others.length}
          </Tag>
        </PopoverShow>
      )}
    </HStack>
  )
}

export default memo(ValidatorsShow, (prev, next) => {
  return (
    prev.validators === next.validators && prev.isLoading === next.isLoading
  )
})
