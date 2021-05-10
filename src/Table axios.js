import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
const Table = () => {
  const [gridApi, setGridApi] = useState(null);
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
    // fetch("https://jsonplaceholder.typicode.com/comments")
    //   .then(resp => resp.json())
    //   .then(resp => {
    //     // console.log(resp);
    //     params.api.applyTransaction({ add: resp });
    //     console.log(resp);
    //     // params.api.paginationGoToPage(10);
    //   });
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(response => params.api.applyTransaction({ add: response.data }))

      .catch(Error => {
        console.log(Error);
      });
  };

  const searchDivStyle = { backgroundColor: "#dedede", padding: 10 };
  const onPaginationChange = pageSize => {
    console.log(pageSize);
    gridApi.api.paginationSetPageSize(Number(pageSize));
  };

  const onSortChanged = params => {
    const sortModel = gridApi.getSortModel();
    alert(`${sortModel[0].colId} , ${sortModel[0].sort}`);
  };

  const onGridSizeChanged = () => {
    gridApi.sizeColumnsToFit();
  };
  const searchStyle = {
    width: "100%",
    padding: "10px 20px",
    borderRadius: 20,
    outline: 0,
    border: "2px #68bf40 solid",
    fontSize: "100%",
  };

  const onFilterTextChange = e => {
    gridApi.setQuickFilter(e.target.value);
  };
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: "700px" }}>
        <div style={searchDivStyle}>
          <input
            type="search"
            style={searchStyle}
            onChange={onFilterTextChange}
            placeholder="search somethings..."
          />
        </div>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          onSortChanged={onSortChanged}
          onGridSizeChanged={onGridSizeChanged}
        />
      </div>
    </>
  );
};

export default Table;
