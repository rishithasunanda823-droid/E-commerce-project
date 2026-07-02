import { useEffect, useState } from "react";

import {
  logActivity,
} from "../utils/activityLogger";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const loadOrders = () => {

    const storedOrders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    setOrders(
      storedOrders
    );
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = (
    orderId,
    newStatus
  ) => {

    const updatedOrders =
      orders.map(
        (order) =>

          order.id === orderId
            ? {
                ...order,
                status:
                  newStatus,
              }
            : order
      );

    localStorage.setItem(
      "orders",
      JSON.stringify(
        updatedOrders
      )
    );

    setOrders(
      updatedOrders
    );

logActivity(
  `Changed Order #${orderId} to ${newStatus}`,
  "Admin"
);

  };

  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.total || 0
        ),
      0
    );

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Order Management
        </h2>

        <h4 className="text-success">

          Revenue:
          ₹
          {totalRevenue.toFixed(
            2
          )}

        </h4>

      </div>

      {orders.length ===
      0 ? (

        <div className="alert alert-info">

          No Orders Found

        </div>

      ) : (

        orders.map(
          (order) => (

            <div
              key={
                order.id
              }
              className="card p-4 mb-4 shadow"
            >

              <h5>

                Order #
                {order.id}

              </h5>

              <p>

                Customer:
                {" "}
                {
                  order.customer
                    ?.name
                }

              </p>

              <p>

                Date:
                {" "}
                {
                  order.date
                }

              </p>

              <p>

                Total:
                ₹
                {
                  order.total
                }

              </p>

              <div className="mb-3">

                <label>

                  Status

                </label>

                <select
                  className="form-select"
                  value={
                    order.status
                  }
                  onChange={(
                    e
                  ) =>
                    updateStatus(
                      order.id,
                      e.target
                        .value
                    )
                  }
                >

                  <option>
                    Order Placed
                  </option>

                  <option>
                    Processing
                  </option>

                  <option>
                    Packed
                  </option>

                  <option>
                    Shipped
                  </option>

                  <option>
                    Delivered
                  </option>

                  <option>
                    Cancelled
                  </option>

                </select>

              </div>

              <h6>
                Products
              </h6>

              {order.items?.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.id
                    }
                  >

                    •
                    {" "}
                    {
                      item.title
                    }
                    {" "}
                    ×
                    {" "}
                    {
                      item.qty
                    }

                  </div>
                )
              )}

            </div>
          )
        )

      )}

    </div>
  );
}

export default AdminOrders;