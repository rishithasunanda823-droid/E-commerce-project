export const getStatusColor = (
  status
) => {
  switch (status) {
    case "Delivered":
      return "success";

    case "Shipped":
      return "info";

    case "Packed":
      return "primary";

    default:
      return "warning";
  }
};