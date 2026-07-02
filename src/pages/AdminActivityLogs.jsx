import { useEffect, useState } from "react";

function AdminActivityLogs() {

  const [logs, setLogs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filterAction, setFilterAction] =
    useState("all");

  useEffect(() => {

    const storedLogs =
      JSON.parse(
        localStorage.getItem(
          "activityLogs"
        )
      ) || [];

    setLogs(storedLogs);

  }, []);

  const filteredLogs =
    logs.filter((log) => {

      const matchSearch =
        log.user
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        log.action
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchAction =
        filterAction === "all"
          ? true
          : log.action
              ?.toLowerCase()
              .includes(
                filterAction.toLowerCase()
              );

      return (
        matchSearch &&
        matchAction
      );

    });

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        📜 Activity Logs
      </h2>

      <div className="row mb-4">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Search Logs"
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
            value={filterAction}
            onChange={(e) =>
              setFilterAction(
                e.target.value
              )
            }
          >

            <option value="all">
              All Actions
            </option>

            <option value="order">
              Orders
            </option>

            <option value="product">
              Products
            </option>

            <option value="user">
              Users
            </option>

            <option value="login">
              Login
            </option>

            <option value="register">
              Registration
            </option>

          </select>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead>

              <tr>

                <th>Date</th>

                <th>User</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.length >
              0 ? (

                filteredLogs.map(
                  (
                    log,
                    index
                  ) => (

                    <tr
                      key={index}
                    >

                      <td>
                        {
                          log.date
                        }
                      </td>

                      <td>
                        {log.user}
                      </td>

                      <td>
                        {
                          log.action
                        }
                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center text-danger"
                  >
                    No Logs Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminActivityLogs;