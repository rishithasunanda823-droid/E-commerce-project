import { useState } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

function Profile() {  
  const {
        user,
        updateUser,
    } = useAuth();

  const cart = useSelector(
    (state) => state.cart
  );

  const wishlist = useSelector(
    (state) => state.wishlist || []
  );

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const [profile, setProfile] =
    useState(user);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };
 
const handleSave = () => {
  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const updatedUsers =
    users.map((user) =>
      user.email === profile.email
        ? {
            ...user,
            name:
              profile.name,
            phone:
              profile.phone,
            address:
              profile.address,
          }
        : user
    );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  updateUser(profile);

  toast.success(
    "Profile Updated Successfully"
  );
};

  const avatarLetter =
    profile?.name?.charAt(0)
      ?.toUpperCase() || "U";

  return (
    <div className="container mt-5">

      {/* USER CARD */}

      <div className="card shadow p-4 mb-4">

        <div className="d-flex align-items-center">

          <div
            className="
            rounded-circle
            bg-primary
            text-white
            d-flex
            justify-content-center
            align-items-center
            me-3
          "
            style={{
              width: "80px",
              height: "80px",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {avatarLetter}
          </div>

          <div>
            <h3>
              {profile?.name}
            </h3>

<p className="mb-0 text-muted">
  {profile?.email}
</p>

<p className="text-muted">
  Member Since:
  {" "}
  {profile?.createdAt
    ? new Date(
        profile.createdAt
      ).toLocaleDateString()
    : "N/A"}
</p>
          </div>

        </div>

      </div>

      {/* DASHBOARD STATS */}

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card text-center shadow p-3">

            <h5>📦 Orders</h5>

            <h2>
              {orders.length}
            </h2>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center shadow p-3">

            <h5>❤️ Wishlist</h5>

            <h2>
              {wishlist.length}
            </h2>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card text-center shadow p-3">

            <h5>🛒 Cart</h5>

            <h2>
              {cart.length}
            </h2>

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="card shadow p-3 mb-4">

        <h4 className="mb-3">
          Quick Actions
        </h4>

        <div className="d-flex gap-3 flex-wrap">

          <Link
            to="/orders"
            className="btn btn-primary"
          >
            📦 My Orders
          </Link>

          <Link
            to="/wishlist"
            className="btn btn-danger"
          >
            ❤️ Wishlist
          </Link>

          <Link
            to="/cart"
            className="btn btn-success"
          >
            🛒 Cart
          </Link>

        </div>

      </div>

      {/* PROFILE FORM */}

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Edit Profile
        </h3>

        <div className="mb-3">

          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={profile?.name || ""}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>
            Email
          </label>

          <input
            type="email"
            className="form-control"
            value={profile?.email || ""}
            disabled
          />

        </div>

        <div className="mb-3">

          <label>
            Phone
          </label>

          <input
            type="text"
            name="phone"
            className="form-control"
            value={profile?.phone || ""}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>
            Address
          </label>

          <textarea
            rows="4"
            name="address"
            className="form-control"
            value={
              profile?.address || ""
            }
            onChange={handleChange}
          />

        </div>

        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Profile;