"use strict";
import react, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import axios from "axios";

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    {
      country: "Ireland",
      state: null,
      city: "Dublin",
    },
    {
      country: "Ireland",
      state: null,
      city: "Galway",
    },
    {
      country: "Ireland",
      state: null,
      city: "Cork",
    },
    {
      country: "United Kingdom",
      state: null,
      city: "London",
    },
    {
      country: "United Kingdom",
      state: null,
      city: "Manchester",
    },
    {
      country: "United Kingdom",
      state: null,
      city: "Liverpool",
    },
    {
      country: "USA",
      state: "New York",
      city: "New York",
    },
    {
      country: "USA",
      state: "New York",
      city: "Albany",
    },
    {
      country: "USA",
      state: "New York",
      city: "Onondaga",
    },
    {
      country: "USA",
      state: "New York",
      city: "Westchester",
    },
    {
      country: "USA",
      state: "California",
      city: "San Diego",
    },
    {
      country: "USA",
      state: "California",
      city: "San Francisco",
    },
  ]);

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onExportClick = () => {
    gridApi.exportDataAsExcel();
  };

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={onExportClick}>EXPORT</button>
      <div style={{ marginBottom: "5px" }}>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={() => onFilterTextBoxChanged()}
        />
      </div>
      <div
        id="myGrid"
        style={{
          height: "1000px",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={{
            field: "city",
            minWidth: 200,
          }}
          columnTypes={{
            numberValue: {
              enableValue: true,
              aggFunc: "sum",
              editable: true,
              valueParser: numberParser,
            },
            dimension: {
              enableRowGroup: true,
              enablePivot: true,
            },
          }}
          components={{
            cityCellRenderer: cityCellRenderer,
            countryCellRenderer: countryCellRenderer,
            stateCellRenderer: stateCellRenderer,
          }}
          groupDefaultExpanded={-1}
          rowGroupPanelShow={"always"}
          animateRows={true}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            field="city"
            type="dimension"
            cellRenderer="cityCellRenderer"
          />
          <AgGridColumn
            field="country"
            type="dimension"
            cellRenderer="countryCellRenderer"
            minWidth={200}
          />
          <AgGridColumn
            field="state"
            type="dimension"
            cellRenderer="stateCellRenderer"
          />
          <AgGridColumn field="val1" type="numberValue" />
          <AgGridColumn field="val2" type="numberValue" />
        </AgGridReact>
      </div>
    </div>
  );
};
var COUNTRY_CODES = {
  Ireland: "ie",
  "United Kingdom": "gb",
  USA: "us",
};
function numberParser(params) {
  return parseInt(params.newValue);
}
function countryCellRenderer(params) {
  if (params.value === undefined || params.value === null) {
    return "";
  } else {
    var flag =
      '<img border="0" width="15" height="10" src="https://flagcdn.com/h20/' +
      COUNTRY_CODES[params.value] +
      '.png">';
    return flag + " " + params.value;
  }
}
function stateCellRenderer(params) {
  if (params.value === undefined || params.value === null) {
    return "";
  } else {
    var flag =
      '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/gold-star.png">';
    return flag + " " + params.value;
  }
}
function cityCellRenderer(params) {
  if (params.value === undefined || params.value === null) {
    return "";
  } else {
    var flag =
      '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/weather/sun.png">';
    return flag + " " + params.value;
  }
}

export default Table;
