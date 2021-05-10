import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";

const Table = () => {
  const [gridApi, setGridApi] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Body",
      field: "body",
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    setGridApi(params.api);

    // setGridApi(params);
  };

  const getGridData = () => {
    let empty = [];
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(result => {
        for (let step = 10; step < 20; step++) {
          empty.push(result.data[step]);
        }
        console.log(empty);
        setRowData(empty);
        // setRowData(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onPaginationChange = v => {
    setPageSize(Number(v));
  };

  useEffect(() => {
    getGridData();
  }, []);
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <select onChange={e => onPaginationChange(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          // paginationAutoPageSize={true}
        />
      </div>
    </>
  );
};

export default Table;
