export type StatsInterval = { id: StatsIntervalIds; title: string }
export type StatsIntervalIds = keyof typeof StatsIntervalId
export enum StatsIntervalId {
  all = 0,
  oneMonth = 1,
  threeMonths = 2,
  sixMonths = 3,
  oneYear = 4,
}
