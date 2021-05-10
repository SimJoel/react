import React, { useRef, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import jspreadsheet from "jspreadsheet-ce";

const Excel = () => {
  const jRef = useRef(null);
  const [users, setUsers] = useState([
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
  ]);

  const [columns, setColumns] = useState([
    {
      type: "text",
      width: "300",
      name: "id",
      title: "ID",
    },
    {
      type: "autocomplete",
      width: "200",
      name: "name",
      title: "NAME",
      source: ["Apples", "Bananas", "Carrots", "Oranges", "Cheese"],
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
  ]);

  const [options, setOptions] = useState([
    {
      data: users,
      columns: columns,
    },
  ]);

  useEffect(() => {
    setOptions({
      data: users,
      columns: columns,
    });
    console.log(options);
  }, [users, columns]);

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    } else {
      jspreadsheet(jRef.current, options);
    }
  }, [options]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };

  const inserDate = () => {
    setUsers([
      ...users,
      {
        name: "Arnaldo Antunes2",
        id: "7",
        age: "63",
        gender: "Male",
      },
    ]);
  };

  return (
    <div>
      <div ref={jRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row" />
      <input type="button" onClick={inserDate} value="Insert" />
    </div>
  );
};
export default Excel;
