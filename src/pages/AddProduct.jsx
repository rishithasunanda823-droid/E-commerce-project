import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  logActivity,
} from "../utils/activityLogger";

import {
  addNotification,
} from "../utils/notifications";

function AddProduct() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      category: "",
      image: "",
      description: "",
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

    const existingProducts =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || [];

    const newProduct = {

      id: Date.now(),

      ...formData,

      price: Number(
        formData.price
      ),

      rating: {
        rate: 0,
        count: 0,
      },
    };

    existingProducts.unshift(
      newProduct
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(
        existingProducts
      )
    );

    alert(
      "Product Created Successfully"
    );

addNotification(
  "Product Added",
  formData.title
);

logActivity(
  `Added Product: ${formData.title}`,
  "Admin"
);

    navigate(
      "/admin-products"
    );
  };

  
  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="mb-4">
          Add Product
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="mb-3">

            <label>
              Product Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Price
            </label>

            <input
              type="number"
              className="form-control"
              name="price"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Category
            </label>

            <input
              type="text"
              className="form-control"
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Image URL
            </label>

            <input
              type="text"
              className="form-control"
              name="image"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>
              Description
            </label>

            <textarea
              className="form-control"
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            className="btn btn-success"
            type="submit"
          >
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;