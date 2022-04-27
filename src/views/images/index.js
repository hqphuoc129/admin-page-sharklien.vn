import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Images = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return <div>Images</div>;
};

export default Images;
