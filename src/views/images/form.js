import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { notification, Upload, message, Form, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  paddingGrid: {
    padding: theme.spacing(3),
  },
}));

const initialValues = {
  collectionName: "",
};
const { Dragger } = Upload;
export default function ImageForm({ setOpenPopup, setSpinning }) {
  const url = "http://127.0.0.1:5000/api/media/create-image-collection";
  const [values, setValues] = useState(initialValues);
  const [fileSelected, setFileSelected] = useState([]);
  const classes = useStyles();

  const [fileList, setFileList] = useState([]);
  const props = {
    name: "file",
    multiple: true,
    accept: "image/*",
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 1000);
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
      setFileSelected(info.fileList.map((file) => file.originFileObj));
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function submit(e) {
    e.preventDefault();
    console.log("In submit");
    console.log("fileSelected", fileSelected);
    const formData = new FormData();
    formData.append("collectionName", values.collectionName);
    for (let i = 0; i < fileSelected.length; i++) {
      formData.append("file", fileSelected[i]);
    }
    console.log(formData);
    setOpenPopup(false);
    setSpinning(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setSpinning(false);
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
    console.log(newdata);
  }

  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Input
        placeholder="Collection Name"
        size="middle"
        onChange={(e) => handleOnchange(e)}
        id="collectionName"
      />
      <br />
      <br />
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
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
