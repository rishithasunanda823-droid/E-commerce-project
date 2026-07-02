export const addNotification = (
  title,
  message
) => {

  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  notifications.unshift({
    id: Date.now(),
    title,
    message,
    read: false,
    date:
      new Date().toLocaleString(),
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(
      notifications
    )
  );
};