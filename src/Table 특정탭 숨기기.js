import react, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [hideColumn, setHideColumn] = useState(true);
  const [rowData, setRowData] = useState([
    { id: 1, name: "Neeraj", email: "neeraj2020@gmail.com", dob: "23/01/1996" },
    { id: 2, name: "Raj", email: "raj@gmail.com", dob: "08/07/1996" },
    { id: 3, name: "Mayank", email: "mayank@gmail.com", dob: "09/09/1964" },
    { id: 4, name: "Vishal", email: "vk462@gmail.com", dob: "15/01/2020" },
  ]);
  const columnDefs = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "dob", headerName: "Date of Birth" },
  ];

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  const showColumn = () => {
    // gridColumnApi.setColumnVisible("dob", hideColumn);
    gridColumnApi.setColumnsVisible(["dob", "email"], hideColumn);
    setHideColumn(!hideColumn);
    gridApi.sizeColumnsToFit();
  };
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <button onClick={showColumn}>Show DOB</button>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          defaultColDef={{ flex: 1 }}
        />
      </div>
    </>
  );
};

export default Table;
