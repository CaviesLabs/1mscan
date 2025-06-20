export type IGenesis = {
  genesis: {
    genesis_time: string
    chain_id: string
    initial_height: string
    consensus_params: {
      block: {
        max_bytes: string
        max_gas: string
      }
      evidence: {
        max_age_num_blocks: string
        max_age_duration: string
        max_bytes: string
      }
      validator: {
        pub_key_types: Array<string>
      }
      version: {
        app_version: string
      }
      synchrony: {
        precision: string
        message_delay: string
      }
      timeout: {
        propose: string
        propose_delta: string
        vote: string
        vote_delta: string
        commit: string
        bypass_commit_timeout: boolean
      }
      abci: {
        vote_extensions_enable_height: string
        recheck_tx: boolean
      }
    }
    validators: Array<{
      address: string
      pub_key: {
        type: string
        value: string
      }
      power: string
      name: string
    }>
    app_hash: any
    app_state: {
      accesscontrol: {
        params: object
        message_dependency_mapping: Array<any>
        wasm_dependency_mappings: Array<any>
      }
      auth: {
        params: {
          max_memo_characters: string
          tx_sig_limit: string
          tx_size_cost_per_byte: string
          sig_verify_cost_ed25519: string
          sig_verify_cost_secp256k1: string
        }
        accounts: Array<{
          "@type": string
          address: string
          pub_key: any
          account_number: string
          sequence: string
        }>
      }
      bank: {
        params: {
          send_enabled: Array<{
            denom: string
            enabled: boolean
          }>
          default_send_enabled: boolean
        }
        balances: Array<{
          address: string
          coins: Array<{
            denom: string
            amount: string
          }>
        }>
        supply: Array<any>
        denom_metadata: Array<any>
      }
      capability: {
        index: string
        owners: Array<any>
      }
      crisis: {
        constant_fee: {
          denom: string
          amount: string
        }
      }
      dex: {
        params: {
          price_snapshot_retention: string
          sudo_call_gas_price: string
          begin_block_gas_limit: string
          end_block_gas_limit: string
          default_gas_per_order: string
          default_gas_per_cancel: string
        }
        contractState: Array<any>
        lastEpoch: string
      }
      distribution: {
        params: {
          community_tax: string
          base_proposer_reward: string
          bonus_proposer_reward: string
          withdraw_addr_enabled: boolean
        }
        fee_pool: {
          community_pool: Array<any>
        }
        delegator_withdraw_infos: Array<any>
        previous_proposer: string
        outstanding_rewards: Array<any>
        validator_accumulated_commissions: Array<any>
        validator_historical_rewards: Array<any>
        validator_current_rewards: Array<any>
        delegator_starting_infos: Array<any>
        validator_slash_events: Array<any>
      }
      epoch: {
        params: object
        epoch: {
          genesis_time: string
          epoch_duration: string
          current_epoch: string
          current_epoch_start_time: string
          current_epoch_height: string
        }
      }
      evidence: {
        evidence: Array<any>
      }
      feegrant: {
        allowances: Array<any>
      }
      genutil: {
        gen_txs: Array<{
          body: {
            messages: Array<{
              "@type": string
              description: {
                moniker: string
                identity: string
                website: string
                security_contact: string
                details: string
              }
              commission: {
                rate: string
                max_rate: string
                max_change_rate: string
              }
              min_self_delegation: string
              delegator_address: string
              validator_address: string
              pubkey: {
                "@type": string
                key: string
              }
              value: {
                denom: string
                amount: string
              }
            }>
            memo: string
            timeout_height: string
            extension_options: Array<any>
            non_critical_extension_options: Array<any>
          }
          auth_info: {
            signer_infos: Array<{
              public_key: {
                "@type": string
                key: string
              }
              mode_info: {
                single: {
                  mode: string
                }
              }
              sequence: string
            }>
            fee: {
              amount: Array<any>
              gas_limit: string
              payer: string
              granter: string
            }
          }
          signatures: Array<string>
        }>
      }
      gov: {
        starting_proposal_id: string
        deposits: Array<any>
        votes: Array<any>
        proposals: Array<any>
        deposit_params: {
          min_deposit: Array<{
            denom: string
            amount: string
          }>
          max_deposit_period: string
          min_expedited_deposit: Array<{
            denom: string
            amount: string
          }>
        }
        voting_params: {
          voting_period: string
          expedited_voting_period: string
        }
        tally_params: {
          quorum: string
          threshold: string
          veto_threshold: string
          expedited_quorum: string
          expedited_threshold: string
        }
      }
      ibc: {
        client_genesis: {
          clients: Array<any>
          clients_consensus: Array<any>
          clients_metadata: Array<any>
          params: {
            allowed_clients: Array<string>
          }
          create_localhost: boolean
          next_client_sequence: string
        }
        connection_genesis: {
          connections: Array<any>
          client_connection_paths: Array<any>
          next_connection_sequence: string
          params: {
            max_expected_time_per_block: string
          }
        }
        channel_genesis: {
          channels: Array<any>
          acknowledgements: Array<any>
          commitments: Array<any>
          receipts: Array<any>
          send_sequences: Array<any>
          recv_sequences: Array<any>
          ack_sequences: Array<any>
          next_channel_sequence: string
        }
      }
      mint: {
        minter: {
          last_mint_amount: string
          last_mint_date: string
          last_mint_height: string
          denom: string
        }
        params: {
          mint_denom: string
          token_release_schedule:
            | Array<{
                start_date: string
                end_date: string
                token_release_amount: string
              }>
            | undefined
        }
      }
      nitro: {
        params: {
          whitelisted_tx_senders: Array<any>
        }
        slot: string
        sender: string
        stateRoot: string
        txs: Array<any>
      }
      oracle: {
        params: {
          vote_period: string
          vote_threshold: string
          reward_band: string
          whitelist: Array<{
            name: string
          }>
          slash_fraction: string
          slash_window: string
          min_valid_per_window: string
          lookback_duration: string
        }
        feeder_delegations: Array<any>
        exchange_rates: Array<any>
        penalty_counters: Array<any>
        aggregate_exchange_rate_votes: Array<any>
        price_snapshots: Array<any>
      }
      params: any
      slashing: {
        params: {
          signed_blocks_window: string
          min_signed_per_window: string
          downtime_jail_duration: string
          slash_fraction_double_sign: string
          slash_fraction_downtime: string
        }
        signing_infos: Array<any>
        missed_blocks: Array<any>
      }
      staking: {
        params: {
          unbonding_time: string
          max_validators: number
          max_entries: number
          historical_entries: number
          bond_denom: string
          min_commission_rate: string
          max_voting_power_ratio: string
          max_voting_power_enforcement_threshold: string
        }
        last_total_power: string
        last_validator_powers: Array<any>
        validators: Array<any>
        delegations: Array<any>
        unbonding_delegations: Array<any>
        redelegations: Array<any>
        exported: boolean
      }
      tokenfactory: {
        params: object
        factory_denoms: Array<any>
      }
      transfer: {
        port_id: string
        denom_traces: Array<any>
        params: {
          send_enabled: boolean
          receive_enabled: boolean
        }
      }
      upgrade: object
      vesting: object
      wasm: {
        params: {
          code_upload_access: {
            permission: string
            address: string
          }
          instantiate_default_permission: string
        }
        codes: Array<any>
        contracts: Array<any>
        sequences: Array<any>
        gen_msgs: Array<any>
      }
    }
  }
}

