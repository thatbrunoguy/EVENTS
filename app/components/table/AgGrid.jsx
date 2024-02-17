// "use client";

// import { AgGridReact } from "ag-grid-react";
// import { useEffect, useMemo, useState } from "react";

// const AgGridTable = ({ rows, columns, height = 600 }) => {
//   const defaultColDef = useMemo(() => ({
//     sortable: true,
//   }));
//   const [colDefs, setColDefs] = useState([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" },
//     { field: "electric" },
//   ]);

//   const [rowData, setRowData] = useState([
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//   ]);

//   useEffect(() => {
//     import("ag-grid-community/styles/ag-grid.css");
//     import("ag-grid-community/styles/ag-theme-quartz.css");
//   }, []);
//   return (
//     <div className="ag-theme-quartz w-auto" style={{ height }}>
//       <AgGridReact
//         rowData={rows}
//         columnDefs={columns}
//         defaultColDef={defaultColDef}
//       />
//       ;
//     </div>
//   );
// };
// export default AgGridTable;
