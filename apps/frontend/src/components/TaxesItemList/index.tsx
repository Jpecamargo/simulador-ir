import { useRouter } from "next/navigation";
import { Tax } from "../../../@types/taxes";
import { api } from "../../../services/api";

interface TaxesItemListProps extends Tax {}

export default function TaxesItemList({
  id,
  user_id,
  year,
  salary,
  dependents,
  education_expenses,
  health_expenses,
  irrf,
}: TaxesItemListProps) {
  const router = useRouter();

  const deleteTax = async (id: number) => {
    api.delete(`/taxes/delete/${id}`).then(() => {
      router.refresh();
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-4 bg-gray-100 rounded-lg">
          <p className="text-xl">
            Ano: <b>{year}</b>
          </p>
          <p>
            Renda bruta anual: <b>{salary}</b>
          </p>
          <p>
            Dependentes: <b>{dependents}</b>
          </p>
          <p>
            Gastos com educação: <b>{education_expenses}</b>
          </p>
          <p>
            Gastos com saúde: <b>{health_expenses}</b>
          </p>
          <p>
            Imposto retiro na fonte: <b>{irrf}</b>
          </p>
        </div>
        <div className="flex gap-4 sm:flex-col justify-center items-center p-4 bg-gray-100 rounded-lg">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => router.push(`/declaracao/${id}`)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              deleteTax(id);
            }}
          >
            Excluir
          </button>
        </div>
      </div>
      <div className="w-[100%] border-[1px] border-solid border-slate-300"></div>
    </>
  );
}
