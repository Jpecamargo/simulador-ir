import Container from "@/components/Container";
import Input from "@/components/Form/Input";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Declaracao() {
  return (
    <>
      <Header />
      <Container
        title="Nova declaração"
        description="Preencha os campos abaixo para criar uma nova declaração."
      >
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <Input label="Qual sua renda anual bruta?" />
            <Input label="Quantos dependentes você tem?" />
            <Input label="Qual seu gasto anual com ensino?" />
            <Input label="Qual seu gasto anual com pensão alimentícia?" />
            <Input label="Qual sua despesa anual médica?" />
            <Input label="Quanto do seu imposto de renda é retiro na fonte" />
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
  const token = cookies['simuladorIR.token'];

  if (!token) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      };
  }

  return {
      props: {},
  };
};
