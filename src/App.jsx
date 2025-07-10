import React, { useEffect, useState } from 'react';
import CryptoDashboard from './components/CryptoDashboard';
import { fetchCoins, postHistory } from './services/api';

const App = () => {
    const [coins, setCoins] = useState([]);

    const getCoinsData = async () => {
        const data = await fetchCoins();
        setCoins(data);
    };

    const saveHistory = async () => {
        await postHistory(coins);
    };

    useEffect(() => {
        getCoinsData();
        const interval = setInterval(() => {
            getCoinsData();
            saveHistory();
        }, 1800000); // 30 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Cryptocurrency Tracker</h1>
            <CryptoDashboard coins={coins} />
        </div>
    );
};

export default App;