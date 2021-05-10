import react, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const numberState = atom({
  key: "numberState",
  default: 0,
});

const RecoilTest = () => {
  const [number, setNumber] = useRecoilState(numberState);

  return (
    <button onClick={() => setNumber(prevNum => prevNum + 1)}>{number}</button>
  );
};

export default RecoilTest;
