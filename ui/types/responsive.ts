export type IResponsive<T = unknown> =
  | T
  | {
      base?: T
      lg?: T
      "2lg"?: T
      xl?: T
    }
