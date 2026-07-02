import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";

import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const cart = useSelector(
    (state) => state.cart
  );

  const wishlist = useSelector(
    (state) => state.wishlist || []
  );


  const totalItems = cart.reduce(
    (total, item) =>
      total + item.qty,
    0
  );

  const { user, logout } =
    useAuth();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();


const comparison = useSelector(
  (state) => state.comparison || []
);

console.log(
  "Comparison Count:",
  comparison.length
);

console.log(
  "Comparison Data:",
  comparison
);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link
        className="navbar-brand fw-bold"
        to="/"
      >
        🛒 E-Commerce
      </Link>

      <div className="d-flex align-items-center gap-3">

        <Link
          className="text-white text-decoration-none"
          to="/cart"
        >
          🛒 Cart ({totalItems})
        </Link>

        <Link
          className="text-white text-decoration-none"
          to="/wishlist"
        >
          ❤️ Wishlist ({wishlist.length})
        </Link>

        <Link
          className="text-white text-decoration-none"
          to="/compare"
        >
          📊 Compare ({comparison.length})
        </Link>

        <Link
          className="text-white text-decoration-none"
          to="/orders"
        >
          📦 Orders
        </Link>

        <Link
          className="text-white text-decoration-none"
          to="/inventory"
        >
          📦 Inventory
        </Link>

        <Link
          className="text-white text-decoration-none"
          to="/admin"
        >
          📊 Dashboard
        </Link>

<Link
  className="text-white text-decoration-none"
  to="/admin-products"
>
  🛍 Products
</Link>

<Link
  className="text-white text-decoration-none"
  to="/admin-users"
>
  👥 Users
</Link>

<Link
  className="text-white text-decoration-none"
  to="/admin-logs"
>
  📜 Logs
</Link>


        {user ? (
          <div className="dropdown">

            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              👤 {user.name}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>
                <Link
                  className="dropdown-item"
                  to="/profile"
                >
                  👤 My Profile
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/orders"
                >
                  📦 My Orders
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/wishlist"
                >
                  ❤️ Wishlist
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>

            </ul>

          </div>
        ) : (
          <>
            <Link
              className="btn btn-primary btn-sm"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="btn btn-success btn-sm"
              to="/register"
            >
              Register
            </Link>
          </>
        )}

        <button
          className="btn btn-outline-light"
          onClick={toggleTheme}
        >
          {darkMode
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;