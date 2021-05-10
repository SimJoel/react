"use strict";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import axios from "axios";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

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

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = data => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then(resp => resp.json())
      .then(data => updateData(data));
  };

  const saveState = () => {
    window.colState = gridColumnApi.getColumnState();
    console.log("column state saved");
  };

  const restoreState = () => {
    if (!window.colState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    gridColumnApi.applyColumnState({
      state: window.colState,
      applyOrder: true,
    });
    console.log("column state restored");
  };

  const resetState = () => {
    gridColumnApi.resetColumnState();
    console.log("column state reset");
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
        <div className="test-container">
          <div className="test-header">
            <div className="example-section">
              <button onClick={() => saveState()}>Save State</button>
              <button onClick={() => restoreState()}>Restore State</button>
              <button onClick={() => resetState()}>Reset State</button>
            </div>
          </div>
          <div
            id="myGrid"
            style={{
              height: "800px",
              width: "100%",
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              defaultColDef={{
                sortable: true,
                resizable: true,
                width: 100,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
              }}
              sideBar={{ toolPanels: ["columns"] }}
              rowGroupPanelShow={"always"}
              pivotPanelShow={"always"}
              debug={true}
              rowData={rowData}
              onGridReady={onGridReady}
            >
              <AgGridColumn field="athlete" />
              <AgGridColumn field="age" />
              <AgGridColumn field="country" />
              <AgGridColumn field="sport" />
              <AgGridColumn field="year" />
              <AgGridColumn field="date" />
              <AgGridColumn field="gold" />
              <AgGridColumn field="silver" />
              <AgGridColumn field="bronze" />
              <AgGridColumn field="total" />
            </AgGridReact>
          </div>
        </div>
      </div>
    </>
  );
};

render(<RecoilTest></RecoilTest>, document.querySelector("#root"));
export default RecoilTest;
