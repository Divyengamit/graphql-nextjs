/* import { configureStore } from "@reduxjs/toolkit";

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
import { createStore } from "redux";

import { createWrapper, HYDRATE } from "next-redux-wrapper";

import reducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const makeStore = createStore(reducer);
export const wrapper = createWrapper(store)(makeStore, { debug: true });
// export const wrapper = createWrapper(store);
setupListeners(store.dispatch);
export const persistor = persistStore(store);
 */

// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import thunkMiddleware from "redux-thunk";

// // import authReducer from "./auth";
// import authReducer from "./auth/loginSlice";

// const bindMiddleware = (middleware) => {
//   // if (process.env.NODE_ENV !== "production") {
//   //   const { composeWithDevTools } = require("redux-devtools-extension");
//   //   return composeWithDevTools(applyMiddleware(...middleware));
//   // }
//   return applyMiddleware(...middleware);
// };

// const combinedReducer = combineReducers({
//   auth: authReducer,
// });

// const reducer = (state, action) => {
//   return combinedReducer(state, action);
// };

// const initStore = () => {
//   return createStore(reducer, bindMiddleware([thunkMiddleware]));
// };

// export const wrapper = createWrapper(initStore);

// import { Action, configureStore, Store } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { MakeStore } from "next-redux-wrapper";
// import authReducer from "./auth/loginSlice";

// const rootReducer = combineReducers({
//   weaponsReducer: authReducer,
// });

// const RootState = rootReducer;
// export const AppThunk = ThunkAction(RootState);

// const makeStore = () => {
//   const store = configureStore({
//     reducer: rootReducer,
//   });

//   return store;
// };

// export default makeStore;

// import reducers from "./rootReducer";
// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import authReducer from "./auth/loginSlice";
// import { combineReducers } from "redux";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const reducer = (state, action) => {
//   // if (action.type === HYDRATE) {
//   //   let nextState = {
//   //     ...state,
//   //     ...action.payload,
//   //   };
//   //   return nextState;
//   // } else {
//   return rootReducer(state, action);
//   // }
// };

// // const isDev = process.env.NODE_ENV === "development";

// const makeStore = () => {
//   // let middleware = [];

//   const store = configureStore({
//     reducer,
//     // middleware: (getDefaultMiddleware) =>
//     //   getDefaultMiddleware().concat(middleware),
//     // devTools: isDev,
//     // preloadedState: undefined,
//   });

//   return store;
// };

// export const wrapper = createWrapper(
//   makeStore
//   // , { debug: isDev }
// );

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";

console.log("authReducer", authReducer);
const combinedReducer = combineReducers({
  auth: authReducer,
  dashboard,
});
// console.log("combinedReducer data", combinedReducer);

const masterReducer = (state, action) => {
  // console.log("masterReducer state", state);
  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...state, // use previous state
  //     auth: state.auth,
  //   };
  //   return nextState;
  // } else {
  return combinedReducer(state, action);
  // }
  // return combinedReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
