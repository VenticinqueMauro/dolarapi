import { useEffect, useState } from "react";

const URL = 'https://dolarapi.com/v1/dolares/blue';

export interface Data {
    venta: number | undefined;
    fechaActualizacion: Date | undefined;
}


export function useDolarAPI() {
    const [dolarapi, setDolarapi] = useState<Data | undefined>();

    useEffect(() => {
        const getDolar = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el valor del dólar.');
                }
                const { venta, fechaActualizacion }: { venta: number, fechaActualizacion: Date } = await response.json();
                setDolarapi({ venta, fechaActualizacion });
            } catch (error) {
                console.error(error);
            }
        };

        getDolar();

    }, []);

    return { dolarapi };
}
