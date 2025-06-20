import { chakra } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import { isEvmAddressTest } from "lib/getOSType"
import { memo } from "react"
import DataListDisplay from "ui/shared/DataListDisplay"

type Props = {
  hash: string | undefined
  isLoading?: boolean
}

const TokenChart = ({ hash, isLoading }: Props) => {
  const { data: src, isPending } = useApiQuery("token_chart_check", {
    queryParams: {
      hash,
    },
    queryOptions: {
      select: (data) => {
        if (data.isExist) {
          return `https://dexscreener.com/seiv2/${hash}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=light&theme=light&chartStyle=1&chartType=usd&interval=240`
        }

        return `https://www.geckoterminal.com/sei-evm/pools/${hash}?embed=1&info=0&swaps=0&grayscale=0&light_chart=1&chart_type=price&resolution=4h&load_chart_settings=0&interval=240`
      },
      enabled: !isLoading && isEvmAddressTest(hash as any),
    },
  })

  return (
    <DataListDisplay
      isLoading={isLoading || isPending}
      isEmpty={!src}
      emptyText="Chart data is currently unavailable"
      loadingProps={{
        borderColor: "neutral.light.3",
        borderWidth: "1px",
        borderRadius: 3,
        backgroundColor: "neutral.light.1",
      }}
      emptyProps={{
        borderColor: "neutral.light.3",
        borderWidth: "1px",
        borderRadius: 3,
        backgroundColor: "neutral.light.1",
      }}
    >
      <chakra.iframe
        width="100%"
        height="50rem"
        allow="clipboard-write"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="strict-origin-when-cross-origin"
        src={src!}
      />
    </DataListDisplay>
  )
}

export default memo(TokenChart, (prev, next) => {
  return prev.hash === next.hash && prev.isLoading === next.isLoading
})
