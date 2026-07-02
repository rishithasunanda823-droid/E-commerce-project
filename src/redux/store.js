import {
  createStore,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";

import reducer from "./reducer";

const cartFromStorage =
  localStorage.getItem("cart")
    ? JSON.parse(
        localStorage.getItem("cart")
      )
    : [];

const wishlistFromStorage =
  localStorage.getItem("wishlist")
    ? JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      )
    : [];

const comparisonFromStorage =
  localStorage.getItem("comparison")
    ? JSON.parse(
        localStorage.getItem(
          "comparison"
        )
      )
    : [];

const initialState = {
  loading: false,
  products: [],
  cart: cartFromStorage,
  wishlist: wishlistFromStorage,
  comparison:
    comparisonFromStorage,
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  const state =
    store.getState();

  localStorage.setItem(
    "cart",
    JSON.stringify(
      state.cart
    )
  );

  localStorage.setItem(
    "wishlist",
    JSON.stringify(
      state.wishlist
    )
  );

  localStorage.setItem(
    "comparison",
    JSON.stringify(
      state.comparison
    )
  );
});

export default store;