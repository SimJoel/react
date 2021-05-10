import react from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const data = [
    { name: "Dan", age: 20, text: "1111" },
    { name: "Max", age: 23 },
    { name: "David" },
    { name: "Dog", age: 22 },
  ];

  const columns = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true,
      editable: true,
    },
    {
      headerName: "Text",
      field: "text",
      editable: true,
    },
    {
      headerName: "Age",
      field: "age",
      editable: true,
    },
  ];

  const defaultColDef = {
    // sortable: true,
    // editable: true,
    // filter: true,
    // floatingFilter: true,
    flex: 1,
  };

  const actionButton = params => {
    console.log(params);
  };

  let gridApi;
  const onGridReady = params => {
    gridApi = params.api;
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return (
    <>
      <button onClick={onExportClick}>EXPORT</button>
      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
};
export default Table;
