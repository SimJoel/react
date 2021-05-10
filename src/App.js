import "./App.css";
import react, { useState, useEffect } from "react";
import RecoilTest from "./RecoilTest";
import { RecoilRoot } from "recoil";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Container, Row } from "react-bootstrap";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  return (
    <RecoilRoot>
      <RecoilTest />
    </RecoilRoot>
  );
}
export default App;
