import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  logActivity,
} from "../utils/activityLogger";

function EditProduct() {

  const { id } =
    useParams();

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

  useEffect(() => {

    const products =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || [];

    const product =
      products.find(
        (p) =>
          p.id.toString() === id
      );

    if (product) {

      setFormData({
        title:
          product.title,
        price:
          product.price,
        category:
          product.category,
        image:
          product.image,
        description:
          product.description,
      });

    }

  }, [id]);

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (
    e
  ) => {

    e.preventDefault();

    const products =
      JSON.parse(
        localStorage.getItem(
          "adminProducts"
        )
      ) || [];

    const updatedProducts =
      products.map(
        (product) =>

          product.id.toString() ===
          id

            ? {
                ...product,
                ...formData,
                price:
                  Number(
                    formData.price
                  ),
              }

            : product
      );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(
        updatedProducts
      )
    );

    alert(
      "Product Updated Successfully"
    );

    logActivity(
      `Edited Product: ${formData.title}`,
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
          Edit Product
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
            className="btn btn-primary"
            type="submit"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;