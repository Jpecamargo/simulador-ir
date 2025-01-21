"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/authContext";
import Input from "@/components/Form/Input";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(12, "A senha deve ter no máximo 12 caracteres")
    .required("Senha é obrigatória"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center bg-slate-100 w shadow-lg w-full h-[500px] sm:w-96 rounded-lg py-6 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl mb-6">
            Simulador IR
          </h1>
          <h2 className="text-xl sm:text-2xl">
            Bem vindo ao simulador de declaração de imposto de renda 😊
          </h2>
        </div>
        <div className="w-full h-full flex flex-col justify-center px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="text"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input label="Senha" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 w-full"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['simuladorIR.token'];

  if (token) {
      return {
          redirect: {
              destination: '/historico',
              permanent: false,
          },
      };
  }

  return {
      props: {},
  };
};
