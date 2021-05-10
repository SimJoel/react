import React, { useRef, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import jspreadsheet from "jspreadsheet-ce";

const Excel = () => {
  const jRef = useRef(null);
  const options = {
    data: [
      {
        name: "Jorge",
        id: "3",
        age: "40",
        gender: "Male",
      },
      {
        name: "Rogerio Sergio",
        id: "4",
        age: "48",
        gender: "Male",
      },
      {
        name: "Jorgina Santos",
        id: "5",
        age: "32",
        gender: "Female",
      },
      {
        name: "Arnaldo Antunes",
        id: "6",
        age: "63",
        gender: "Male",
      },
    ],
    columns: [
      {
        type: "text",
        width: "300",
        name: "id",
        title: "ID",
      },
      {
        type: "text",
        width: "200",
        name: "name",
        title: "NAME",
      },
      {
        type: "text",
        width: "100",
        name: "age",
        title: "AGE",
      },
      {
        type: "text",
        width: "100",
        name: "gender",
        title: "GENDER",
      },
    ],
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
  }, [options]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };

  return (
    <div>
      <div ref={jRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row" />
    </div>
  );
};
export default Excel;
