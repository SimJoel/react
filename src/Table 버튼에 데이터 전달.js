import react from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const columnDefs = [
    {
      headerName: "Make",
      field: "make",
    },
    {
      headerName: "Model",
      field: "model",
    },
    {
      headerName: "Price",
      field: "price",
    },
    {
      headerName: "Action",
      field: "action",
      cellRendererFramework: params => (
        <div>
          <button onClick={() => actionButton(params)}>Click Me</button>
        </div>
      ),
    },
  ];

  const actionButton = params => {
    console.log(params);
    alert(`${params.data.make} : ${params.data.price}`);
  };
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  const defaultColDef = {
    // sortable: true,
    // editable: true,
    // filter: true,
    // floatingFilter: true,
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
