import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCompare,
  clearCompare,
  addToCart,
} from "../redux/actions";

function CompareProducts() {
  const dispatch =
    useDispatch();

  const comparison =
    useSelector(
      (state) =>
        state.comparison || []
    );

  if (
    comparison.length === 0
  ) {
    return (
      <div className="container mt-5 text-center">

        <h2>
          No Products Selected For Comparison
        </h2>

      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Product Comparison
        </h2>

        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch(
              clearCompare()
            )
          }
        >
          Clear All
        </button>

      </div>

      <div className="table-responsive">

        <table className="table table-bordered text-center">

          <thead>

            <tr>

              <th>
                Feature
              </th>

              {comparison.map(
                (
                  product
                ) => (
                  <th
                    key={
                      product.id
                    }
                  >
                    {
                      product.title
                    }
                  </th>
                )
              )}

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>
                Image
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.title
                      }
                      width="100"
                    />
                  </td>
                )
              )}

            </tr>

            <tr>

              <td>
                Price
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >
                    ₹
                    {
                      product.price
                    }
                  </td>
                )
              )}

            </tr>

            <tr>

              <td>
                Rating
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >
                    {
                      product.rating
                        ?.rate
                    }
                    ⭐
                  </td>
                )
              )}

            </tr>

            <tr>

              <td>
                Reviews
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >
                    {
                      product.rating
                        ?.count
                    }
                  </td>
                )
              )}

            </tr>

            <tr>

              <td>
                Category
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >
                    {
                      product.category
                    }
                  </td>
                )
              )}

            </tr>

            <tr>

              <td>
                Actions
              </td>

              {comparison.map(
                (
                  product
                ) => (
                  <td
                    key={
                      product.id
                    }
                  >

                    <button
                      className="btn btn-success mb-2"
                      onClick={() =>
                        dispatch(
                          addToCart(
                            product
                          )
                        )
                      }
                    >
                      Add To Cart
                    </button>

                    <br />

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch(
                          removeFromCompare(
                            product.id
                          )
                        )
                      }
                    >
                      Remove
                    </button>

                  </td>
                )
              )}

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CompareProducts;