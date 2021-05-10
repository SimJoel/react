import react, { useState, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import axios from "axios";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const olympicState = atom({
  key: "olympicState",
  default: [],
});

const RecoilTest = () => {
  const [rowData, setRowData] = useRecoilState(olympicState);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const getGridData = () => {
    axios
      .get("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then(result => {
        setRowData(result.data);
        console.log(rowData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columnDefs = [
    {
      headerName: "국가",
      field: "country",
      enableRowGroup: true,
    },
    {
      headerName: "종목",
      field: "sport",
      enableRowGroup: true,
    },
    {
      headerName: "수상자",
      field: "athlete",
      enableRowGroup: true,
    },
    {
      headerName: "연도",
      field: "year",
      minWidth: 100,
    },
    {
      headerName: "금메달",
      field: "gold",
    },
    {
      headerName: "은메달",
      field: "silver",
    },
    {
      headerName: "동메달",
      field: "bronze",
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    getGridData();
  }, []);

  return (
    <>
      <div
        id="myGrid"
        style={{
          height: "800px",
          width: "100%",
        }}
        className="ag-theme-alpine-dark"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
          rowGroupPanelShow={"always"}
          onGridReady={onGridReady}
          // paginationAutoPageSize={true}
        />
      </div>
    </>
  );
};

function ServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 400);
    },
  };
}

export default RecoilTest;
