import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';

const MyDataTable = () => {
    const [data, setData] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'content', headerName: 'Content', width: 130 },
        { field: 'thumbnailUrl', headerName: 'Thumbnail URL', width: 130 },
        { field: 'url', headerName: 'URL', width: 130 }
    ];

    useEffect(() => {
        axios
            .get('https://sharklien-backend.herokuapp.com/api/news/get-all-news')
            .then((response) => {
                setData(response?.data?.data || []);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(data);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </div>
    );
};

export default MyDataTable;
