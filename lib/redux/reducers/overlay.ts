import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export type OverlayState = {
  registerdIds: string[]
  currentId: string | undefined
}

export const overlayReducer = createSlice({
  name: "overlay",
  initialState: {
    registerdIds: [],
    currentId: undefined,
  } as OverlayState,
  reducers: {
    addOverlayAndOpen: (state, data: PayloadAction<{ id: string }>) => {
      return {
        registerdIds: [...state.registerdIds, data.payload.id],
        currentId: data.payload.id,
      }
    },
    open: (state, data: PayloadAction<{ id: string }>) => {
      return {
        registerdIds: [...state.registerdIds, data.payload.id].filter(Boolean),
        currentId: data.payload.id,
      }
    },
    close: (state) => {
      return {
        ...state,
        currentId: undefined,
      }
    },
  },
})

// creators are generated for each case reducer function
export const { addOverlayAndOpen, open, close } = overlayReducer.actions

export default overlayReducer.reducer
