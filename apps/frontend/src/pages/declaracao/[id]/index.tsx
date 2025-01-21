import Container from "@/components/Container";
import Input from "@/components/Form/Input";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useAuth } from "../../../../contexts/authContext";
import { Tax } from "../../../../@types/taxes";
import { api } from "../../../../services/api";
import { useEffect, useState } from "react";

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

export default function EditarDeclaracao() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/taxes/find/${id}`);
        const data = response.data;
        setValue("year", data.year);
        setValue("salary", data.salary);
        setValue("dependents", data.dependents);
        setValue("education_expenses", data.education_expenses);
        setValue("health_expenses", data.health_expenses);
        setValue("irrf", data.irrf);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar declaração:", error);
        alert("Erro ao buscar declaração");
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const payload: Tax = {
        ...data,
        user_id: user?.sub,
      };
      await api.put(`/taxes/update/${id}`, payload);
      router.push("/historico");
    } catch (error) {
      console.error("Erro ao atualizar declaração:", error);
      alert("Erro ao atualizar declaração");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <Container
        title="Editar declaração"
        description="Atualize os campos abaixo para editar a declaração."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <Input
              type="number"
              label="Qual ano da declaração?"	
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
              Atualizar
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
