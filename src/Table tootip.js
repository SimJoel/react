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
      tooltipField: "name",
    },
    {
      headerName: "Birth Year",
      field: "birth",
    },
    {
      headerName: "Phone",
      field: "phone",
      minWidth: 130,
      tooltipField: "phone",
      tooltipComponentParams: { color: "#ececec" },
    },
  ];

  const rowData = [
    { name: "Rahul", age: 19, birth: 2001, phone: "1111111" },
    { name: "David", age: 17, birth: 2003, phone: "2222222" },
    { name: "Dan", age: 25, birth: 1995, phone: "3333333" },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableBrowserTooltips={true}
          //툴팁 옵션 활성화
          tooltipShowDelay={{ tooltipShowDelay: 2 }}
          //툴팁 딜레이
        />
      </div>
    </>
  );
};

export default Table;
