import react from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
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
    {
      headerName: "Action",
      field: "action",
      cellRendererFramework: params => (
        <div>
          <button onClick={() => addButton(params)}>Copy</button>
          <button onClick={() => deleteButton(params)}>Delete</button>
        </div>
      ),
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
    console.log("grid is ready");
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        params.api.applyTransaction({ add: resp });
      });
  };

  const addButton = params => {
    let addData = [
      {
        name: params.data.name,
        email: params.data.email,
        body: params.data.body,
      },
    ];
    console.log(params.node.rowIndex);
    params.api.applyTransaction({
      add: addData,
      addIndex: params.node.rowIndex + 1,
    });
  };

  const deleteButton = params => {};

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "500px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
};

export default Table;
