import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { notification, Upload, message, Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";

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
const { Dragger } = Upload;
export default function ImageForm({ setOpenPopup }) {
  const url = "http://127.0.0.1:5000/api/media/create-image-collection";
  const [values, setValues] = useState(initialValues);
  const [fileSelected, setFileSelected] = useState({
    files: [],
  });
  const classes = useStyles();

  // const saveFileSelected = (file) => {
  //   console.log("In saveFileSelected");
  //   setFileSelected({ files: [...fileSelected.files, file] });
  //   console.table(fileSelected.files);
  //   console.log("End saveFileSelected");
  // };
  const [fileList, setFileList] = useState([]);
  const props = {
    name: "file",
    multiple: true,
    action: (file) => setFileSelected({ files: [...fileSelected.files, file] }),
    beforeUpload: (file) => {
      console.log("In beforeUpload");
      setFileList([...fileList, file]);
      console.log("End beforeUpload");
      return true;
    },
    listType: "picture",
    defaultFileList: [...fileList],
    onChange: (info) => {
      console.log("info", info);
      setFileList((fileList) => [
        ...fileList,
        {
          uid: info.file.uid,
          name: info.file.name,
          url: info.file,
        },
      ]);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      setFileSelected({ files: [...fileSelected.files, e.dataTransfer.files] });
      console.log("Updated files", fileSelected.files);
    },
    onRemove: (file) => {
      console.log("Removed file", file);
      setFileSelected({
        files: fileSelected.files.filter((f) => f.uid !== file.uid),
      });
      console.log("Updated files", fileSelected.files);
    },
  };
  console.log("fileSelected", fileSelected.files);

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collectionName", values.collectionName);
    for (let i = 0; i < fileSelected.files.length; i++) {
      formData.append("file", fileSelected.files[i]);
    }
    console.log(formData);
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
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
        {/*<Grid item xs={12} className={classes.paddingGrid}>*/}
        {/*  <label htmlFor="contained-button-file">*/}
        {/*    <Input*/}
        {/*      accept="image/*"*/}
        {/*      id="contained-button-file"*/}
        {/*      multiple*/}
        {/*      type="file"*/}
        {/*      onChange={(e) => saveFileSelected(e)}*/}
        {/*    />*/}
        {/*    <Button variant="contained" component="span">*/}
        {/*      Upload*/}
        {/*    </Button>*/}
        {/*  </label>*/}
        {/*</Grid>*/}
      </Grid>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Button
        type="submit"
        variant="outlined"
        fullWidth
        style={{ margin: "1rem auto 0.5rem" }}
        onClick={(e) => submit(e)}
      >
        Submit
      </Button>
    </Form>
  );
}
