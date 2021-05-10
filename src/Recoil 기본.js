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

const columnsState = atom({
  key: "columnsState",
  default: [],
});

const colDefsMedalsIncluded = [
  {
    field: "athlete",
    headerName: "수상자",
    filter: "agSetColumnFilter",
    filterParams: { cellHeight: 20 },
    enableRowGroup: true,
  },
  { field: "age", headerName: "나이" },
  { field: "country", headerName: "국가" },
  { field: "sport", headerName: "종목" },
  { field: "year", headerName: "연도" },
  {
    field: "date",
    headerName: "수상일자",
    minWidth: 130,
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;
        const dateParts = dateAsString.split("/");
        const cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      },
    },
  },
  { field: "gold", headerName: "금메달" },
  { field: "silver", headerName: "은메달" },
  { field: "bronze", headerName: "동메달" },
];

const colDefsMedalsExcluded = [
  {
    field: "athlete",
    headerName: "수상자",
    filter: "agSetColumnFilter",
    filterParams: { cellHeight: 20 },
    enableRowGroup: true,
  },
  { field: "age", headerName: "나이" },
  { field: "country", headerName: "국가" },
  { field: "sport", headerName: "종목" },
  { field: "year", headerName: "연도" },
  {
    field: "date",
    headerName: "수상일자",
    minWidth: 130,
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;
        const dateParts = dateAsString.split("/");
        const cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      },
    },
  },
];

const RecoilTest = () => {
  const [rowData, setRowData] = useRecoilState(olympicState);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [columns, setColumns] = useRecoilState(columnsState);

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

  const defaultColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
    editable: true,
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    setColumns(colDefsMedalsExcluded);
    getGridData();
  }, []);

  const onBtExcludeMedalColumns = () => {
    setColumns(colDefsMedalsExcluded);
  };

  const onBtIncludeMedalColumns = () => {
    setColumns(colDefsMedalsIncluded);
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <button onClick={onBtExcludeMedalColumns}>간략하게 보기</button>
        <button onClick={onBtIncludeMedalColumns}>상세하게 보기</button>
        <button onClick={onExportClick}>EXPORT</button>
        <AgGridReact
          rowData={rowData}
          pagination={true}
          paginationPageSize={50}
          defaultColDef={defaultColDef}
          rowGroupPanelShow={"always"}
          onGridReady={onGridReady}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
            ],
            defaultToolPanel: "columns",
          }}
        >
          {columns.map(column => (
            <AgGridColumn {...column} key={column.field} />
          ))}
        </AgGridReact>
      </div>
    </div>
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

let dateFilterParams = {
  filters: [
    {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterDate, cellValue) {
          if (cellValue == null) return -1;
          return getDate(cellValue) - filterDate;
        },
      },
    },
    {
      filter: "agSetColumnFilter",
      filterParams: {
        comparator: function (a, b) {
          return getDate(a) - getDate(b);
        },
      },
    },
  ],
};

function getDate(value) {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}

export default RecoilTest;
