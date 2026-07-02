import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  getInventory,
} from "../utils/inventory";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AdminDashboard() {

  const [orders, setOrders] =
    useState([]);

  const [inventory, setInventory] =
    useState({});

  useEffect(() => {

    const storedOrders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    setOrders(
      storedOrders
    );

    setInventory(
      getInventory()
    );

  }, []);

  const totalOrders =
    orders.length;

  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.total || 0
        ),
      0
    );

  const totalProductsSold =
    orders.reduce(
      (total, order) =>
        total +
        order.items.reduce(
          (sum, item) =>
            sum + item.qty,
          0
        ),
      0
    );

  const avgOrderValue =
    totalOrders > 0
      ? (
          totalRevenue /
          totalOrders
        ).toFixed(2)
      : 0;

  const productSales = {};

  orders.forEach(
    (order) => {

      order.items.forEach(
        (item) => {

          if (
            !productSales[
              item.title
            ]
          ) {
            productSales[
              item.title
            ] = 0;
          }

          productSales[
            item.title
          ] += item.qty;

        }
      );

    }
  );

  const topProducts =
    Object.entries(
      productSales
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);


    const chartData =
    topProducts.map(
        (product) => ({
        name:
            product[0].substring(
            0,
            15
            ),

        sold:
            product[1],
        })
    );

const monthlyRevenue = {};

orders.forEach((order) => {

  const month =
    new Date(
      order.date
    ).toLocaleString(
      "default",
      {
        month: "short",
      }
    );

  if (!monthlyRevenue[month]) {

    monthlyRevenue[
      month
    ] = {
      month,
      revenue: 0,
      orders: 0,
    };

  }

  monthlyRevenue[
    month
  ].revenue +=
    Number(
      order.total || 0
    );

  monthlyRevenue[
    month
  ].orders += 1;

});

const revenueData =
  Object.values(
    monthlyRevenue
  );

/* ======================
CUSTOMER ANALYTICS
====================== */

const customerEmails =
  orders.map(
    (order) =>
      order.customer?.email
  );

const uniqueCustomers =
  [
    ...new Set(
      customerEmails
    ),
  ];

const totalCustomers =
  uniqueCustomers.length;

const repeatCustomers =
  uniqueCustomers.filter(
    (email) =>
      customerEmails.filter(
        (e) =>
          e === email
      ).length > 1
  ).length;

const newCustomers =
  totalCustomers -
  repeatCustomers;

/* ======================
COUPON ANALYTICS
====================== */

const couponUsage = {};

let totalDiscountGiven =
  0;

orders.forEach(
  (order) => {

    if (
      order.coupon
    ) {

      couponUsage[
        order.coupon
      ] =
        (
          couponUsage[
            order.coupon
          ] || 0
        ) + 1;

    }

    totalDiscountGiven +=
      Number(
        order.discount || 0
      );

  }
);

const mostUsedCoupon =
  Object.entries(
    couponUsage
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0] || [];

/* ======================
INVENTORY ANALYTICS
====================== */

const inventoryValues =
  Object.values(
    inventory
  );

const totalInventoryUnits =
  inventoryValues.reduce(
    (sum, qty) =>
      sum + qty,
    0
  );

const outOfStockCount =
  inventoryValues.filter(
    (qty) => qty === 0
  ).length;

const lowStockCount =
  inventoryValues.filter(
    (qty) =>
      qty > 0 &&
      qty <= 5
  ).length;


  const lowStockProducts =
    Object.entries(
      inventory
    ).filter(
      ([id, stock]) =>
        stock <= 5
    );

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        📊 Sales Dashboard
      </h2>

<Link
  to="/admin-orders"
  className="btn btn-dark"
>
  Manage Orders
</Link>

<Link
  to="/admin-logs"
  className="btn btn-secondary ms-2"
>
  Activity Logs
