import { Button, HStack, Skeleton, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { setQuery } from "lib/router/setQuery"
import { memo, useEffect, useRef } from "react"
import type { AddressTokensCounter } from "types/api/address"
import ArrowToggle from "ui/shared/ArrowToggle"
import IconSvg from "ui/shared/IconSvg"
import Loading from "ui/shared/Loading"
import PopoverFlexiable, {
  type PopoverFlexiableRef,
} from "ui/shared/PopoverModal/PopoverFlexiable"
import { smoothScroll } from "ui/utils/dom"
import TokenSelectMenu from "./TokenSelectMenu"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  current: string
  isLoading?: boolean
  counter: AddressTokensCounter & {
    nft_count: number
    total_count: number
  }
  isCounterLoading?: boolean
}

const TokenSelect = ({
  isLoading,
  current,
  counter,
  evmHash,
  nativeHash,
  isCounterLoading,
}: Props) => {
  const popoverRef = useRef<PopoverFlexiableRef>(null)

  useEffect(() => {
    popoverRef.current?.setIsOpen?.(false)
  }, [current])

  return (
    <HStack spacing={2}>
      <PopoverFlexiable
        borderRadius="0.75rem"
        width={{
          lg: "26.5rem",
        }}
        height={{
          base: "calc(100dvh - 2rem)",
          lg: "max-content",
        }}
        isDisabledMobilePlacement
        allowedPlacements={["bottom"]}
        isLazy
        toggle={false}
        disabledBodyScrollOn={{ mobile: true, desktop: false }}
        overlayOn={{ mobile: true, desktop: false }}
        content={({ isMounted }) =>
          isMounted ? (
            <TokenSelectMenu
              current={current}
              evmHash={evmHash}
              nativeHash={nativeHash}
              counter={counter}
              isLoading={isLoading || isCounterLoading}
            />
          ) : (
            <></>
          )
        }
      >
        {({ isOpen }) => (
          <Skeleton position="relative" isLoaded={!isLoading}>
            <Button
              isActive={isOpen}
              variant="primary"
              display="flex"
              alignItems="center"
              gap={2}
              transitionProperty="width, height"
              transitionDuration="0.3s"
              transitionTimingFunction="ease-in-out"
            >
              {isCounterLoading ? (
                <Loading boxSize={4} />
              ) : (
                <IconSvg boxSize={4} name="layouts/app" color="inherit" />
              )}

              <chakra.span textStyle="875">
                {counter.total_count > 99 ? ">" : ""}
                {Math.min(99, counter.total_count)}{" "}
                {counter.total_count !== 1
                  ? getLanguage("token.tokens").toLowerCase()
                  : getLanguage("token.token").toLowerCase()}
              </chakra.span>
              <ArrowToggle boxSize={3} isOpen={isOpen} />
            </Button>
          </Skeleton>
        )}
      </PopoverFlexiable>

      <Skeleton isLoaded={!isLoading}>
        <Button
          variant="primary"
          boxSize={9}
          padding={2}
          onClick={(e) => {
            setQuery("tab", "token_holdings").then(() => {
              smoothScroll("routed-tabs", 0, { delay: 20 })
            })
            e.stopPropagation()
          }}
        >
          <IconSvg name="wallet" color="inherit" boxSize={5} />
        </Button>
      </Skeleton>
    </HStack>
  )
}

export default memo(TokenSelect, (prev, next) => {
  return (
    prev.current === next.current &&
    prev.isLoading === next.isLoading &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.counter === next.counter &&
    prev.isCounterLoading === next.isCounterLoading
  )
})
