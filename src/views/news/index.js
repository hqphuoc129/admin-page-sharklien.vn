import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const News = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return <div>hihihihihhi</div>;
};

export default News;
