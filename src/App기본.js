import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
function App() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000, ta: 0 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const dada = [
    { make: "Toyota2", model: "Celica", price: 35000 },
    { make: "Ford2", model: "Mondeo", price: 32000 },
    { make: "Porsche2", model: "Boxter", price: 72000 },
    { make: "Toyota2", model: "Celica", price: 35000 },
    { make: "Ford2", model: "Mondeo", price: 32000 },
    { make: "Porsche2", model: "Boxter", price: 72000 },
  ];

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const updateData = () => {
    console.log(rowData);
  };
  const onBtnExportDataAsExcel = () => {
    gridApi.exportDataAsExcel(rowData);
  };

  const onBtExport = () => {
    var columnWidth = getBooleanValue("#columnWidth")
      ? getTextValue("#columnWidthValue")
      : undefined;
    var params = {
      columnWidth:
        columnWidth === "myColumnWidthCallback"
          ? myColumnWidthCallback
          : parseFloat(columnWidth),
      sheetName:
        getBooleanValue("#sheetName") && getTextValue("#sheetNameValue"),
      exportMode: getBooleanValue("#exportModeXml") ? "xml" : undefined,
      suppressTextAsCDATA: getBooleanValue("#suppressTextAsCDATA"),
      rowHeight: getBooleanValue("#rowHeight")
        ? getNumericValue("#rowHeightValue")
        : undefined,
      headerRowHeight: getBooleanValue("#headerRowHeight")
        ? getNumericValue("#headerRowHeightValue")
        : undefined,
    };
    gridApi.exportDataAsExcel(params);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button
        onClick={() => onBtExport()}
        style={{ margin: "5px", fontWeight: "bold" }}
      >
        Export to Excel
      </button>

      <AgGridReact
        rowData={rowData}
        rowSelection="multiple"
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          editable: true,
        }}
      >
        <AgGridColumn
          field="make"
          cellEditor="agSelectCellEditor"
          cellEditorParams={{
            values: ["Porsche", "Toyota", "Ford", "Hyundai", "kia"],
          }}
        />
        <AgGridColumn field="date" editable={true} cellEditor="datePicker" />
        <AgGridColumn
          field="model"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="price"
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
      <button onClick={updateData}>업데이트</button>
    </div>
  );
}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}
function getTextValue(cssSelector) {
  return document.querySelector(cssSelector).value;
}
function getNumericValue(cssSelector) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = "Invalid number entered in " + cssSelector + " field";
    alert(message);
    throw new Error(message);
  }
  return value;
}
function myColumnWidthCallback(params) {
  var originalWidth = params.column.getActualWidth();
  if (params.index < 7) {
    return originalWidth;
  }
  return 30;
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function (params) {
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    this.eInput.classList.add("ag-input");
    this.eInput.style.height = "100%";
    // $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function () {};
  Datepicker.prototype.isPopup = function () {
    return false;
  };
  return Datepicker;
}

export default App;
