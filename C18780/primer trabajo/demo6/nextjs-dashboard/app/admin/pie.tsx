'use client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Chart } from "react-google-charts";

//EJemplo de data
/*export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];*/

export const options = {
    title: "My Daily Activities",
};

export default function Pie({ data }: { data: (string | number)[][] }) {
    return (
        <><Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"400px"}
            height={"400px"}
        /></>
    );
}