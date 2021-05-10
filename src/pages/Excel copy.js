import React, { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";
import axios from "axios";

const Excel = () => {
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

  const [datas, setDatas] = useState([]);
  const [columns, setColumns] = useState([]);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
      setDatas(response.data);
      setColumns([
        {
          type: "text",
          width: "300",
          name: "name",
          title: "name",
        },
        {
          type: "text",
          width: "200",
          name: "email",
          title: "email",
        },
      ]);

      setOptions([
        {
          data: { users },
          columns: { columns },
        },
      ]);

      if (!jRef.current.jspreadsheet) {
        jspreadsheet(jRef.current, { options });
      }
      console.log("3");
    });
    console.log("1");

    console.log("2");
    console.log(options);
  }, []);

  const jRef = useRef(null);

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
