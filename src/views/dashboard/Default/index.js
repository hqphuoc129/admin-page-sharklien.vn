import {useEffect, useState} from 'react';

// material-ui
import {Grid, Button} from '@mui/material';

// project imports
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            hehheeh
        </div>
    );
};

export default Dashboard;
