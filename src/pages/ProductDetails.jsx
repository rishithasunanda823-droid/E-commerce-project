import {
useState,
useEffect,
} from "react";

import {
useSelector,
useDispatch,
} from "react-redux";

import {
useParams,
Link,
} from "react-router-dom";

import { toast } from "react-toastify";

import { addToCart } from "../redux/actions";

import WishlistButton from "../components/WishlistButton";
import ProductRating from "../components/ProductRating";
import ProductCard from "../components/ProductCard";
import RecentlyViewed from "../components/RecentlyViewed";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import {
  getInventory,
} from "../utils/inventory";

function ProductDetails() {
const { id } = useParams();

const dispatch = useDispatch();

const [quantity, setQuantity] =
useState(1);

const [reviews, setReviews] =
useState([]);

const products = useSelector(
  (state) => state.products
);

const cart = useSelector(
  (state) => state.cart
);

const product = products.find(
  (p) => p.id === Number(id)
);

const inventory =
  getInventory();

const stock =
  inventory[
    product?.id
  ] || 0;


const alreadyInCart =
cart.some(
(item) =>
item.id === product?.id
);

const loadReviews = () => {
const allReviews =
JSON.parse(
localStorage.getItem(
"reviews"
)
) || {};


setReviews(
  allReviews[product?.id] || []
);


};

useEffect(() => {
if (!product) return;


let viewed =
  JSON.parse(
    localStorage.getItem(
      "recentlyViewed"
    )
  ) || [];

viewed = viewed.filter(
  (item) =>
    item.id !== product.id
);

viewed.unshift(product);

viewed = viewed.slice(0, 4);

localStorage.setItem(
  "recentlyViewed",
  JSON.stringify(viewed)
);


}, [product]);

useEffect(() => {
if (product) {
loadReviews();
}
}, [product]);

if (!product) {
return ( <h2 className="text-center mt-5">
Loading Product... </h2>
);
}

const averageRating =
reviews.length > 0
? (
reviews.reduce(
(total, review) =>
total +
review.rating,
0
) / reviews.length
).toFixed(1)
: 0;

const relatedProducts = products
.filter(
(p) =>
p.category ===
product.category &&
p.id !== product.id
)
.slice(0, 4);

const handleAddToCart = () => {

  if (stock === 0) {

    toast.error(
      "Product Out Of Stock"
    );

    return;
  }

  if (quantity > stock) {

    toast.error(
      "Not enough stock available"
    );

    return;
  }

  dispatch(
    addToCart({
      ...product,
      qty: quantity,
    })
  );

  toast.success(
    `${quantity} item(s) added to cart`
  );
};

return ( <div className="container mt-5">


  <div className="row">

    <div className="col-lg-5 text-center">

      <img
        src={product.image}
        alt={product.title}
        className="img-fluid"
        style={{
          maxHeight: "450px",
          objectFit: "contain",
        }}
      />

    </div>

    <div className="col-lg-7">

      <span className="badge bg-secondary mb-3">
        {product.category}
      </span>

      <h2 className="mb-3">
        {product.title}
      </h2>

      <ProductRating
        rating={product.rating}
      />

      <h3 className="text-success mt-3">
        ₹ {product.price}
      </h3>

      <p className="fw-bold">
        Selected Quantity: {quantity}
      </p>

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

      <p className="mb-4">
        {product.description}
      </p>

      <div className="mb-4">

        <h5>Quantity</h5>

        <div className="d-flex align-items-center">

          <button
            className="btn btn-warning"
            onClick={() =>
              setQuantity(
                Math.max(
                  1,
                  quantity - 1
                )
              )
            }
          >
            -
          </button>

          <span className="mx-3 fs-5">
            {quantity}
          </span>

          <button
            className="btn btn-success"
            onClick={() =>
              setQuantity(
                Math.min(
                  stock,
                  quantity + 1
                )
              )
            }
          >
            +
          </button>

        </div>

      </div>

      <div className="mb-3">

        {alreadyInCart ? (
          <Link
            to="/cart"
            className="btn btn-success me-2"
          >
            ✓ Added To Cart
          </Link>
        ) : (
          <button
            className="btn btn-primary me-2"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            {stock === 0
              ? "Out Of Stock"
              : "🛒 Add To Cart"}
          </button>
        )}

      </div>

      <div className="mb-3">

        <WishlistButton
          product={product}
        />

      </div>

      <div className="mb-4">

        <button
          className="btn btn-success"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          {stock === 0
          ? "Out Of Stock"
          : `⚡ Buy ${quantity} Now`}
        </button>

      </div>

      <div className="card p-3">

        <h5>
          Product Highlights
        </h5>

        <p>✅ Secure Checkout</p>
        <p>✅ Easy Returns</p>
        <p>✅ Fast Delivery</p>
        <p>✅ Quality Guarantee</p>

      </div>

    </div>

  </div>

  <hr className="my-5" />

  <h3 className="mb-4">
    Customers Also Viewed
  </h3>

  <div className="row">

    {relatedProducts.map(
      (item) => (
        <div
          key={item.id}
          className="col-lg-3 col-md-4 col-sm-6 mb-4"
        >
          <ProductCard
            product={item}
          />
        </div>
      )
    )}

  </div>

  <hr className="my-5" />

  <h3 className="mb-4">
    Customer Reviews
  </h3>

  <div className="card p-4 mb-4">

    <h5>
      Average Rating:
      {" "}
      ⭐ {averageRating}
      {" "}
      ({reviews.length} Reviews)
    </h5>

  </div>

  <ReviewForm
    productId={product.id}
    onReviewAdded={
      loadReviews
    }
  />

  <ReviewList
    reviews={reviews}
    productId={product.id}
    onReviewDeleted={
      loadReviews
    }
  />

  <RecentlyViewed />

</div>


);
}

export default ProductDetails;
