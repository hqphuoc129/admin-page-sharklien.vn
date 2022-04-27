import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

const News = () => {
  const [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "content", headerName: "Content", width: 200 },
    { field: "thumbnailUrl", headerName: "Thumbnail URL", width: 200 },
    { field: "url", headerName: "URL", width: 200 },
  ];

  useEffect(() => {
    axios
      .get("https://sharklien-backend.herokuapp.com/api/news/get-all-news")
      .then((response) => {
        setData(response?.data?.data || []);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
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
    </div>
  );
};

export default News;
