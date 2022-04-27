import {useEffect, useState} from 'react';

// material-ui
import {Grid, Button} from '@mui/material';

import Popup from '../../layout/Popup';
import ImageForm from '../dashboard/Default/form';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Videos = () => {
    const [isLoading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            Videos
            <Button variant="contained" onClick={() => setOpenPopup(!openPopup)}>
                Create Image Collection
            </Button>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <ImageForm />
            </Popup>
        </div>
    );
};

export default Videos;
