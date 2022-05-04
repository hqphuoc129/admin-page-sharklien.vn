import React, { useState, useCallback } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { notification, Upload, message, Form, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { FormContent } from "views/videos/Style";

const REACT_APP_API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;
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
  const [form] = Form.useForm();
  const url = `${REACT_APP_API_ADMIN_URL}/media/create-image-collection`;
  const [values, setValues] = useState(initialValues);
  const [fileSelected, setFileSelected] = useState([]);
  const classes = useStyles();
  const [inputStatus, setInputStatus] = useState("");
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
      console.log("fileSelected", fileSelected);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("In submit");
      console.log("fileSelected", fileSelected);
      await form.validateFields();
      //check if values.collectionName is empty
      if (values.collectionName === "") {
        setInputStatus("error");
        return notification.error({
          message: "Error",
          description: "Please enter a collection name",
        });
      } else if (fileSelected.length === 0) {
        return notification.error({
          message: "Error",
          description: "Please select at least one image",
        });
      } else {
        setInputStatus("");
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
    },
    [form, fileSelected]
  );

  const formChange = useCallback(() => {
    const { collectionName } = form.getFieldsValue();
    values.collectionName = collectionName;
    setValues(values);
  }, [form]);

  return (
    <Form form={form} wrapperCol={{ span: 32 }} onChange={formChange}>
      <Form.Item name="collectionName" rules={[{ required: true }]}>
        <Input placeholder="Collection Name" />
      </Form.Item>
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
