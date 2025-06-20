import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { route } from "nextjs-routes"
import { memo } from "react"
import LinkToAssociation from "ui/address/association/LinkToAssociation"
import IconSvg from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"

type Props = {
  current: string
  associationHash: string | undefined
  addressType: "evm" | "native"
  oppositeType: "evm" | "native"
  isLoading: boolean | undefined
  count: number | undefined
}

const WalletProfileAssociation = ({
  current,
  associationHash,
  oppositeType,
  addressType,
  isLoading,
  count,
}: Props) => {
  return (
    <DetailsInfoGroup
      header={{
        element: <>{getLanguage("wallet_profile_page.address")}</>,
        hasDivider: true,
        icon: <IconSvg name="tools/wallet" boxSize="22px" />,
      }}
    >
      <InfoItem
        _first={{
          marginTop: 4,
        }}
        title={
          addressType === "evm"
            ? getLanguage("wallet_profile_page.your_evm_wallet")
            : getLanguage("wallet_profile_page.your_sei_wallet")
        }
        isLoading={isLoading}
        titleProps={{
          width: {
            base: "max-content",
            lg: "10rem",
          },
        }}
        gap={2}
        flexDirection={{
          base: "row",
          lg: "row",
        }}
        justifyContent="space-between"
        overflow="hidden"
        displayPadding="none"
        flexWrap="wrap"
        alignItems={{
          base: "flex-start",
          lg: "center",
        }}
        contentProps={{
          flexShrink: 0,
          flex: {
            lg: 1,
          },
          minWidth: "max-content",
        }}
      >
        <Flex
          flex={1}
          gap={1}
          width={{
            base: "11rem",
            lg: "unset",
          }}
          justifyContent="space-between"
          alignItems={{ base: "stretch", lg: "center" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <AddressV2
            noIcon
            isLoading={isLoading}
            flex={1}
            truncation="dynamic"
            headLength={6}
            tailLength={6}
            textStyle="1"
            color="secondary.light.text.orange"
            address={{ hash: current }}
          />

          {count === 2 && (
            <LinkInternal
              href={route({
                pathname: "/tool/wallet-profile",
                query: {
                  address_type: oppositeType,
                },
              })}
              isLoading={isLoading}
              color="primary.light.4"
              _hover={{
                textDecoration: "underline",
                color: "accent.red",
              }}
            >
              {getLanguage("wallet.switch_to")}{" "}
              {(oppositeType === "evm" && getLanguage("common.evm")) ||
                (oppositeType === "native" && getLanguage("common.native")) ||
                ""}{" "}
              {getLanguage("wallet.wallet")}
            </LinkInternal>
          )}
        </Flex>
      </InfoItem>
      <InfoItem
        title={getLanguage("wallet_profile_page.associated_with")}
        isLoading={isLoading}
        titleProps={{
          width: {
            base: "max-content",
            lg: "10rem",
          },
        }}
        gap={2}
        flexDirection={{
          base: "row",
          lg: "row",
        }}
        justifyContent="space-between"
        overflow="hidden"
        displayPadding="none"
        flexWrap="wrap"
        alignItems={{
          base: "flex-start",
          lg: "center",
        }}
        contentProps={{
          flexShrink: 0,
          flex: {
            lg: 1,
          },
          minWidth: "11rem",
        }}
      >
        <AddressV2
          isLoading={isLoading}
          address={{ hash: associationHash }}
          truncation="constant"
          headLength={6}
          tailLength={6}
          textStyle="1"
          color="secondary.03.text"
          noIcon
          fallback={<LinkToAssociation />}
        />
      </InfoItem>
    </DetailsInfoGroup>
  )
}

export default memo(WalletProfileAssociation, (prev, next) => {
  return (
    prev.current === next.current &&
    prev.addressType === next.addressType &&
    prev.associationHash === next.associationHash &&
    prev.oppositeType === next.oppositeType &&
    prev.isLoading === next.isLoading &&
    prev.count === next.count
  )
})
