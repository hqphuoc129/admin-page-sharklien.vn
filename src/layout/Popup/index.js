import React from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div>title day roi</div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}
