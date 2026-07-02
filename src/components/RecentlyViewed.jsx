import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function RecentlyViewed() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const viewed =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];

    setProducts(viewed);
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <hr className="my-5" />

      <h3 className="mb-4">
        Recently Viewed
      </h3>

      <div className="row">

        {products.map(
          (product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <ProductCard
                product={product}
              />
            </div>
          )
        )}

      </div>
    </>
  );
}

export default RecentlyViewed;