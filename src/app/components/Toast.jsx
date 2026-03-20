const Toast = ({ message, type }) => {
  const bgClass =
    type === "success"
      ? "bg-gradient-to-r from-blue-900 to-blue-600"
      : type === "info"
        ? "bg-gradient-to-r from-blue-900 to-blue-600"
        : "bg-gradient-to-r from-red-900 to-red-600";

  return (
    <div className="fixed top-16 right-5 z-50">
      <div
        className={`px-4 py-2 rounded-sm shadow-2xl text-white font-semibold ${bgClass} transform transition-all duration-300 hover:scale-105`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
