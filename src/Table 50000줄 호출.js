import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";

const Table = () => {
  const [gridApi, setGridApi] = useState();
  const [pageSize, setPageSize] = useState(10);
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
    setGridApi(params);
  };

  const getGridData = () => {
    let empty = [];
    for (let step = 1; step <= 100; step++) {
      axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then(result => {
          empty = empty.concat(result.data);
          if (step === 100) {
            console.log("aaa");
            console.log(empty);
            setRowData(empty);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onPaginationChange = v => {
    setPageSize(Number(v));
    //gridApi.api.paginationSetPageSize(Number(pageSize));
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
          defaultColDef={defaultColDef}
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
