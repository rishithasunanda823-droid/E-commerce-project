import {
  FETCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  LOADING,
  CLEAR_CART,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE,
} from "./actions";

const initialState = {
  loading: false,
  products: [],
  cart: [],
  wishlist: [],
  comparison: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    // =========================
    // COMPARE PRODUCTS
    // =========================

    case ADD_TO_COMPARE: {
      const comparison =
        state.comparison || [];

      const exists =
        comparison.find(
          (item) =>
            item.id ===
            action.payload.id
        );

      if (exists) {
        return state;
      }

      if (
        comparison.length >= 4
      ) {
        return state;
      }

      return {
        ...state,
        comparison: [
          ...comparison,
          action.payload,
        ],
      };
    }

    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        comparison:
          (state.comparison || []).filter(
            (item) =>
              item.id !==
              action.payload
          ),
      };

    case CLEAR_COMPARE:
      return {
        ...state,
        comparison: [],
      };

    // =========================
    // CART
    // =========================

    case ADD_TO_CART: {
      const item =
        action.payload;

      const existingItem =
        state.cart.find(
          (x) =>
            x.id === item.id
        );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(
            (x) =>
              x.id === item.id
                ? {
                    ...x,
                    qty:
                      x.qty +
                      (item.qty ||
                        1),
                  }
                : x
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...item,
            qty:
              item.qty || 1,
          },
        ],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.id !==
            action.payload
        ),
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map(
          (item) =>
            item.id ===
            action.payload
              ? {
                  ...item,
                  qty:
                    item.qty + 1,
                }
              : item
        ),
      };

    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart.map(
          (item) =>
            item.id ===
            action.payload
              ? {
                  ...item,
                  qty: Math.max(
                    1,
                    item.qty - 1
                  ),
                }
              : item
        ),
      };

    // =========================
    // WISHLIST
    // =========================

    case "TOGGLE_WISHLIST": {
      const exists =
        (
          state.wishlist || []
        ).find(
          (item) =>
            item.id ===
            action.payload.id
        );

      if (exists) {
        return {
          ...state,
          wishlist:
            state.wishlist.filter(
              (item) =>
                item.id !==
                action.payload.id
            ),
        };
      }

      return {
        ...state,
        wishlist: [
          ...(state.wishlist ||
            []),
          action.payload,
        ],
      };
    }

    default:
      return state;
  }
}

export default reducer;