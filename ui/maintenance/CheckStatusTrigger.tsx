import useApiFetch from "lib/api/useApiFetch"
import moment from "moment"
import { memo, useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"
import type { IJsonChainConfigs } from "types/api"

const CheckStatusTrigger = ({ configs }: { configs: IJsonChainConfigs }) => {
  const { showBoundary } = useErrorBoundary()

  const apiFetch = useApiFetch()

  useEffect(() => {
    if (!configs.common.MAINTENANCE_CHAIN_MODE) return

    apiFetch("blocks", {
      queryParams: {
        limit: 1,
      },
    })
      .then((evm) => {
        if (moment(evm.items[0].timestamp).add(4, "hours").isBefore()) {
          showBoundary("MAINTENANCE_MODE")
          return
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.status === 429) {
          showBoundary({
            status: 429,
          })
          return
        }

        if (error.status >= 500) {
          showBoundary("MAINTENANCE_MODE")
          return
        }
      })

    apiFetch("latest_txs_validated", {
      queryParams: {
        type: "Cosmos",
      },
    })
      .then((native) => {
        if (moment(native.items[0].timestamp).add(4, "hours").isBefore()) {
          showBoundary("MAINTENANCE_MODE")
          return
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.status === 429) {
          showBoundary({
            status: 429,
          })
          return
        }

        if (error.status >= 500) {
          showBoundary("MAINTENANCE_MODE")
          return
        }
      })
  }, [])

  return <></>
}

export default memo(CheckStatusTrigger, () => true)
