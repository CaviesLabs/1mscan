import { getServerChain } from "configs/server/chain"
import getApiServer from "lib/api/getApiServer"
import { getCache } from "lib/memory"
import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"
import { custom } from "nextjs/getServerSideProps"
import type { IParamters } from "types/api/chain"
import Parameters from "ui/pages/utilities/Parameters"

const Page = (props: Props & { parameters: IParamters }) => {
  return (
    <PageNextJs pathname="/parameters">
      <Parameters {...props} />
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/parameters">// </BuildHead>;
// };

export const getServerSideProps = custom(async (context, metadata) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60",
  )

  const chainKey = getServerChain(context.query, context.req)

  const parameters = await getCache(
    `parameter-${chainKey}`,
    async () => {
      const [
        nodeInfo,
        stakingPool,
        totalSupply,
        staking,
        slashing,
        distribution,
        tallying,
        voting,
        deposit,
        inflation,
      ] = await Promise.all([
        getApiServer(context, "params_node_info"),
        getApiServer(context, "params_staking_pool"),
        getApiServer(context, "params_total_supply"),
        getApiServer(context, "params_staking"),
        getApiServer(context, "params_slashing"),
        getApiServer(context, "params_distribution"),
        getApiServer(context, "params_tallying"),
        getApiServer(context, "params_voting"),
        getApiServer(context, "params_deposit"),
        getApiServer(context, "params_inflation"),
      ])

      return {
        tendermint_version:
          nodeInfo?.application_version.build_deps.find(
            (x) => x.path === "github.com/tendermint/tendermint",
          )?.version ?? "",
        ibc_version:
          nodeInfo?.application_version.build_deps.find(
            (x) => x.path === "github.com/cosmos/ibc-go/v3",
          )?.version ?? "",
        binary_version: nodeInfo?.application_version.version,
        ...totalSupply,
        ...stakingPool,
        cosmos_sdk_version: nodeInfo?.application_version.cosmos_sdk_version,
        min_deposit: deposit?.deposit_params.min_deposit[0].amount,
        max_deposit_period: deposit?.deposit_params.max_deposit_period,
        quorum: tallying?.tally_params.quorum,
        threshold: tallying?.tally_params.threshold,
        veto_threshold: tallying?.tally_params.veto_threshold,
        voting_period: voting?.voting_params.voting_period,
        ...distribution?.params,
        ...slashing?.params,
        max_validators: staking?.params.max_validators,
        unbonding_time: staking?.params.unbonding_time,
        max_entries: staking?.params.max_entries,
        historical_entries: staking?.params.historical_entries,
        bond_denom: staking?.params.bond_denom,
        inflation: inflation?.inflation,
      } as IParamters
    },
    600000,
  )

  return { props: { ...metadata, parameters } }
})

export default Page
