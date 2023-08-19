import { useState } from "react"
import { useDolarAPI } from "./utils/Api"

interface Price {
  blue: number | undefined;
  pesos: number | undefined;
}

export default function App() {

  const { dolarapi } = useDolarAPI()
  const [price, setPrice] = useState<Price>({
    blue: undefined,
    pesos: undefined
  })

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newPrice: number = Number(e.target.value);
    dolarapi?.venta && setPrice({ blue: newPrice, pesos: dolarapi.venta * newPrice });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-zinc-950">
      <h1 className="flex items-center gap-1 p-2 text-xl font-semibold border rounded border-slate-300">🔥 Dolar Blue: ${dolarapi?.venta}</h1>
      <p>Última Actualización: <b>{dolarapi?.fechaActualizacion ? new Date(dolarapi.fechaActualizacion).toLocaleString('es-ES') : ''}</b></p>
      <input className="px-2 text-black rounded placeholder:text-zinc-600" id="price" type="number" name="price" value={price.blue || ""} placeholder="Ingrese monto en dolares " onChange={handleInput} />
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 p-2 rounded bg-green-600/90">USD <b className="text-lg">{price.blue ?? 0}</b></span>
        <span className="flex items-center gap-1 p-2 bg-blue-400 rounded">ARG <b className="text-xl">{price.pesos ?? 0}</b></span>
      </div>
    </div>
  )
}

