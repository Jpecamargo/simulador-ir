interface ContainerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Container({
  title,
  description,
  children,
}: ContainerProps) {
  return (
    <div className="w-full h-full p-4 sm:p-16 max-w-[1000px]">
      <div className="h-full w-full bg-slate-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <h2 className="font-semibold mb-8">{description}</h2>
        {children}
      </div>
    </div>
  );
}
