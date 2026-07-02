export const logActivity = (
  action,
  user
) => {

  const logs =
    JSON.parse(
      localStorage.getItem(
        "activityLogs"
      )
    ) || [];

  logs.unshift({
    date:
      new Date().toLocaleString(),

    user,

    action,
  });

  localStorage.setItem(
    "activityLogs",
    JSON.stringify(logs)
  );
};