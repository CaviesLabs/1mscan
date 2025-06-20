import { Tooltip } from "@chakra-ui/react"

import BigNumber from "bignumber.js"

import type { TxStateChange } from "types/api/txStateChanges"

import config from "configs/app"

import Tag from "ui/shared/chakra/Tag"

import CurrencyValue from "ui/shared/CurrencyValue"
import NFTEntityV2 from "ui/shared/entities/nft/NFTEntityV2"
import TokenEntityV2 from "ui/shared/entities/token/TokenEntityV2"
import { zeroAddress } from "viem"
import TxStateTokenIdList from "./TxStateTokenIdList"

export function getStateElements(data: TxStateChange, isLoading?: boolean) {
  const tag = (() => {
    if (data.is_miner) {
      return (
        <Tooltip label="A block producer who successfully included the block into the blockchain">
          <Tag
            textTransform="capitalize"
            colorScheme="orange"
            isLoading={isLoading}
          >
            Validator
          </Tag>
        </Tooltip>
      )
    }

    if (data.address.hash === zeroAddress) {
      const changeDirection = (() => {
        if (Array.isArray(data.change)) {
          const firstChange = data.change[0]
          return firstChange.direction
        }
        return Number(data.change) > 0 ? "to" : "from"
      })()

      if (changeDirection) {
        const text = changeDirection === "from" ? "Mint" : "Burn"
        return (
          <Tooltip label="Address used in tokens mintings and burnings">
            <Tag
              textTransform="capitalize"
              colorScheme="orange"
              isLoading={isLoading}
            >
              {text} address
            </Tag>
          </Tooltip>
        )
      }
    }

    return null
  })()

  switch (data.type) {
    case "coin": {
      const beforeBn = BigNumber(data.balance_before || "0").div(
        10 ** config.chain.currency.decimals,
      )
      const afterBn = BigNumber(data.balance_after || "0").div(
        10 ** config.chain.currency.decimals,
      )
      const differenceBn = afterBn.minus(beforeBn)
      const changeColor = beforeBn.lte(afterBn)
        ? "secondary.02.text"
        : "accent.red"
      const changeSign = beforeBn.lte(afterBn) ? "+" : "-"

      return {
        before: (
          <CurrencyValue
            textStyle="875"
            color="neutral.light.7"
            value={beforeBn}
            isLoading={isLoading}
            currency={config.chain.currency.symbol}
            decimals={0}
          ></CurrencyValue>
        ),
        after: (
          <CurrencyValue
            textStyle="875"
            color="neutral.light.7"
            value={afterBn}
            isLoading={isLoading}
            currency={config.chain.currency.symbol}
            decimals={0}
          ></CurrencyValue>
        ),
        change: (
          <CurrencyValue
            textStyle="875"
            color={changeColor}
            value={differenceBn.abs()}
            isLoading={isLoading}
            decimals={0}
            prefix={changeSign}
          ></CurrencyValue>
        ),
        tag,
      }
    }
    case "token": {
      const tokenLink = (
        <TokenEntityV2
          token={data.token}
          isLoading={isLoading}
          noIcon
          noCopy
          w="auto"
          noTooltip
          confirmIconPosition="none"
        />
      )
      const beforeBn = BigNumber(data.balance_before || "0").div(
        BigNumber(10 ** Number(data.token.decimals)),
      )
      const afterBn = BigNumber(data.balance_after || "0").div(
        BigNumber(10 ** Number(data.token.decimals)),
      )
      const change = (() => {
        let differenceBn
        if (typeof data.change === "string") {
          differenceBn = BigNumber(data.change || "0").div(
            BigNumber(10 ** Number(data.token.decimals)),
          )
        } else {
          differenceBn = afterBn.minus(beforeBn)
        }

        if (!differenceBn || differenceBn.isEqualTo(0)) {
          return null
        }

        const changeColor = differenceBn.isGreaterThanOrEqualTo(0)
          ? "secondary.02.text"
          : "accent.red"
        const changeSign = differenceBn.isGreaterThanOrEqualTo(0) ? "+" : "-"

        return (
          <CurrencyValue
            textStyle="875"
            color={changeColor}
            value={differenceBn.abs()}
            isLoading={isLoading}
            decimals={0}
            prefix={changeSign}
          ></CurrencyValue>
        )
      })()

      const tokenId = (() => {
        if (!Array.isArray(data.change)) {
          if ("token_id" in data && data.token_id) {
            return (
              <NFTEntityV2
                hash={data.token.address}
                id={data.token_id}
                isLoading={isLoading}
                src={undefined}
                float="right"
              />
            )
          } else {
            return null
          }
        }

        return (
          <TxStateTokenIdList
            items={data.change}
            tokenAddress={data.token.address}
            isLoading={isLoading}
          />
        )
      })()

      return {
        before: data.balance_before ? (
          <CurrencyValue
            textStyle="875"
            color="neutral.light.7"
            value={beforeBn}
            isLoading={isLoading}
            currency={tokenLink}
            decimals={0}
          ></CurrencyValue>
        ) : null,
        after: data.balance_after ? (
          <CurrencyValue
            textStyle="875"
            color="neutral.light.7"
            value={afterBn}
            isLoading={isLoading}
            currency={tokenLink}
            decimals={0}
          ></CurrencyValue>
        ) : null,
        change,
        tag,
        tokenId,
      }
    }
  }
}
