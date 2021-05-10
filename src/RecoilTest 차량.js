"use strict";

import react, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const salesData = [
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "prs",
    exteriorColour: "cb",
    interiorColour: "fg",
    price: 72000,
  },
  {
    make: "tyt",
    exteriorColour: "fg",
    interiorColour: "bw",
    price: 35000,
  },
  {
    make: "frd",
    exteriorColour: "bw",
    interiorColour: "cb",
    price: 32000,
  },
];

const dataState = atom({
  key: "dataState",
  default: salesData,
});

const RecoilTest = () => {
  const [rowData, setRowData] = useRecoilState(dataState);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

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

  const onCellValueChanged = params => {
    console.log("onCellValueChanged: ", params);
  };

  useEffect(() => {
    getGridData();
  }, []);

  const getGridData = () => {
    setRowData(dataState);
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine-dark"
      >
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        >
          <AgGridColumn
            field="make"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{ values: carBrands }}
            filterParams={{
              valueFormatter: params => {
                return lookupValue(carMappings, params.value);
              },
            }}
            valueFormatter={params => {
              return lookupValue(carMappings, params.value);
            }}
          />
          <AgGridColumn
            field="exteriorColour"
            minWidth={150}
            cellEditor="agRichSelectCellEditor"
            cellEditorParams={{
              values: colours,
              cellRenderer: colourCellRenderer,
            }}
            filter="agSetColumnFilter"
            filterParams={{
              values: colours,
              valueFormatter: params => {
                return lookupValue(colourMappings, params.value);
              },
              cellRenderer: colourCellRenderer,
            }}
            valueFormatter={params => {
              return lookupValue(colourMappings, params.value);
            }}
            valueParser={params => {
              return lookupKey(colourMappings, params.newValue);
            }}
            cellRenderer={colourCellRenderer}
          />
          <AgGridColumn
            field="interiorColour"
            minWidth={150}
            cellEditor="agRichSelectCellEditor"
            cellEditorParams={{
              values: colours,
              cellRenderer: colourCellRenderer,
            }}
            filter="agSetColumnFilter"
            filterParams={{
              values: colours,
              valueFormatter: params => {
                return lookupValue(colourMappings, params.value);
              },
              cellRenderer: colourCellRenderer,
            }}
            valueFormatter={params => {
              return lookupValue(colourMappings, params.value);
            }}
            valueParser={params => {
              return lookupKey(colourMappings, params.newValue);
            }}
            cellRenderer={colourCellRenderer}
          />
          <AgGridColumn
            headerName="Retail Price"
            field="price"
            minWidth={140}
            colId="retailPrice"
            valueGetter={params => {
              return params.data.price;
            }}
            valueFormatter={currencyFormatter}
            valueSetter={numberValueSetter}
          />
          <AgGridColumn
            headerName="Retail Price (incl Taxes)"
            minWidth={205}
            editable={false}
            valueGetter={params => {
              return params.getValue("retailPrice") * 1.2;
            }}
            valueFormatter={currencyFormatter}
          />
        </AgGridReact>
      </div>
    </div>
  );
};

var carMappings = {
  tyt: "Toyota",
  frd: "Ford",
  prs: "Porsche",
  nss: "Nissan",
};

var colourMappings = {
  cb: "Cadet Blue",
  bw: "Burlywood",
  fg: "Forest Green",
};

var carBrands = extractValues(carMappings);
var colours = extractValues(colourMappings);

function extractValues(mappings) {
  return Object.keys(mappings);
}

function lookupValue(mappings, key) {
  return mappings[key];
}

function lookupKey(mappings, name) {
  var keys = Object.keys(mappings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (mappings[key] === name) {
      return key;
    }
  }
}

function colourCellRenderer(params) {
  if (params.value === "(Select All)") {
    return params.value;
  }
  return (
    '<span style="color: ' +
    removeSpaces(params.valueFormatted) +
    '">' +
    params.valueFormatted +
    "</span>"
  );
}

function currencyFormatter(params) {
  var value = Math.floor(params.value);
  if (isNaN(value)) {
    return "";
  }
  return "\xA3" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function numberValueSetter(params) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false;
  }
  params.data.price = params.newValue;
  return true;
}

function removeSpaces(str) {
  return str ? str.replace(/\s/g, "") : str;
}

export default RecoilTest;
