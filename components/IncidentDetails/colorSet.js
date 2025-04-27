const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
    case "urgent":
      return { textColor: "#FF0000", bgColor: "#FFCCCC" }; // Red & Light Red
    case "moderate":
      return { textColor: "#FFD700", bgColor: "#FFF5CC" }; // Gold & Light Gold
    case "low":
      return { textColor: "#008000", bgColor: "#CCFFCC" }; // Green & Light Green
    default:
      return { textColor: "#000000", bgColor: "#DDDDDD" }; // Default Grey
  }
};

export { getSeverityColor };
