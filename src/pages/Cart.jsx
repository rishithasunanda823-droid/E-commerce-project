import { useState } from "react";
import { useSelector } from "react-redux";

import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

function Cart() {
  const cart = useSelector(
    (state) => state.cart
  );

  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.qty,
    0
  );

  const applyCoupon = () => {
    const code =
      coupon.trim().toUpperCase();

    if (code === "SAVE10") {
      const couponData = {
        code: "SAVE10",
        discountPercent: 10,
      };

      localStorage.setItem(
        "appliedCoupon",
        JSON.stringify(
          couponData
        )
      );

      setDiscount(10);

      setCouponMessage(
        "✅ SAVE10 Applied (10% OFF)"
      );

      return;
    }

    if (code === "SAVE20") {
      const couponData = {
        code: "SAVE20",
        discountPercent: 20,
      };

      localStorage.setItem(
        "appliedCoupon",
        JSON.stringify(
          couponData
        )
      );

      setDiscount(20);

      setCouponMessage(
        "✅ SAVE20 Applied (20% OFF)"
      );

      return;
    }

    if (code === "WELCOME50") {
      const couponData = {
        code: "WELCOME50",
        discountPercent: 50,
      };

      localStorage.setItem(
        "appliedCoupon",
        JSON.stringify(
          couponData
        )
      );

      setDiscount(50);

      setCouponMessage(
        "✅ WELCOME50 Applied (50% OFF)"
      );

      return;
    }

    localStorage.removeItem(
      "appliedCoupon"
    );

    setDiscount(0);

    setCouponMessage(
      "❌ Invalid Coupon Code"
    );
  };

  const discountAmount =
    (subtotal * discount) / 100;

  const finalTotal =
    subtotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h1>🛒</h1>
        <h2>
          Your Cart Is Empty
        </h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="row">

        <div className="col-lg-8">

          <h2 className="mb-4">
            Shopping Cart
          </h2>

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

        </div>

        <div className="col-lg-4">

          <div className="card p-3 mb-3">

            <h5 className="mb-3">
              Apply Coupon
            </h5>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) =>
                setCoupon(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-primary"
              onClick={applyCoupon}
            >
              Apply Coupon
            </button>

            {couponMessage && (
              <p
                className={`mt-3 mb-0 ${
                  couponMessage.includes(
                    "❌"
                  )
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {couponMessage}
              </p>
            )}

          </div>

          <OrderSummary
            cart={cart}
          />

          <div className="card p-3 mt-3">

            <h5 className="mb-3">
              Order Summary
            </h5>

            <div className="d-flex justify-content-between">
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="d-flex justify-content-between text-success">
              <span>
                Discount
              </span>

              <span>
                -₹
                {discountAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>
                Grand Total
              </span>

              <span className="text-success">
                ₹
                {finalTotal.toFixed(
                  2
                )}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;