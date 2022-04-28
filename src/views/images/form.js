import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Axios from "axios";

const initialValues = {
  collectionName: "",
  mediaList: [],
  isVideo: false,
};

const useStyles = makeStyles((theme) => ({
  paddingGrid: {
    padding: theme.spacing(3),
  },
}));

export default function ImageForm() {
  const url =
    "https://sharklien-backend.herokuapp.com/api/media/create-image-collection";
  const [values, setValues] = useState(initialValues);
  const [fileSelected, setFileSelected] = useState();
  const classes = useStyles();

  function saveFileSelected(e) {
    console.log(e.target.files[0]);
    console.log(document.getElementById("file").value);
    setFileSelected(e.target.files[0]);
  }

  function submit(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("collectionName", values.collectionName);
    formdata.append("file", fileSelected);

    var body = {
      ...formdata,
      isVideo: false,
      mediaList: [""],
    };

    Axios.post(
      url,
      {
        body,
      },
      {
        headers: {
          "Content-Type": "multiform/data",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
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
            value={values.collectionName}
            id="collectionName"
          />
        </Grid>
        <Grid item xs={12} className={classes.paddingGrid}>
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => saveFileSelected(e)}
              id="file"
            />
          </Button>
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          style={{ marginLeft: "0.5rem" }}
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
}