</Link>

      <div className="row">

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow">

            <h6>
              Total Orders
            </h6>

            <h3>
              {totalOrders}
            </h3>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow">

            <h6>
              Revenue
            </h6>

            <h3>
              ₹
              {totalRevenue.toFixed(
                2
              )}
            </h3>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow">

            <h6>
              Products Sold
            </h6>

            <h3>
              {
                totalProductsSold
              }
            </h3>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow">

            <h6>
              Avg Order Value
            </h6>

            <h3>
              ₹
              {avgOrderValue}
            </h3>

          </div>

        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-6">

          <div className="card p-3 shadow">

            <h4>
              🏆 Top Selling Products
            </h4>

            <ul>

              {topProducts.map(
                (
                  product,
                  index
                ) => (

                  <li
                    key={index}
                  >
                    {
                      product[0]
                    }
                    {" "}
                    (
                    {
                      product[1]
                    }
                    )
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card p-3 shadow">

            <h4>
              ⚠ Low Stock Products
            </h4>

            <ul>

              {lowStockProducts.map(
                (
                  product,
                  index
                ) => (

                  <li
                    key={index}
                  >
                    Product ID:
                    {" "}
                    {
                      product[0]
                    }
                    {" "}
                    |
                    {" "}
                    Stock:
                    {" "}
                    {
                      product[1]
                    }
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      </div>

      <div className="card p-3 shadow mt-4">

        <h4>
          🛒 Recent Orders
        </h4>

        <table className="table">

          <thead>

            <tr>

              <th>
                Order ID
              </th>

              <th>
                Customer
              </th>

              <th>
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {orders
              .slice(0, 5)
              .map(
                (
                  order
                ) => (

                  <tr
                    key={
                      order.id
                    }
                  >

                    <td>
                      {
                        order.id
                      }
                    </td>

                    <td>
                      {
                        order
                          .customer
                          ?.name
                      }
                    </td>

                    <td>
                      ₹
                      {
                        order.total
                      }
                    </td>

                  </tr>

                )
              )}

          </tbody>

        </table>

      </div>

<div className="card p-4 shadow mt-4">

  <h4 className="mb-4">
    📈 Top Products Analytics
  </h4>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <BarChart
      data={chartData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="name"
      />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="sold"
      />

    </BarChart>

  </ResponsiveContainer>

</div>

<div className="card p-4 shadow mt-4">

  <h4 className="mb-4">
    💰 Revenue Trend
  </h4>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <LineChart
      data={revenueData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="month"
      />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="card p-4 shadow mt-4">

  <h4 className="mb-4">
    📦 Orders Trend
  </h4>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <BarChart
      data={revenueData}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="month"
      />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="orders"
      />

    </BarChart>

  </ResponsiveContainer>

</div>

<div className="row mt-4">

  <div className="col-md-4">

    <div className="card p-3 shadow">

      <h4>
        👥 Customers
      </h4>

      <p>
        Total Customers:
        {" "}
        {totalCustomers}
      </p>

      <p>
        Repeat Customers:
        {" "}
        {repeatCustomers}
      </p>

      <p>
        New Customers:
        {" "}
        {newCustomers}
      </p>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card p-3 shadow">

      <h4>
        🎟 Coupons
      </h4>

      <p>
        Most Used:
        {" "}
        {
          mostUsedCoupon[0] ||
          "N/A"
        }
      </p>

      <p>
        Usage:
        {" "}
        {
          mostUsedCoupon[1] ||
          0
        }
      </p>

      <p>
        Discount Given:
        ₹
        {totalDiscountGiven.toFixed(
          2
        )}
      </p>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card p-3 shadow">

      <h4>
        📦 Inventory
      </h4>

      <p>
        Total Units:
        {" "}
        {
          totalInventoryUnits
        }
      </p>

      <p>
        Out Of Stock:
        {" "}
        {
          outOfStockCount
        }
      </p>

      <p>
        Low Stock:
        {" "}
        {
          lowStockCount
        }
      </p>

    </div>

  </div>

</div>

    </div>
  );
}

export default AdminDashboard;