import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
    setGridApi(params.api);
  };

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

  const getGridData = () => {
    let empty = [];
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(result => {
        for (let step = 1; step <= 10; step++) {
          empty.push({ id: step });
        }
        empty = empty.concat(result.data);
        console.log(empty);
        setRowData(empty);
        // setRowData(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getGridData();
  }, []);

  const onSelectionChanged = event => {
    console.log(event.api.getSelectedRows());
  };

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "700px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          rowData={rowData}
          onSelectionChanged={onSelectionChanged}
          rowMultiSelectWithClick={true}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
};

export default Table;
