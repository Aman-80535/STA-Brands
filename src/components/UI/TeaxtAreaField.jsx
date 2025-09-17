// Reusable textarea field component
export const TextAreaField = ({ name, label, ...props }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      rows={3}
      {...props}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>
);