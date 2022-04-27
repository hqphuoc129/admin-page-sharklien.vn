import {useEffect, useState} from 'react';

// material-ui
import {Grid, Button} from '@mui/material';

// project imports
import Popup from '../../../layout/Popup';
import ImageForm from './form';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            hehheeh
            <Button variant="contained" onClick={() => setOpenPopup(!openPopup)}>
                Create Image Collection
            </Button>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <ImageForm />
            </Popup>
        </div>
    );
};

export default Dashboard;
