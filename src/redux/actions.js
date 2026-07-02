import axios from "axios";

export const FETCH_PRODUCTS =
  "FETCH_PRODUCTS";

export const ADD_TO_CART =
  "ADD_TO_CART";

export const REMOVE_FROM_CART =
  "REMOVE_FROM_CART";

export const INCREASE_QTY =
  "INCREASE_QTY";

export const DECREASE_QTY =
  "DECREASE_QTY";

export const LOADING =
  "LOADING";

export const CLEAR_CART =
  "CLEAR_CART";

export const ADD_TO_COMPARE =
  "ADD_TO_COMPARE";

export const REMOVE_FROM_COMPARE =
  "REMOVE_FROM_COMPARE";

export const CLEAR_COMPARE =
  "CLEAR_COMPARE";

export const fetchProducts = () => {
  return async (dispatch) => {

    dispatch({
      type: LOADING,
    });

    const response =
      await axios.get(
        "https://fakestoreapi.com/products"
      );

    dispatch({
      type: FETCH_PRODUCTS,
      payload:
        response.data,
    });
  };
};

export const addToCart = (
  product
) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (
  id
) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const increaseQty = (
  id
) => ({
  type: INCREASE_QTY,
  payload: id,
});

export const decreaseQty = (
  id
) => ({
  type: DECREASE_QTY,
  payload: id,
});

export const addToCompare = (
  product
) => ({
  type: ADD_TO_COMPARE,
  payload: product,
});

export const removeFromCompare = (
  id
) => ({
  type: REMOVE_FROM_COMPARE,
  payload: id,
});

export const clearCompare =
  () => ({
    type:
      CLEAR_COMPARE,
  });