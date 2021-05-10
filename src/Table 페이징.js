import react, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const [gridApi, setGridApi] = useState();
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

  const onGridReady = params => {
    setGridApi(params);

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(resp => resp.json())
      .then(resp => {
        // console.log(resp);
        params.api.applyTransaction({ add: resp });
        console.log(resp);
        // params.api.paginationGoToPage(10);
      });
  };

  const onPaginationChange = pageSize => {
    console.log(pageSize);
    gridApi.api.paginationSetPageSize(Number(pageSize));
  };

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
          // rowData={rowData}
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
