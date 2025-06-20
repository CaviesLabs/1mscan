/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import queryString from "query-string"

export type NavigationState = {
  stack: string[]
}

const initialState: NavigationState = {
  stack: [],
}

export const navigationReducer = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    onPathnameChange: (state) => {
      const parsed = queryString.parse(window.location.search)
      const tab = parsed.tab

      // Lấy pathname từ URL
      const pathname = window.location.pathname

      // Tạo object chứa các query mới
      const newQuery = { tab }

      // Tạo URL mới từ pathname và query mới
      const currentURL = new URL(
        window.location.origin +
          pathname +
          "?" +
          queryString.stringify(newQuery),
      )
      const getURL = (index: number) => {
        try {
          return new URL(
            window.location.origin + state.stack[state.stack.length + index],
          )
        } catch (error) {
          return undefined
        }
      }

      if (currentURL.pathname === getURL(-1)?.pathname) {
        state.stack[state.stack.length - 1] = currentURL
          .toString()
          .replace(window.location.origin, "")
        state.stack = [...state.stack]
        return state
      }
      if (
        state.stack.length >= 1 &&
        currentURL.pathname === getURL(-2)?.pathname
      ) {
        const stack = [...state.stack].slice(0, state.stack.length - 1)
        state.stack = stack
        return state
      }
      const stack = [
        ...state.stack,
        currentURL.toString().replace(window.location.origin, ""),
      ].slice(-10)

      state.stack = stack

      return state
    },
  },
})

// creators are generated for each case reducer function
export const { onPathnameChange } = navigationReducer.actions

export default navigationReducer.reducer
