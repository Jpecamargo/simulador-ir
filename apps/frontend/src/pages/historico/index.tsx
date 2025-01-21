import Container from "@/components/Container";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../../../contexts/authContext";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Tax } from "../../../@types/taxes";

export default function Historico() {
  const { user } = useAuth();
  const [taxes, setTaxes] = useState<Tax[]>([]);

  useEffect(() => {
    if (!user) return;
    api.get(`/taxes/all/${user.sub}`).then((response) => {
      setTaxes(response.data);
    });
  }, [user]);

  return (
    <>
      <Header />
      <Container title="Histórico" description="Veja todas as suas declarações">
        {taxes.length > 0 ? (
          taxes.map((tax: Tax) => (
            <div key={tax.id}>
              <p>Valor: {tax.salary}</p>
              <p>Descrição: {tax.year}</p>
              <p>Usuário: {tax.user_id}</p>
            </div>
          ))
        ) : (
          <div className="text-lg">
            <p>Parece que você ainda não tem nenhuma declaração registrada 😢</p>
            <p>Clique em <b>"Nova declaração"</b> na barra de navegação para cadastrar suas simulações de declaração do imposto de renda"</p>
          </div>
        )}
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
