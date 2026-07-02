import { useNavigate } from "react-router-dom";

function OrderSummary({ cart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  const shipping = subtotal > 0 ? 10 : 0;

  const tax = subtotal * 0.18;

  const grandTotal =
    subtotal + shipping + tax;

  return (
    <div className="card p-3 shadow">

      <h4>Order Summary</h4>

      <hr />

      <p>
        Subtotal: ₹ {subtotal.toFixed(2)}
      </p>

      <p>
        Shipping: ₹ {shipping.toFixed(2)}
      </p>

      <p>
        Tax (18%): ₹ {tax.toFixed(2)}
      </p>

      <hr />

      <h5>
        Total: ₹ {grandTotal.toFixed(2)}
      </h5>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={() =>
          navigate("/checkout")
        }
      >
        Proceed To Checkout
      </button>

    </div>
  );
}

export default OrderSummary;