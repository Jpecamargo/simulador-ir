import Container from "@/components/Container";
import Input from "@/components/Form/Input";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tax } from "../../../@types/taxes";
import { useAuth } from "../../../contexts/authContext";
import { api } from "../../../services/api";

const schema = yup.object().shape({
  year: yup
    .number()
    .required("Ano é obrigatório"),
  salary: yup.number().required("Renda anual bruta é obrigatória"),
  dependents: yup.number().required("Número de dependentes é obrigatório"),
  education_expenses: yup.number().required("Gasto anual com ensino é obrigatório"),
  health_expenses: yup.number().required("Despesa anual médica é obrigatória"),
  irrf: yup
    .number()
    .required("Imposto de renda retido na fonte é obrigatório"),
});

export default function Declaracao() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const payload: Tax = {
        ...data,
        user_id: user?.sub,
      }
      await api.post("/taxes/create", payload);
      alert("Declaração enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar declaração:", error);
      alert("Erro ao enviar declaração");
    }
  };

  return (
    <>
      <Header />
      <Container
        title="Nova declaração"
        description="Preencha os campos abaixo para criar uma nova declaração."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <Input
              type="number"
              label="Qual sua renda anual bruta?"
              {...register("year")}
              error={errors.year?.message}
            />
            <Input
              type="number"
              label="Qual sua renda anual bruta?"
              {...register("salary")}
              error={errors.salary?.message}
            />
            <Input
              type="number"
              label="Quantos dependentes você tem?"
              {...register("dependents")}
              error={errors.dependents?.message}
            />
            <Input
              type="number"
              label="Qual seu gasto anual com ensino?"
              {...register("education_expenses")}
              error={errors.education_expenses?.message}
            />
            <Input
              type="number"
              label="Qual sua despesa anual médica?"
              {...register("health_expenses")}
              error={errors.health_expenses?.message}
            />
            <Input
              type="number"
              label="Quanto do seu imposto de renda é retido na fonte?"
              {...register("irrf")}
              error={errors.irrf?.message}
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Enviar
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["simuladorIR.token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
