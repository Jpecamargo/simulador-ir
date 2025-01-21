interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
}

export default function Input({ label, type, placeholder }: InputProps) {
  return (
    <div className="my-6 w-full">
      <p className="">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      />
    </div>
  );
}
