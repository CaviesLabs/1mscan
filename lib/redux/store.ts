import { configureStore } from "@reduxjs/toolkit"
import isBrowser from "lib/isBrowser"
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux"
import addressReducer from "./reducers/address"
// import chainReducer, { type ChainState } from "./reducers/chain";
import navigationReducer from "./reducers/navigation"
import overlayReducer from "./reducers/overlay"
export const store = isBrowser()
  ? configureStore({
      reducer: {
        // chain: chainReducer,
        address: addressReducer,
        navigation: navigationReducer,
        overlay: overlayReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      // prepend and concat calls can be chained
    })
  : configureStore({
      reducer: {
        // chain: createSlice({
        //   name: "chain",
        //   initialState: {},
        //   reducers: {},
        // }).reducer as unknown as Reducer<ChainState>,
        address: addressReducer,
        navigation: navigationReducer,
        overlay: overlayReducer,
      },
    })

// Infer the type of store
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
