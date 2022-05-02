import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import { notification } from "antd";
import {
  Input,
  Button, 
  Form,
  Space
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {FormContent, FormAction } from "./Style";
import { useForm } from "react-hook-form";
import FormControl from "./formcontrol";


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
  const [form]  = Form.useForm()

  const url = `${API_ADMIN_URL}/media/create-video-collection`;

  const [fileSelected, setFileSelected] = useState();

  function saveFileSelected(e) {
    console.log(e.target.files[0]);
    console.log(document.getElementById("file").value);
    setFileSelected(e.target.files[0]);
  }

  function submit(e) {
    e.preventDefault();

    const data  = []

    let geted = form.getFieldsValue()

    geted.linkList.map((items) => data.push(items.linkname))

    const newdata = {...values}
    newdata["medialist"] = data 
    setValues(newdata)

    Axios.post(
      url,
      {
        collectionName: values.collectionname,
        isVideo: true,
        mediaList: newdata["medialist"],
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

  const onSubmit = (e) => {
    console.log(form.getFieldValue())

  };

  return (
    <Form method="post"  form={form} onSubmit={(e) => submit(e)} >
      <FormContent>
        <Input placeholder="Collection Name" 
            onChange={(e) => handleOnchange(e)}
            value={values.collectionname}
            id="collectionname"/>
        <FormControl
        >
          <Form.List name="linkList">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", justifyContent:"center", marginBottom: 8 }}
                      align="center"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "linkname"]}
                        fieldKey={[field.fieldKey, "linkname"]}
                        rules={[
                          { required: true, message: "Missing link name" }
                        ]}
                      > 
                        < Input 
                          placeholder="Link"/>
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                          console.log(field);
                        }}
                      />
                    </Space>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add link
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </FormControl>
        <FormAction>
        <div className="inner-wrapper">
          <Button type="primary" onClick={(e)=>{submit(e)}} htmlType="submit">
            Submit
          </Button>
        </div>
      </FormAction>
      </FormContent>
    </Form>
  );
}
