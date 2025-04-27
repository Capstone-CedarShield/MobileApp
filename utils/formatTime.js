export const formatTime = (time) => {
  if (!time) return "N/A";
  
  const now = new Date();
  const inputTime = new Date(time);

  // Get the current date for comparisons
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the time is today or yesterday
  const isToday = inputTime >= today;
  const isYesterday = inputTime >= yesterday && inputTime < today;

  // Format the time
  const hours = inputTime.getHours();
  const minutes = inputTime.getMinutes();
  const isPM = hours >= 12;
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${isPM ? "PM" : "AM"}`;

  if (isToday) {
    return `Today, ${formattedTime}`;
  } else if (isYesterday) {
    return `Yesterday, ${formattedTime}`;
  } else {
    const formattedDate = inputTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${formattedDate}, ${formattedTime}`;
  }
};
