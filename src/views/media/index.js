import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Media = () => {
    const [data, setData] = useState([]);

    const columns = [
        {field: 'id', headerName: 'ID', width: 200},
        {field: 'collectionName', headerName: 'Collection Name', width: 200},
        {field: 'isVideo', headerName: 'Is Video', width: 200},
        {field: 'mediaList', headerName: 'Media List', width: 200}
    ];

    useEffect(() => {
        axios
            .get('https://sharklien-backend.herokuapp.com/api/media/get-all-media-collection')
            .then((response) => {
                setData(response?.data?.data || []);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(data);

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </div>
    );
};

export default Media;
