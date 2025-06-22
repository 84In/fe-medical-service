export const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-800 hover:text-green-100";
    case "INACTIVE":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-800 hover:text-yellow-100";
    case "HIDDEN":
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-800 hover:text-gray-100";
    case "DELETED":
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-800 hover:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-800 hover:text-gray-100";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Hoạt động";
    case "INACTIVE":
      return "Ngừng hoạt động";
    case "HIDDEN":
      return "Ẩn";
    case "DELETED":
      return "Đã xóa";
    default:
      return status;
  }
};
