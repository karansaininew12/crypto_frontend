import React, { useEffect, useState } from 'react';
import { fetchCoins, postHistory } from '../services/api';

const CryptoDashboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCoinsData = async () => {
        try {
            const data = await fetchCoins();
            setCoins(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching coins data:", error);
            setLoading(false);
        }
    };

    const saveHistory = async () => {
        try {
            await postHistory(coins);
        } catch (error) {
            console.error("Error saving history data:", error);
        }
    };

    useEffect(() => {
        getCoinsData();
        const interval = setInterval(() => {
            getCoinsData();
            saveHistory();
        }, 1800000); // 30 minutes

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Cryptocurrency Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>Change (%)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(coin => (
                        <tr key={coin?.coinId}>
                            <td>{coin?.name}</td>
                            <td>{coin?.symbol}</td>
                            <td>${coin?.current_price?.toFixed(2)}</td>
                            <td>${coin?.market_cap?.toLocaleString()}</td>
                            <td>{coin?.price_change_percentage_24h}%</td>
                            <td>{coin?.ath_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoDashboard;