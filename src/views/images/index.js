import { Table, Image, Divider, Modal } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./image.scss";
import { IconButton } from "@mui/material";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Popup from "layout/Popup";
import ImageForm from "./form";

const columns = (onDelete) => [
  {
    title: "ID",
    dataIndex: "id",
    width: "20%",
  },
  {
    title: "Collection Name",
    dataIndex: "collectionName",
    width: "20%",
  },
  {
    title: "Media List",
    dataIndex: "mediaList",
    className: "media-list",
    render: (text, record) => {
      return (
        <>
          {text.map((i, idx) => {
            return (
              <div key={idx}>
                <Image height={56} width={100} src={i} alt={""} />
              </div>
            );
          })}
        </>
      );
    },
  },
  {
    title: "Action",
    render: (data, record) => {
      return (
        <>
          <IconButton
            color="primary"
            aria-label="delete collection"
            component="span"
            onClick={() => {
              onDelete(data.collectionName);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
    },
  },
];

const Images = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [state, setState] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const { confirm } = Modal;
  const getData = () => {
    Axios.get(
      "https://sharklien-backend.herokuapp.com/api/media/get-all-media-collection/image"
    ).then((res) => {
      console.log(res.data);
      setloading(false);
      setState(
        res.data.data.map((row) => ({
          collectionName: row.collectionName,
          mediaList: row.mediaList,
          id: row.id,
        }))
      );
    });
  };
  const onDelete = useCallback(
    (collectionName) => {
      confirm({
        title: "Do You Want To Delete This Collection?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          Axios.delete(
            `https://sharklien-backend.herokuapp.com/api/media/delete-media-collection/${collectionName}`
          ).then(() => {
            setState(
              state.filter((row) => row.collectionName !== collectionName)
            );
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    [state]
  );
  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <div>
          <Button
            variant="contained"
            style={{ marginBottom: "2rem" }}
            onClick={() => setOpenPopup(!openPopup)}
          >
            Create Image
          </Button>
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title={"Create Image Collection"}
          >
            <ImageForm setOpenPopup={setOpenPopup} />
          </Popup>
          <Table
            columns={columns(onDelete)}
            dataSource={state}
            pagination={{ pageSize: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default Images;
