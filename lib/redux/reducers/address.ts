import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { TokenType } from "types/api/token"

export type AddressState = {
  tokenType: TokenType
}

const initialState: AddressState = {
  tokenType: "ERC-721",
}

export const addressReducer = createSlice({
  name: "address",
  initialState,
  reducers: {
    changeTokenType: (state, data: PayloadAction<TokenType>) => {
      return {
        ...state,
        tokenType: data.payload,
      }
    },
  },
})

export const { changeTokenType } = addressReducer.actions
export default addressReducer.reducer
