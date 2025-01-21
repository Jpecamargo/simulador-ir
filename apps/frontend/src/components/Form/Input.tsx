interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
}

export default function Input({ label, type, placeholder, ...rest }: InputProps) {
  return (
    <div className="w-full">
      <p className="my-2">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        {...rest}
      />
    </div>
  );
}
