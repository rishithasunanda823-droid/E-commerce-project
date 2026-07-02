import {
  Link,
  useLocation,
} from "react-router-dom";

function OrderSuccess() {
  const location =
    useLocation();

  const orderId =
    location.state?.orderId;

  return (
    <div className="container text-center mt-5">

      <div className="card p-5 shadow">

        <h1>
          🎉 Order Successful
        </h1>

        <h4 className="mt-3">
          Order ID:
          #{orderId}
        </h4>

        <p className="mt-3">
          Thank you for shopping
          with us.
        </p>

        <Link
          to="/orders"
          className="btn btn-primary mt-3 me-2"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="btn btn-success mt-3"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;