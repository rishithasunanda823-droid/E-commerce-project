import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast }
from "react-toastify";

import {
  logActivity,
} from "../utils/activityLogger";


import {
  addNotification,
} from "../utils/notifications";

function AdminProducts() {

  const [products, setProducts] =
    useState([]);

const [search, setSearch] =
  useState("");

const [category, setCategory] =
  useState("all");

const [sortBy, setSortBy] =
  useState("");

const loadProducts = () => {

  const storedProducts =
    JSON.parse(
      localStorage.getItem(
        "adminProducts"
      )
    ) || [];

  setProducts(
    storedProducts
  );
};

const handleDelete = (
  productId
) => {

  const confirmed =
    window.confirm(
      "Are you sure you want to delete this product?"
    );

  if (!confirmed) {
    return;
  }

  const updatedProducts =
    products.filter(
      (product) =>
        product.id !== productId
    );

  localStorage.setItem(
    "adminProducts",
    JSON.stringify(
      updatedProducts
    )
  );

  const inventory =
    JSON.parse(
      localStorage.getItem(
        "inventory"
      )
    ) || {};

  delete inventory[
    productId
  ];

  localStorage.setItem(
    "inventory",
    JSON.stringify(
      inventory
    )
  );

  setProducts(
    updatedProducts
  );

toast.success(
  "Product Deleted Successfully"
);

addNotification(
  "Product Deleted",
  `Product ID ${productId} deleted`
);

logActivity(
  `Deleted Product ID ${productId}`,
  "Admin"
);

};

useEffect(() => {

  loadProducts();

}, []);

const categories = [
  "all",
  ...new Set(
    products.map(
      (product) =>
        product.category
    )
  ),
];

const filteredProducts =
  products.filter(
    (product) => {

      const matchSearch =
        product.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =
        category === "all"
          ? true
          : product.category ===
            category;

      return (
        matchSearch &&
        matchCategory
      );
    }
  );

const sortedProducts = [
  ...filteredProducts,
];

if (sortBy === "low-high") {

  sortedProducts.sort(
    (a, b) =>
      a.price - b.price
  );

}

if (sortBy === "high-low") {

  sortedProducts.sort(
    (a, b) =>
      b.price - a.price
  );

}

if (sortBy === "a-z") {

  sortedProducts.sort(
    (a, b) =>
      a.title.localeCompare(
        b.title
      )
  );

}

if (sortBy === "z-a") {

  sortedProducts.sort(
    (a, b) =>
      b.title.localeCompare(
        a.title
      )
  );

}

if (sortBy === "newest") {

  sortedProducts.sort(
    (a, b) =>
      b.id - a.id
  );

}


  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between">

        <h2>
          Product Management
        </h2>

        <Link
          to="/add-product"
          className="btn btn-success"
        >
          + Add Product
        </Link>

      </div>

<div className="row my-4">

  <div className="col-md-4">

    <input
      type="text"
      className="form-control"
      placeholder="Search Product"
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
    />

  </div>

<div className="col-md-12 mt-2">

  <p className="text-muted">
    Showing {sortedProducts.length} Product(s)
  </p>

</div>


  <div className="col-md-4">

    <select
      className="form-select"
      value={category}
      onChange={(e) =>
        setCategory(
          e.target.value
        )
      }
    >

      {categories.map(
        (cat) => (
          <option
            key={cat}
            value={cat}
          >
            {cat}
          </option>
        )
      )}

    </select>

  </div>

  <div className="col-md-4">

    <select
      className="form-select"
      value={sortBy}
      onChange={(e) =>
        setSortBy(
          e.target.value
        )
      }
    >

      <option value="">
        Sort Products
      </option>

      <option value="low-high">
        Price Low → High
      </option>

      <option value="high-low">
        Price High → Low
      </option>

      <option value="a-z">
        A → Z
      </option>

      <option value="z-a">
        Z → A
      </option>

      <option value="newest">
        Newest First
      </option>

    </select>

  </div>

</div>

      <table className="table table-bordered table-hover align-middle">

        <thead>

          <tr>

            <th>ID</th>

            <th>Image</th>

            <th>Title</th>

            <th>Price</th>

            <th>Category</th>

            <th>Actions</th>

          </tr>

        </thead>

<tbody>

  {sortedProducts.length > 0 ? (

    sortedProducts.map(
      (product) => (

        <tr key={product.id}>

          <td>
            {product.id}
          </td>

          <td>

            <img
              src={product.image}
              alt=""
              width="60"
            />

          </td>

          <td>
            {product.title}
          </td>

          <td>
            ₹{product.price}
          </td>

          <td>
            {product.category}
          </td>

          <td>

            <Link
              to={`/edit-product/${product.id}`}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </Link>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                handleDelete(
                  product.id
                )
              }
            >
              Delete
            </button>

          </td>

        </tr>

      )
    )

  ) : (

    <tr>

      <td
        colSpan="6"
        className="text-center text-danger"
      >
        😔 No Products Found
      </td>

    </tr>

  )}

</tbody>

      </table>

    </div>
  );
}

export default AdminProducts;