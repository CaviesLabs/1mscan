export type ArrayElement<ArrType> = ArrType extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never
