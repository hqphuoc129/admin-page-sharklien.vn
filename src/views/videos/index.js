import React, { useEffect, useState } from "react";
import "../images/image.scss";
// material-ui
import { Grid, Button } from "@mui/material";

import Popup from "../../layout/Popup";
import ImageForm from "../dashboard/Default/form";
import Axios from "axios";
import { Table } from "antd";

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

const columns = [
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
                  <img src={thumbnailUrl} alt="thumbnail" />
                ) : null}
              </div>
            );
          })}
        </>
      );
    },
  },
];

const Videos = () => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios.get(
      "https://sharklien-backend.herokuapp.com/api/media/get-all-media-collection/video"
    ).then((res) => {
      console.log(res.data);
      setloading(false);
      setstate(
        res.data.data.map((row) => ({
          collectionName: row.collectionName,
          mediaList: row.mediaList,
          id: row.id,
        }))
      );
    });
  };
  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <Table
          columns={columns}
          dataSource={state}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Videos;
