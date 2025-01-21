import Container from "@/components/Container";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Historico() {
  return (
    <>
      <Header />
      <Container></Container>
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
