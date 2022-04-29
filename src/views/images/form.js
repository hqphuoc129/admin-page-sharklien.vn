import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { notification } from "antd";

const useStyles = makeStyles((theme) => ({
  paddingGrid: {
    padding: theme.spacing(3),
  },
}));
const Input = styled("input")({
  display: "none",
});
const initialValues = {
  collectionName: "",
};
export default function ImageForm({ setOpenPopup }) {
  const url = "http://127.0.0.1:5000/api/media/create-image-collection";
  const [values, setValues] = useState(initialValues);
  const [fileSelected, setFileSelected] = useState({
    files: [],
  });
  const classes = useStyles();

  const saveFileSelected = (e) => {
    setFileSelected({ files: [...fileSelected.files, ...e.target.files] });
    // console.table(fileSelected);
  };

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collectionName", values.collectionName);
    for (let i = 0; i < fileSelected.files.length; i++) {
      formData.append("file", fileSelected.files[i]);
    }
    console.log(formData);
    // console.table(formData);
    // console.log(formData.keys());
    // axios
    //   .post(url, formData, {
    //     headers: { "Content-Type": "undefined" },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setOpenPopup(false);
        notification.success({
          message: "Create Image Collection Success",
          description: "",
          top: 100,
          duration: 10000,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Create Image Collection Fail",
          description: "",
          top: 100,
        });
        console.log(error.response);
      });

    setValues(initialValues);
  }

  function handleOnchange(e) {
    const newdata = { ...values };
    newdata[e.target.id] = e.target.value;
    setValues(newdata);
    // console.log(newdata);
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
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => saveFileSelected(e)}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
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
