import { useState } from "react";
import { useDolarAPI } from "./utils/Api";

interface Price {
  blue: number | undefined;
  pesos: number | undefined;
}

export default function App() {
  const { dolarapi } = useDolarAPI();
  const [price, setPrice] = useState<Price>({
    blue: undefined,
    pesos: undefined,
  });

  function handleInputDollars(e: React.ChangeEvent<HTMLInputElement>) {
    const newPrice: number = Number(e.target.value);
    dolarapi?.venta &&
      setPrice({ blue: newPrice, pesos: dolarapi.venta * newPrice });
  }

  function handleInputPesos(e: React.ChangeEvent<HTMLInputElement>) {
    const newPrice: number = Number(e.target.value);
    dolarapi?.venta &&
      setPrice({ blue: newPrice / dolarapi.venta, pesos: newPrice });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-zinc-950">
      <h1 className="flex items-center gap-1 p-2 font-semibold border rounded border-slate-300">
        🔥 Dolar Blue: ${dolarapi?.venta}
      </h1>
      <p>
        Última Actualización:{" "}
        <b>
          {dolarapi?.fechaActualizacion
            ? new Date(dolarapi.fechaActualizacion).toLocaleString("es-ES")
            : ""}
        </b>
      </p>
        <input
          className="px-2 rounded placeholder:text-green-300 bg-green-300/20"
          id="price-dollars"
          type="number"
          name="price-dollars"
          value={price.blue || ""}
          placeholder="Ingrese monto en dólares "
          onChange={handleInputDollars}
        />
      <input
        className="px-2 rounded placeholder:text-blue-300 bg-blue-300/20"
        id="price-pesos"
        type="number"
        name="price-pesos"
        value={price.pesos || ""}
        placeholder="Ingrese monto en pesos argentinos"
        onChange={handleInputPesos}
      />
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 px-2 py-1 text-green-300 rounded bg-green-600/20">
          USD <b className="text-lg">{price.blue?.toFixed(2) ?? 0}</b>
        </span>
        <span className="flex items-center gap-1 px-2 py-1 text-blue-400 rounded bg-blue-400/20">
          ARG <b className="text-xl">{price.pesos?.toFixed(2) ?? 0}</b>
        </span>
      </div>
    </div>
  );
}
