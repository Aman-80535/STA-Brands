// Reusable input field component
export const InputField = ({ name, label, type = "text", ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      {...props}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
