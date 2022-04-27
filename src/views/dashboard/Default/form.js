import React, {useState} from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Switch, TextField} from '@mui/material';
import {Label} from '@mui/icons-material';

const initialValues = {
    collectionname: '',
    medialist: [],
    urlvid: '',
    isvideo: false
};

export default function ImageForm() {
    const [values, setValues] = useState(initialValues);

    const handleChange = () => {
        setValues(!values.isvideo, ...values);
    };
    return (
        <form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="Collection Name" value={values.collectionname} />
                </Grid>
                <Grid item xs={6}>
                    <FormGroup>
                        <FormControlLabel onClick={() => handleChange()} control={<Switch value={values.isvideo} />} label="Video" />
                        {console.log(values.isvideo)}
                    </FormGroup>
                </Grid>
            </Grid>
        </form>
    );
}
