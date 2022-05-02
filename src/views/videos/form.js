import React, { useState } from "react";
import {
  FormControl,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import { notification } from "antd";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const initialValues = {
  collectionname: "",
  medialist: [],
  urlvid: "",
  isvideo: true,
};
const API_ADMIN_URL = process.env.API_ADMIN_URL;
const useStyles = makeStyles((theme) => ({
  paddingGrid: {
    padding: theme.spacing(3),
  },
}));

export default function VideoForm({ setOpenPopup }) {
  const [values, setValues] = useState(initialValues);
  const classes = useStyles();
  const handleChange = () => {
    setValues({ isvideo: !values.isvideo });
  };

  const url = `${API_ADMIN_URL}/media/create-video-collection`;

  const [fileSelected, setFileSelected] = useState();

  function saveFileSelected(e) {
    console.log(e.target.files[0]);
    console.log(document.getElementById("file").value);
    setFileSelected(e.target.files[0]);
  }

  function submit(e) {
    e.preventDefault();

    const mediafinal = values.medialist.split("\n");

    Axios.post(
      url,
      {
        collectionName: values.collectionname,
        isVideo: true,
        mediaList: mediafinal,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        setOpenPopup(false);
        notification.success({
          message: "Create Video Collection Success",
          description: "",
          top: 100,
          duration: 10000,
        });
      })
      .catch((error) => {
        console.log(error.response);
        setOpenPopup(false);
        notification.error({
          message: "Create Video Collection Fail",
          description: "",
          top: 100,
        });
      });

    setValues(initialValues);
  }

  function handleOnchange(e) {
    const newdata = { ...values };
    newdata[e.target.id] = e.target.value;
    setValues(newdata);
    console.log(newdata);
  }

  return (
    <form method="POST" onSubmit={(e) => submit(e)}>
      <Grid container spacing={2} columnSpacing={{ xs: 1 }}>
        <Grid item xs={12} className={classes.paddingGrid}>
          <TextField
            required
            variant="outlined"
            fullWidth
            label="Collection Name"
            onChange={(e) => handleOnchange(e)}
            value={values.collectionname}
            id="collectionname"
          />
        </Grid>
        <Grid item xs={12} className={classes.paddingGrid}>
          <p>
            Warning: For multiple link, Please enter after paste a link into
            TextArea
          </p>
          <TextareaAutosize
            aria-label="minimum height"
            placeholder="Insert Link"
            minRows={3}
            maxRows={6}
            required
            fullWidth
            style={{ width: "100%" }}
            onChange={(e) => handleOnchange(e)}
            value={values.medialist}
            id="medialist"
          />
        </Grid>
        {/*<Grid item xs={12} className={classes.paddingGrid}>*/}
        {/*  <FormGroup>*/}
        {/*    <FormControlLabel*/}
        {/*      onClick={() => handleChange()}*/}
        {/*      control={<Switch value={values.isvideo} />}*/}
        {/*      label="Video"*/}
        {/*    />*/}
        {/*    {console.log(values.isvideo)}*/}
        {/*  </FormGroup>*/}
        {/*  <Button variant="contained" component="label">*/}
        {/*    Upload File*/}
        {/*    <input*/}
        {/*      type="file"*/}
        {/*      hidden*/}
        {/*      onChange={(e) => saveFileSelected(e)}*/}
        {/*      id="file"*/}
        {/*    />*/}
        {/*  </Button>*/}
        {/*</Grid>*/}
        <Button
          type="submit"
          variant="outlined"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
}
