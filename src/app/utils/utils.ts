
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getStatusClass = (status: string) => {
  switch (status) {
    case "vacant":
      return "bg-green-100 text-green-700";
    case "occupied":
      return "bg-yellow-100 text-yellow-700";
    case "maintenance":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getFilterButtonClass = (btnStatus: string, currentFilter: string) => {
  const base = "px-3 py-1 rounded font-medium";
  let color = "";

  switch (btnStatus) {
    case "vacant":
      color =
        currentFilter === "vacant"
          ? "bg-green-600 text-white"
          : "bg-green-100 text-green-700";
      break;
    case "occupied":
      color =
        currentFilter === "occupied"
          ? "bg-yellow-600 text-white"
          : "bg-yellow-100 text-yellow-700";
      break;
    case "maintenance":
      color =
        currentFilter === "maintenance"
          ? "bg-red-600 text-white"
          : "bg-red-100 text-red-700";
      break;
    default:
      color =
        currentFilter === "all"
          ? "bg-gray-600 text-white"
          : "bg-gray-200 text-gray-700";
  }

  return `${base} ${color}`;
};
