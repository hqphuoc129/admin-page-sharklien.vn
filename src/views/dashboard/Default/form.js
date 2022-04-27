import React, {useState} from 'react';
import {FormControl, Button,FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Switch, TextField} from '@mui/material';
import {Label} from '@mui/icons-material';
import Axios from 'axios'; 

const initialValues = {
    collectionname: '',
    medialist: [],
    urlvid: '',
    isvideo: false
};

export default function ImageForm() {
    const [values, setValues] = useState(initialValues);

    const handleChange = () => {
        setValues({ isvideo: !values.isvideo});
    };

    const url = "https://sharklien-backend.herokuapp.com/api/media/create-image-collection"

    const [fileSelected, setFileSelected] = useState();



    function saveFileSelected (e){
        console.log(e.target.files[0]);
        console.log(document.getElementById("file").value)
        setFileSelected(e.target.files[0]);
    }


    function submit (e) {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append("File" , fileSelected)
        Axios.post(url, {
            collectionName: values.collectionname,
            mediaList : values.medialist, 
            isVideo: values.isvideo, 
            file: formdata,
        })
        .then(res => {
            console.log(res.data)
        })
    }

    function handleOnchange (e) {
        const newdata = {...values}
        newdata[e.target.id] = e.target.value;
        setValues(newdata)
        console.log(newdata)
    }
    
    return (
        <form method="POST" onSubmit={(e) => submit(e)}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="Collection Name"  onChange={(e) => handleOnchange(e)} value={values.collectionname} id="collectionname" />
                </Grid>
                <Grid item xs={6}>
                    <FormGroup>
                        <FormControlLabel onClick={() => handleChange()} control={<Switch value={values.isvideo} />} label="Video" />
                        {console.log(values.isvideo)}
                    </FormGroup>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                        type="file"
                        hidden
                        onChange={(e) => saveFileSelected(e)} id="file" 
                        />
                    </Button>
                    <Button variant="outlined">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}
