import type { ArrayElement } from "types/utils"

import type { IPageableResourceName, IResponse } from "lib/api/resources"

export function generateListStub<R extends IPageableResourceName = any>(
  // stub: ArrayElement<PaginatedResponse<Resource>["items"]>,
  stub: ArrayElement<any>,
  num = 50,
  rest: Omit<IResponse<R>, "items">,
) {
  return {
    items: Array(num).fill(
      stub,
    ) as ArrayElement<// PaginatedResponse<Resource>["items"][number]
    any>,
    ...rest,
  } as IResponse<R>
}

export const generateKey = (
  index: number,
  // page: number,
  isLoading: boolean | Falsy,
  ...args: any[]
) => {
  return [...args, isLoading ? "loading_" + index : "loaded"].join("-")
}
