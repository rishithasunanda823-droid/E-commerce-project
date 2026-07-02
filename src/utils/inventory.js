export const initializeInventory = (
  products
) => {

  const existingInventory =
    localStorage.getItem(
      "inventory"
    );

  if (!existingInventory) {

    const inventory = {};

    products.forEach(
      (product) => {

        inventory[
          product.id
        ] =
          Math.floor(
            Math.random() * 20
          ) + 1;

      }
    );

    localStorage.setItem(
      "inventory",
      JSON.stringify(
        inventory
      )
    );
  }
};

export const getInventory =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          "inventory"
        )
      ) || {}
    );
  };

export const updateInventory =
  (inventory) => {

    localStorage.setItem(
      "inventory",
      JSON.stringify(
        inventory
      )
    );
  };