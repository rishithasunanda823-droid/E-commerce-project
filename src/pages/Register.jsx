import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import { toast } from "react-toastify";

import {
  addNotification,
} from "../utils/notifications";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    user,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    const result = register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {

addNotification(
    "New User Registration",
    `${formData.name} registered`
  );
  
      toast.success(
        "Registration Successful"
      );

      navigate("/login");
    } else {
      toast.error(
        result.message
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="mb-4 text-center">
              Register
            </h2>

            <form
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control mb-3"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Register
              </button>

            </form>

            <p className="mt-3 text-center">
              Already have an account?

              <Link to="/login">
                {" "}
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;