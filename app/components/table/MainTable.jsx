import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator_materialize.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
const columns = [
  { title: "Name", field: "name", width: 150 },
  { title: "Age", field: "age", hozAlign: "left", formatter: "" },
  { title: "Favourite Color", field: "col" },
  { title: "Date Of Birth", field: "dob", hozAlign: "center" },
  { title: "Rating", field: "rating", hozAlign: "center", formatter: "" },
  {
    title: "Passed?",
    field: "passed",
    hozAlign: "center",
    formatter: "tickCross",
  },
];

let data = [
  { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
  { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
  {
    id: 3,
    name: "Christine Lobowski",
    age: "42",
    col: "green",
    dob: "22/05/1982",
  },
  {
    id: 4,
    name: "Brendon Philips",
    age: "125",
    col: "orange",
    dob: "01/08/1980",
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    col: "yellow",
    dob: "31/01/1999",
  },
];

import React from "react";

const MainTable = () => {
  return (
    <div className="w-full bg-green-600">
      <ReactTabulator
        data={data}
        columns={columns}
        layout={"fitColumns"}
        responsiveLayout={false}
      />
    </div>
  );
};

export default MainTable;
