import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Axios from "axios";

export default function UpdateNewsForm({ values, setValues, updateUrl }) {
  function handleOnchange(e) {
    const newdata = { ...values };
    newdata[e.target.id] = e.target.value;
    setValues(newdata);
    console.log(newdata);
  }

  return (
    <form method="PUT">
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="Title"
            onChange={(e) => handleOnchange(e)}
            value={values.title}
            id="title"
            fullWidth
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
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <TextField
            variant="outlined"
            label="URL"
            value={updateUrl}
            id="url"
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
}
