import React, {useState} from 'react';
import {FormControl, Button,FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Switch, TextField} from '@mui/material';
import {Label} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import Axios from 'axios'; 

const initialValues = {
    collectionname: '',
    medialist: [],
    urlvid: '',
    isvideo: false
};


const useStyles = makeStyles (theme => ({
    paddingGrid : { 
        padding: theme.spacing(3)
    }
}))

export default function ImageForm() {
    const [values, setValues] = useState(initialValues);
    const classes = useStyles();
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

        var body = {
            collectionName: "",
            isVideo: false,
            mediaList: [''],
        }


        Axios({
            url : url,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data : body,
            method: 'post',
        })
        .then(res => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
            //handle error
        });
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
                <Grid item xs={6} className={classes.paddingGrid}>
                    <TextField variant="outlined" label="Collection Name"  onChange={(e) => handleOnchange(e)} value={values.collectionname} id="collectionname" />
                </Grid>
                <Grid item xs={6} className={classes.paddingGrid}>
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
                </Grid>
                <Button type="submit"  variant='outlined'>Submit</Button>
            </Grid>
        </form>
    );
}
