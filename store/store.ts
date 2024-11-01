import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slice/userSlice'
import AuthSlice from './slice/authSlice'
import CommunitySlice from './slice/communitySlice'

import messageReducer from './message'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    feed: CommunitySlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch