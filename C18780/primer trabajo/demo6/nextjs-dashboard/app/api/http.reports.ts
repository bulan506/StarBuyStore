import { useEffect, useState } from "react";

export function useFetchWeeklySales(dateTime: Date) {
    const [weeklySales, setWeeklySales] = useState([]);
    useEffect(() => {
        async function getWeeklySales() {
            const formattedDate = dateTime.toISOString().slice(0, 10);
            const res = await fetch(`https://localhost:7099/api/Reports/weeklySales?dateTime=${formattedDate}`);
            if (!res.ok) {
                throw new Error('Failed to fetch WeeklySales.');
            }
            const data = await res.json();
            setWeeklySales(data);
        }
        getWeeklySales();
    }, []);
    return weeklySales;
}

export default useFetchWeeklySales;


/*export async function useFetchDailySales(dateTime: Date) {
    const [dailySales, setDailySales] = useState([]);

    useEffect(() => {
        async function getDailySales() {
            const formattedDate = dateTime.toISOString().slice(0, 10);
            const res = await fetch(`https://localhost:7099/api/Reports/dailySales?dateTime=${formattedDate}`);
            if (!res.ok) {
                throw new Error('Failed to fetch DailySales.');
            }
            const data = await res.json();
            setDailySales(data);
        }
        getDailySales();
    }, [dateTime]);

    return dailySales;
}*/
