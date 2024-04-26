'use client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Chart } from "react-google-charts";

export const data = [
    ["Date", "Product", "Quantity", "Price"],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
    ["23/04/2024", "Laptop", "3", 1000000],
];

export const options = {
    allowHtml: true,
    showRowNumber: true,
    legend: { position: "bottom" },
    pageSize: 10,
};

export const formatters = [
    {
        type: "NumberFormat" as const,
        column: 3,
        options: {
            prefix: "₡",
            negativeColor: "red",
            negativeParens: true,
        },
    },
];

export default function Charts() {
    return (
        <>
            <Chart
                chartType="Table"
                width="100%"
                height="400px"
                data={data}
                options={options}
                formatters={formatters}
            />
        </>
    );
}