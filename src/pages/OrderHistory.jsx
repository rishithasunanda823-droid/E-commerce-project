import { Link } from "react-router-dom";

function OrderHistory() {
  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  if (orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>No Orders Found</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card p-4 mb-4 shadow"
        >

          <h4>
            Order ID:
            #{order.id}
          </h4>

          <p>
            Date:
            {" "}
            {order.date}
          </p>

          <p>
            Status:
            {" "}

            <span
              className={
                order.status ===
                "Delivered"
                  ? "badge bg-success"
                  : order.status ===
                    "Shipped"
                  ? "badge bg-info"
                  : "badge bg-warning text-dark"
              }
            >
              {order.status}
            </span>

          </p>

          <p>
            Customer:
            {" "}
            {order.customer?.name}
          </p>

          <p>
            Total Items:
            {" "}
            {order.items?.length}
          </p>

          <div className="mt-2">

            {order.coupon && (
              <p className="text-success mb-1">

                Coupon:
                {" "}
                {order.coupon}

              </p>
            )}

            {order.discount > 0 && (
              <p className="text-danger mb-1">

                Discount:
                {" "}
                -₹
                {Number(
                  order.discount
                ).toFixed(2)}

              </p>
            )}

            <h6 className="text-success">

              Total Paid:
              {" "}
              ₹
              {Number(
                order.total
              ).toFixed(2)}

            </h6>

          </div>

          <Link
            to={`/orders/${order.id}`}
            className="btn btn-primary mt-2"
          >
            View Details
          </Link>

        </div>
      ))}

    </div>
  );
}

export default OrderHistory;