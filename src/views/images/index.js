import { Table } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./image.scss";

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
            return (
              <div key={idx}>
                <img src={i} alt={""} />
              </div>
            );
          })}
        </>
      );
    },
  },
];

const Images = () => {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios.get(
      "https://sharklien-backend.herokuapp.com/api/media/get-all-media-collection/image"
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

export default Images;
