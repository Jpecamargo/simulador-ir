import Container from "@/components/Container";
import Input from "@/components/Form/Input";

export default function Registro() {
    return (
        <Container title="Registro" description="Preencha os campos abaixo para se registrar.">
            <form action="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Input label="Nome" />
                    <Input label="Email" />
                    <Input label="Senha" />
                    <Input label="Confirmação de senha" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Cadastrar
                    </button>
                </div>
            </form>
        </Container>
    )
}