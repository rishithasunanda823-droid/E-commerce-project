import { useState } from "react";

import {
useSelector,
useDispatch,
} from "react-redux";

import {
useNavigate,
} from "react-router-dom";

import {
CLEAR_CART,
} from "../redux/actions";

import {
getInventory,
updateInventory,
} from "../utils/inventory";

import {
  logActivity,
} from "../utils/activityLogger";

function Checkout() {
const dispatch =
useDispatch();

const navigate =
useNavigate();

const cart = useSelector(
(state) => state.cart
);

const [formData, setFormData] =
useState({
name: "",
email: "",
phone: "",
address: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value,
});
};

const handleSubmit = (e) => {

e.preventDefault();


const inventory =
  getInventory();

// Stock Validation
for (const item of cart) {

  const availableStock =
    inventory[item.id] || 0;

  if (
    item.qty >
    availableStock
  ) {

    alert(
      `${item.title} only has ${availableStock} item(s) left in stock`
    );

    return;
  }
}

const appliedCoupon =
  JSON.parse(
    localStorage.getItem(
      "appliedCoupon"
    )
  ) || null;

const subtotal =
  cart.reduce(
    (total, item) =>
      total +
      item.price * item.qty,
    0
  );

const shipping =
  subtotal > 0
    ? 10
    : 0;

const tax =
  subtotal * 0.18;

const discountPercent =
  appliedCoupon
    ? appliedCoupon.discountPercent
    : 0;

const discountAmount =
  (
    (subtotal +
      shipping +
      tax) *
    discountPercent
  ) / 100;

const grandTotal =
  subtotal +
  shipping +
  tax -
  discountAmount;

const order = {
  id: Date.now(),

  date:
    new Date().toLocaleString(),

  status:
    "Order Placed",

  customer: {
    name:
      formData.name,

    email:
      formData.email,

    phone:
      formData.phone,

    address:
      formData.address,
  },

  items: cart,

  subtotal,

  shipping,

  tax,

  coupon:
    appliedCoupon?.code ||
    null,

  discount:
    discountAmount,

  total:
    grandTotal,
};

const existingOrders =
  JSON.parse(
    localStorage.getItem(
      "orders"
    )
  ) || [];

existingOrders.unshift(
  order
);

localStorage.setItem(
  "orders",
  JSON.stringify(
    existingOrders
  )


);

// Deduct Inventory
cart.forEach(
  (item) => {

    inventory[item.id] =
      Math.max(
        0,
        (inventory[item.id] || 0) -
          item.qty
      );

  }
);

updateInventory(
  inventory
);

localStorage.removeItem(
  "appliedCoupon"
);

dispatch({
  type: CLEAR_CART,
});

logActivity(
  `Placed Order #${order.id}`,
  formData.email
);


navigate(
  "/order-success",
  {
    state: {
      orderId:
        order.id,
    },
  }
);

addNotification(
  "New Order",
  `Order #${order.id} placed`
);

};

return ( <div className="container mt-4">


  <div className="row justify-content-center">

    <div className="col-md-8">

      <div className="card p-4 shadow">

        <h2 className="mb-4">
          Checkout
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="mb-3">

            <label>
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Phone
            </label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Address
            </label>

            <textarea
              className="form-control"
              rows="4"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>

  </div>

</div>


);
}

export default Checkout;
