import { useEffect, useState, createContext, useCallback } from "react";
import "../images/image.scss";
// material-ui
import { Button, IconButton } from "@mui/material";

import Popup from "../../layout/Popup";
import VideoForm from "./form";
import Axios from "axios";
import { Table, Image, Divider, Modal } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const getYoutubeThumbnail = (url, quality) => {
  if (url) {
    var video_id, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      var quality_key = "maxresdefault"; // Max quality
      if (quality == "low") {
        quality_key = "sddefault";
      } else if (quality == "medium") {
        quality_key = "mqdefault";
      } else if (quality == "high") {
        quality_key = "hqdefault";
      }

      var thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      return thumbnail;
    }
  }
  return false;
};

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
            const thumbnailUrl = getYoutubeThumbnail(i);

            return (
              <div key={idx}>
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    height={56}
                    width={100}
                    alt="thumbnail"
                  />
                ) : null}
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

const Videos = () => {
  const [state, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const { confirm } = Modal;
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    Axios.get(
      "https://sharklien-backend.herokuapp.com/api/media/get-all-media-collection/video"
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
        <>
          <Button
            variant="contained"
            style={{ marginBottom: "2rem" }}
            onClick={() => setOpenPopup(!openPopup)}
          >
            Create Video Collection
          </Button>
          <Popup
            openPopup={openPopup}
            title={"Create Video Collection"}
            setOpenPopup={setOpenPopup}
          >
            <VideoForm />
          </Popup>
          <Table
            columns={columns(onDelete)}
            dataSource={state}
            pagination={{ pageSize: 10 }}
          />
        </>
      )}
    </div>
  );
};

export default Videos;
