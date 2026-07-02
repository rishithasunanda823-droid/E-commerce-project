import { useDispatch } from "react-redux";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/actions";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="card mb-3">

      <div className="row g-0">

        <div className="col-md-2 text-center">

          <img
            src={item.image}
            alt={item.title}
            style={{
              height: "120px",
              objectFit: "contain",
            }}
          />

        </div>

        <div className="col-md-10">

          <div className="card-body">

            <h5>{item.title}</h5>

            <p>
              ₹ {item.price}
            </p>

            <div className="mb-2">

              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  dispatch(
                    decreaseQty(item.id)
                  )
                }
              >
                -
              </button>

              <strong>
                {item.qty}
              </strong>

              <button
                className="btn btn-success ms-2"
                onClick={() =>
                  dispatch(
                    increaseQty(item.id)
                  )
                }
              >
                +
              </button>

            </div>

            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch(
                  removeFromCart(item.id)
                )
              }
            >
              Remove
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartItem;