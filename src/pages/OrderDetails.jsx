import { useParams } from "react-router-dom";

import OrderTimeline from "../components/OrderTimeline";

function OrderDetails() {
  const { id } = useParams();

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const order = orders.find(
  (o) =>
        String(o.id) === String(id)
);

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <h2>Order Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-3">
          Order #{order.id}
        </h2>

        <hr />

        <p>
          <strong>Status:</strong>

          <span className="badge bg-primary ms-2">
            {order.status}
          </span>
        </p>

        <OrderTimeline
          status={order.status}
        />

        <p>
          <strong>Date:</strong>{" "}
          {order.date}
        </p>

        <hr />


        <h4>Customer Information</h4>

        <p>
        <strong>Name:</strong>{" "}
        {order.customer?.name}
        </p>

        <p>
        <strong>Email:</strong>{" "}
        {order.customer?.email}
        </p>

        <p>
        <strong>Phone:</strong>{" "}
        {order.customer?.phone}
        </p>

        <p>
        <strong>Address:</strong>{" "}
        {order.customer?.address}
        </p>

        <hr />

        <h4>
          Products Purchased
        </h4>

        {order.items?.map(
          (item) => (
            <div
              key={item.id}
              className="border rounded p-3 mb-3"
            >
              <div className="row align-items-center">

                <div className="col-md-2 text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "80px",
                      objectFit:
                        "contain",
                    }}
                  />
                </div>

                <div className="col-md-10">

                  <h6>
                    {item.title}
                  </h6>

                  <p className="mb-1">
                    Quantity:
                    {" "}
                    {item.qty}
                  </p>

                  <p className="mb-0">
                    Price:
                    ₹{item.price}
                  </p>

                </div>

              </div>
            </div>
          )
        )}

        <hr />

<h4>
  Order Summary
</h4>

<div className="card p-3 mt-3">

  <div className="d-flex justify-content-between">

    <span>
      Subtotal
    </span>

    <span>
      ₹
      {Number(
        order.subtotal || 0
      ).toFixed(2)}
    </span>

  </div>

  <div className="d-flex justify-content-between">

    <span>
      Shipping
    </span>

    <span>
      ₹
      {Number(
        order.shipping || 0
      ).toFixed(2)}
    </span>

  </div>

  <div className="d-flex justify-content-between">

    <span>
      Tax
    </span>

    <span>
      ₹
      {Number(
        order.tax || 0
      ).toFixed(2)}
    </span>

  </div>

  {order.coupon && (
    <div className="d-flex justify-content-between text-success">

      <span>
        Coupon
      </span>

      <span>
        {order.coupon}
      </span>

    </div>
  )}

  {order.discount > 0 && (
    <div className="d-flex justify-content-between text-danger">

      <span>
        Discount
      </span>

      <span>
        -₹
        {Number(
          order.discount
        ).toFixed(2)}
      </span>

    </div>
  )}

  <hr />

  <div className="d-flex justify-content-between fw-bold fs-5">

    <span>
      Grand Total
    </span>

    <span className="text-success">

      ₹
      {Number(
        order.total
      ).toFixed(2)}

    </span>

  </div>

</div>

      </div>

    </div>
  );
}

export default OrderDetails;