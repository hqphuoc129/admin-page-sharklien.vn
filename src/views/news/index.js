import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedDialogs from "layout/CustomizedDialogs";
import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import NewsForm from "./newsform";
import { Grid, Button } from "@mui/material";
import Popup from "layout/Popup";
import GetNewsForm from "./newsform";
import UpdateNewsForm from "./newsupdateform";
import * as React from "react";
import Axios from "axios";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const REACT_APP_API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;
const News = () => {
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    content: "",
    thumbnailUrl: "",
  });
  const [open, setOpen] = useState(false);
  const [updateUrl, setUpdateUrl] = useState("");
  const { confirm } = Modal;
  const handleEditClick = (url) => () => {
    setOpen(true);
    setUpdateUrl(url);
  };
  const deleteNews = useCallback(
    async (url) => {
      confirm({
        title: "Do You Want To Delete This News?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          axios
            .delete(`${REACT_APP_API_ADMIN_URL}/news/delete-news/${url}`)
            .then((res) => {
              setData(data.filter((item) => item.url !== url));
            })
            .catch((err) => {
              console.log(err);
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    [data]
  );
  const submit = () => {
    const url = `${REACT_APP_API_ADMIN_URL}/news/update-news/${updateUrl}`;
    Axios.put(url, {
      title: values.title,
      description: values.description,
      content: values.content,
      thumbnailUrl: values.thumbnailUrl,
      url: updateUrl,
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setValues({
          title: "",
          description: "",
          content: "",
          thumbnailUrl: "",
        });
      })
      .catch((err) => console.log(err));
  };
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 200 },
      { field: "title", headerName: "Title", width: 200 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "content", headerName: "Content", width: 200 },
      { field: "thumbnailUrl", headerName: "Thumbnail URL", width: 200 },
      { field: "url", headerName: "URL", width: 200 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              console.log(params);
              deleteNews(params.row.url).then(() => {
                console.log("deleted");
              });
            }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(params.row.url)}
          />,
        ],
      },
    ],
    [deleteNews, handleEditClick]
  );

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ADMIN_URL}/news/get-all-news`)
      .then((response) => {
        setData(response?.data?.data || []);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <div style={{ height: "90%", width: "100%" }}>
      <div>
        <Button
          variant="contained"
          style={{ marginBottom: "2rem" }}
          onClick={() => setOpenPopup(!openPopup)}
        >
          Create News
        </Button>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <GetNewsForm />
        </Popup>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15, 30]}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.dark",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-main": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      />
      <CustomizedDialogs
        content={
          <UpdateNewsForm
            url={updateUrl}
            values={values}
            setValues={setValues}
            updateUrl={updateUrl}
          />
        }
        open={open}
        setOpen={setOpen}
        submit={submit}
      />
    </div>
  );
};

export default News;
