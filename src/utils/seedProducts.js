export const seedProducts = (
  products
) => {

  const existing =
    localStorage.getItem(
      "adminProducts"
    );

  if (!existing) {

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(
        products
      )
    );

  }
};