import { useDispatch, useSelector } from "react-redux";

function WishlistButton({ product }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist
  );

  const exists = wishlist.find(
    (item) => item.id === product.id
  );

  const toggleWishlist = () => {
    dispatch({
      type: "TOGGLE_WISHLIST",
      payload: product,
    });
  };

  return (
    <button
      className={`btn w-100 ${
        exists
          ? "btn-danger"
          : "btn-outline-danger"
      }`}
      onClick={toggleWishlist}
    >
      {exists ? "❤️ Wishlisted" : "🤍 Wishlist"}
    </button>
  );
}

export default WishlistButton;