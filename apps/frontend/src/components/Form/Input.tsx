interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export default function Input({ label, type, placeholder, error, ...rest }: InputProps) {
  return (
    <div className="w-full">
      <p className="my-2">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 py-2 w-full ${error ? "border-red-500" : ""}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>}
    </div>
  );
}
