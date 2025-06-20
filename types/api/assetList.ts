export type AssetList = Record<string, Asset[]>

export type Asset = {
  name: string
  description: string
  symbol: string
  base: string
  display: string
  denom_units: DenomUnit[]
  images: Images
  coingecko_id?: string
  type_asset?: string
}

// export type IAssetInfo = {
//   name: string;
//   symbol: string;
//   image: string | null;
//   decimals: number;
//   description: string;
//   metadata: JSONString<Asset>;
//   usd_price: number;
// };

export type DenomUnit = {
  denom: string
  exponent: number
}

export type Images = {
  png?: string
  svg?: string
}

export enum SocialPlatform {
  WHITEPAPER = "WHITEPAPER",
  BLOG = "BLOG",
  MEDIUM = "MEDIUM",
  GITHUB = "GITHUB",
  TELEGRAM = "TELEGRAM",
  TWITTER = "TWITTER",
  LINKEDIN = "LINKEDIN",
  FACEBOOK = "FACEBOOK",
  DISCORD = "DISCORD",
  SLACK = "SLACK",
  REDDIT = "REDDIT",
  BITCOINTALK = "BITCOINTALK",
  TICKETING = "TICKETING",
  OPENSEA = "OPENSEA",
}
export interface SocialProfile {
  platform: SocialPlatform
  url: string
  identifier?: string
}

export interface VerifiedAsset {
  id: string
  chain_id: string
  asset_type: string
  name: string
  description: string
  decimals: number
  identifier: string
  symbol: string
  metadata: string
  image: string
  coingecko_id?: string
  coinmarketcap_id?: string
  usd_price?: number
  add_from: string
  social_profiles: SocialProfile[]
  official_project_website?: string
  official_project_email?: string
  reputation?: string
}

export enum ChainId {
  Arctic1 = "arctic-1",
  Pacific1 = "pacific-1",
  Atlantic2 = "atlantic-2",
}
