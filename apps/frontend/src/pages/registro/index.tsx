import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "@/components/Container";
import Input from "@/components/Form/Input";
import { useAuth } from "../../../contexts/authContext";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmacaoSenha: yup
    .string()
    .oneOf([yup.ref("senha"), undefined], "Confirmação de senha não confere")
    .required("Confirmação de senha é obrigatória"),
});

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { register: registerUser } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data.nome, data.email, data.senha);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      alert("Erro ao realizar cadastro");
    }
  };

  return (
    <Container
      title="Registro"
      description="Preencha os campos abaixo para se registrar."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <Input
            label="Nome"
            {...register("nome")}
            error={errors.nome?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Senha"
            type="password"
            {...register("senha")}
            error={errors.senha?.message}
          />
          <Input
            label="Confirmação de senha"
            type="password"
            {...register("confirmacaoSenha")}
            error={errors.confirmacaoSenha?.message}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </Container>
  );
}
