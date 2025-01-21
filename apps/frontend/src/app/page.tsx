import Input from "@/components/Form/Input";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center bg-slate-100 w shadow-lg w-full h-[500px] sm:w-96 rounded-lg py-6 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl mb-6">
            Simulador IR
          </h1>
          <h2 className="text-xl sm:truncate sm:text-2xl">
            Bem vindo ao simulador de declaração de imposto de renda 😊
          </h2>
        </div>
        <div className="w-full h-full flex flex-col justify-center px-4">
          <form action="">
            <Input label="Email" type="text" placeholder="seu@email.com" />
            <Input label="Senha" type="password" />
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 w-full">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
