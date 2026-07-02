import { useEffect, useState } from "react";

import {
  getInventory,
  updateInventory,
} from "../utils/inventory";

import {
  addNotification,
} from "../utils/notifications";

function InventoryDashboard() {

  const [inventory, setInventory] =
    useState({});

  useEffect(() => {
    setInventory(
      getInventory()
    );
  }, []);

const updateStock = (
  productId,
  amount
) => {

  const updatedInventory = {
    ...inventory,

    [productId]:
      Math.max(
        0,
        (inventory[
          productId
        ] || 0) + amount
      ),
  };

  setInventory(
    updatedInventory
  );

  updateInventory(
    updatedInventory
  );

  if (
    updatedInventory[
      productId
    ] <= 5
  ) {

    addNotification(
      "Low Stock Alert",
      `Product ID ${productId} has only ${updatedInventory[productId]} items left`
    );

  }

};

  
  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Inventory Dashboard
      </h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>
              Product ID
            </th>

            <th>
              Stock
            </th>

            <th>
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {Object.entries(
            inventory
          ).map(
            ([id, stock]) => (

              <tr key={id}>

                <td>
                  {id}
                </td>

                <td>

                  {stock <= 0 ? (
                    <span className="badge bg-danger">
                      Out Of Stock
                    </span>
                  ) : stock <= 5 ? (
                    <span className="badge bg-warning text-dark">
                      {stock}
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      {stock}
                    </span>
                  )}

                </td>

                <td>

                  <button
                    className="btn btn-success me-2"
                    onClick={() =>
                      updateStock(
                        id,
                        5
                      )
                    }
                  >
                    +5
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      updateStock(
                        id,
                        -5
                      )
                    }
                  >
                    -5
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

export default InventoryDashboard;