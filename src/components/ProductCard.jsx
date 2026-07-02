import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { addToCart } from "../redux/actions";

import ProductRating from "./ProductRating";
import WishlistButton from "./WishlistButton";

import { toast } from "react-toastify";

import CompareButton
from "./CompareButton";

import {
  getInventory,
} from "../utils/inventory";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const inventory =
  getInventory();

const stock =
  inventory[
    product.id
  ] || 0;

  const cart = useSelector(
    (state) => state.cart
  );

  const alreadyInCart =
    cart.some(
      (item) =>
        item.id === product.id
    );

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    toast.success(
      "Product Added To Cart"
    );
  };

  return (
    <div className="card h-100 shadow-sm">

      <img
        src={product.image}
        alt={product.title}
        className="card-img-top p-3"
        style={{
          height: "250px",
          objectFit: "contain",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h6
          style={{
            minHeight: "60px",
          }}
        >
          {product.title}
        </h6>

        <h5 className="text-success">
          ₹ {product.price}
        </h5>

<ProductRating
  rating={product.rating}
/>

{stock > 10 && (
  <p className="text-success fw-bold">
    ✅ In Stock
  </p>
)}

{stock > 0 &&
  stock <= 10 && (
    <p className="text-warning fw-bold">
      ⚠ Only {stock} Left
    </p>
)}

{stock === 0 && (
  <p className="text-danger fw-bold">
    ❌ Out Of Stock
  </p>
)}

        <div className="mt-auto">

          <Link
            to={`/product/${product.id}`}
            className="btn btn-info w-100 mb-2"
          >
            View Details
          </Link>

          <WishlistButton
            product={product}
          />

          <div className="mb-2">
            <CompareButton
              product={product}
            />
          </div>

          {alreadyInCart ? (
            <Link
              to="/cart"
              className="btn btn-success w-100"
            >
              ✓ Added To Cart
            </Link>
          ) : (
            <button
  className="btn btn-primary w-100"
  onClick={
    handleAddToCart
  }
  disabled={stock === 0}
>
  {stock === 0
    ? "Out Of Stock"
    : "Add To Cart"}
</button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductCard;