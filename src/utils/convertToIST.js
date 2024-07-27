export const convertToIST = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  };
  return new Intl.DateTimeFormat("en-IN", options).format(date);
};
