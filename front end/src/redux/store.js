import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import groupReducer from "./groupsSlice";

const persistAuthConfig = {
  key: "split-auth",
  storage,
};

const persistGroupsConfig = {
  key: "split-groups",
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistedGroupsReducer = persistReducer(
  persistGroupsConfig,
  groupReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    groups: persistedGroupsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
