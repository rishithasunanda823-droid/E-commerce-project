import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  logActivity,
} from "../utils/activityLogger";

function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filterRole, setFilterRole] =
    useState("all");

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers = () => {

    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    setUsers(
      storedUsers
    );
  };

  const updateUsers = (
    updatedUsers
  ) => {

    localStorage.setItem(
      "users",
      JSON.stringify(
        updatedUsers
      )
    );

    setUsers(
      updatedUsers
    );

  };

  const toggleBlockUser = (
    userId
  ) => {

    const updatedUsers =
      users.map(
        (user) =>

          user.id === userId
            ? {
                ...user,
                blocked:
                  !user.blocked,
              }
            : user
      );

    updateUsers(
      updatedUsers
    );
    
logActivity(
  `Changed User Status ID ${userId}`,
  "Admin"
);

    toast.success(
      "User Updated"
    );
  };

  const toggleRole = (
    userId
  ) => {

    const updatedUsers =
      users.map(
        (user) =>

          user.id === userId
            ? {
                ...user,
                role:
                  user.role ===
                  "admin"
                    ? "user"
                    : "admin",
              }
            : user
      );

    updateUsers(
      updatedUsers
    );

logActivity(
    `Changed User Role ID ${userId}`,
  "Admin"
);
  
    toast.success(
      "Role Updated"
    );
  };

  const deleteUser = (
    userId
  ) => {

    const confirmed =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmed) {
      return;
    }

    const updatedUsers =
      users.filter(
        (user) =>
          user.id !== userId
      );

    updateUsers(
      updatedUsers
    );

logActivity(
  `Deleted User ID ${userId}`,
  "Admin"
);

    toast.success(
      "User Deleted"
    );
  };

  const filteredUsers =
    users.filter(
      (user) => {

        const matchSearch =
          user.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchRole =
          filterRole ===
          "all"
            ? true
            : user.role ===
              filterRole;

        return (
          matchSearch &&
          matchRole
        );
      }
    );

  const totalUsers =
    users.length;

  const adminCount =
    users.filter(
      (user) =>
        user.role ===
        "admin"
    ).length;

  const blockedCount =
    users.filter(
      (user) =>
        user.blocked
    ).length;

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        👥 User Management
      </h2>

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card p-3 shadow">

            <h6>
              Total Users
            </h6>

            <h3>
              {totalUsers}
            </h3>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-3 shadow">

            <h6>
              Admins
            </h6>

            <h3>
              {adminCount}
            </h3>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-3 shadow">

            <h6>
              Blocked Users
            </h6>

            <h3>
              {blockedCount}
            </h3>

          </div>

        </div>

      </div>

      <div className="row mb-4">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Search User"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="col-md-6">

          <select
            className="form-select"
            value={filterRole}
            onChange={(e) =>
              setFilterRole(
                e.target.value
              )
            }
          >

            <option value="all">
              All Roles
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="user">
              User
            </option>

          </select>

        </div>

      </div>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map(
            (user) => (

              <tr
                key={user.id}
              >

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role ||
                    "user"}
                </td>

                <td>

                  {user.blocked
                    ? "Blocked"
                    : "Active"}

                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      toggleRole(
                        user.id
                      )
                    }
                  >
                    Role
                  </button>

                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() =>
                      toggleBlockUser(
                        user.id
                      )
                    }
                  >
                    {user.blocked
                      ? "Unblock"
                      : "Block"}
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteUser(
                        user.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminUsers;