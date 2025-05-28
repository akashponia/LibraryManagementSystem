import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

function Dashboard() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_BASE}/data`, { params: { filter } });
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [filter]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <input
                placeholder="Filter..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            /><br /><br />
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Dashboard;
