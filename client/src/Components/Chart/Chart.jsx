import './Chart.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../../Config/api';


const Chart = ({ days, coin, currency }) => {
    if (days === "1y")
        days = 365;
    else if (days === "1m")
        days = 31;
    else if (days === "1w")
        days = 7;
    else if (days === "24h")
        days = 1;

    const [historicData, setHistoricData] = useState([]);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);
    }

    const [width, setWidth] = useState();
    // console.log(width);

    useEffect(() => {
        fetchHistoricData();
    }, [days, coin, currency]);

    useEffect(() => {
        setWidth(window.innerWidth);
        console.log(width);
    }, [width]);

    const rawData = {
        labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time = date.getHours() > 12
                ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;

            return days === 1 ? time : ((days === 7) ? (date.toLocaleDateString().toString() + " " + time.toString()) : date.toLocaleDateString());
        }),
        datasets: historicData.map((coin) => coin[1])
    };

    // console.log(historicData);
    // console.log(rawData.datasets);

    let data = [];
    for (let i = 0; i < rawData.labels.length; i++) {
        data.push({ "name": rawData.labels[i], "price": rawData.datasets[i] })
    }

    // console.log(data);

    return (
        <div className="chart">
            <ResponsiveContainer width="99%" aspect={(width < 880) ? 2 / 1 : 5 / 1}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 20, bottom: 5 }}>
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="gold" />
                    <YAxis stroke="gold" />
                    <Tooltip
                        labelStyle={{ color: "green" }}
                        itemStyle={{ color: "green" }}
                        formatter={function (value, name) {
                            return (currency === "inr") ? `₹ ${value}` : `$ ${value}`;
                        }}
                        labelFormatter={function (value) {
                            return (days === 1) ? `Time : ${value}` : `Date: ${value}`;
                        }}
                        cursor={{ stroke: 'gold', strokeWidth: 2 }}
                        wrapperStyle={{ backgroundColor: "black" }}
                    />
                    <Line type="monotone" dataKey="price" stroke="gold" />

                </LineChart>

            </ResponsiveContainer>
        </div>
    )
}

export default Chart
