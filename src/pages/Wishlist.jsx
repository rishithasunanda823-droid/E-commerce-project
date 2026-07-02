import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const wishlist = useSelector(
    (state) => state.wishlist
  );

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>❤️ Wishlist Empty</h2>
        <p>Add products to wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        ❤️ My Wishlist
      </h2>

      <div className="row">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;