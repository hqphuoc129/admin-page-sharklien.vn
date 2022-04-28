import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Axios from "axios";

const initialValues = {
  title: "",
  description: "",
  content: "",
  thumbnailUrl: "",
  url: "",
};

export default function GetNewsForm() {
  const [values, setValues] = useState(initialValues);

  const url = "https://sharklien-backend.herokuapp.com/api/news/create-news";

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      title: values.title,
      description: values.description,
      content: values.content,
      thumbnailUrl: values.thumbnailUrl,
      url: values.url,
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  }

  function handleOnchange(e) {
    const newdata = { ...values };
    newdata[e.target.id] = e.target.value;
    setValues(newdata);
    console.log(newdata);
  }

  return (
    <form method="POST">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="Title"
            onChange={(e) => handleOnchange(e)}
            value={values.title}
            id="title"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="Description"
            onChange={(e) => handleOnchange(e)}
            value={values.description}
            id="description"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="Content"
            onChange={(e) => handleOnchange(e)}
            value={values.content}
            id="content"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="Thumbnail URL"
            onChange={(e) => handleOnchange(e)}
            value={values.thumbnailUrl}
            id="thumbnailUrl"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="URL"
            onChange={(e) => handleOnchange(e)}
            value={values.url}
            id="url"
            fullWidth
            required
          />
        </Grid>
        <Button onClick={(e) => submit(e)} variant="outlined">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
