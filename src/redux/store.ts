import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import rentalSlice from "./features/rentalBike/rentalSlice";

const persistConfig = {
  key: 'auth', 
  storage,
}

const persisteAuthReducer = persistReducer(persistConfig, authReducer)
const persistrRentalReducer = persistReducer(persistConfig, rentalSlice)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, 
    auth: persisteAuthReducer,
    rental: persistrRentalReducer, 
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
  }).concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store); 