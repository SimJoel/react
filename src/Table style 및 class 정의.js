import react from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Age",
      field: "age",
      cellClass: params => (params.value > 18 ? "moreThan18" : "lessThan18"),
    },
    {
      headerName: "Birth Year",
      field: "birth",
      cellStyle: params =>
        params.value > 2001
          ? { borderRight: "4px green solid" }
          : { borderRight: "4px red solid" },
    },
    {
      headerName: "Phone",
      field: "phone",
    },
  ];

  const rowData = [
    { name: "Rahul", age: 19, birth: 2001, phone: "1111111" },
    { name: "David", age: 17, birth: 2003, phone: "2222222" },
    { name: "Dan", age: 25, birth: 1995, phone: "3333333" },
  ];

  const defaultColDef = {
    flex: 1,
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
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
};
export default Table;