export type IABCI = {
  response: {
    data: string
    version: string
    last_block_height: string
    last_block_app_hash: string
  }
}

export type ITotalSupply = {
  amount: {
    denom: string
    amount: string
  }
}

export type IStakingPool = {
  pool: {
    not_bonded_tokens: string
    bonded_tokens: string
  }
}

export type INodeInfo = {
  default_node_info: {
    protocol_version: {
      p2p: string
      block: string
      app: string
    }
    node_id: string
    listen_addr: string
    network: string
    version: string
    channels: string
    moniker: string
    other: {
      tx_index: string
      rpc_address: string
    }
  }
  application_version: {
    name: string
    app_name: string
    version: string
    git_commit: string
    build_tags: string
    go_version: string
    build_deps: Array<{
      path: string
      version: string
      sum: string
    }>
    cosmos_sdk_version: string
  }
}

export type IChainStatus = {
  node_info: {
    protocol_version: {
      p2p: string
      block: string
      app: string
    }
    id: string
    listen_addr: string
    network: string
    version: string
    channels: string
    moniker: string
    other: {
      tx_index: string
      rpc_address: string
    }
  }
  application_info: {
    version: string
  }
  sync_info: {
    latest_block_hash: string
    latest_app_hash: string
    latest_block_height: string
    latest_block_time: string
    earliest_block_hash: string
    earliest_app_hash: string
    earliest_block_height: string
    earliest_block_time: string
    max_peer_block_height: string
    catching_up: boolean
    total_synced_time: string
    remaining_time: string
    total_snapshots: string
    chunk_process_avg_time: string
    snapshot_height: string
    snapshot_chunks_count: string
    snapshot_chunks_total: string
    backfilled_blocks: string
    backfill_blocks_total: string
  }
  validator_info: {
    address: string
    pub_key: {
      type: string
      value: string
    }
    voting_power: string
  }
}

export type IParamters = {
  tendermint_version: INodeInfo["application_version"]["build_deps"][number]["version"]
  ibc_version: INodeInfo["application_version"]["build_deps"][number]["version"]
  binary_version: INodeInfo["application_version"]["version"]
  min_deposit: IDeposit["deposit_params"]["min_deposit"][0]["amount"]
} & ITotalSupply &
  IStakingPool &
  Pick<INodeInfo["application_version"], "cosmos_sdk_version"> &
  Pick<IDeposit["deposit_params"], "max_deposit_period"> &
  Pick<ITallying["tally_params"], "quorum" | "threshold" | "veto_threshold"> &
  Pick<IVoting["voting_params"], "voting_period"> &
  IDistribution["params"] &
  ISlashing["params"] &
  Pick<
    IStaking["params"],
    | "max_validators"
    | "unbonding_time"
    | "max_entries"
    | "historical_entries"
    | "bond_denom"
  > &
  Pick<IInflation, "inflation">

export type IDeposit = Pick<
  IGenesis["genesis"]["app_state"]["gov"],
  "deposit_params"
>

export type ITallying = Pick<
  IGenesis["genesis"]["app_state"]["gov"],
  "tally_params"
>

export type IVoting = Pick<
  IGenesis["genesis"]["app_state"]["gov"],
  "voting_params"
>

export type ISlashing = Pick<
  IGenesis["genesis"]["app_state"]["slashing"],
  "params"
>

export type IStaking = Pick<
  IGenesis["genesis"]["app_state"]["staking"],
  "params"
>

export type IDistribution = Pick<
  IGenesis["genesis"]["app_state"]["distribution"],
  "params"
>

export type IInflation = {
  inflation: number
}

export type IMint = IGenesis["genesis"]["app_state"]["mint"]
export type IMinter = IGenesis["genesis"]["app_state"]["mint"]["minter"]
