"use client";

import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

const rows = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];

export default function GlobalTable({ columns, rows }) {
  return (
    <DataGrid
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      enableCellSelect
      rowGetter={() => {}}
      className="rdg-light h-auto"
      columns={columns}
      rows={rows}
    />
  );
}
