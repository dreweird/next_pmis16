// components/GridComponent.tsx
"use client";

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { updateData } from '@/lib/updateData';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridComponent = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "h1" },
    { field: "h2" },
    { field: "h3" },
    { field: "h4" },
    { field: "name" },
    { field: "remarks_q1", editable: true },

  ]);

useEffect(() => {
  fetch("/api/list")
    .then((result) => result.json())
    .then((rowData) => {
      console.log("Fetched data:", rowData.data); // log before updating state
      setRowData(rowData.data);
    });
}, []);


const onCellValueChanged = async (event: any) => {
  try {
    const res = await updateData(
      event.data.mfo_id,
      event.colDef.field,
      event.newValue
    );

    if (res.success) {
      alert("Data was successfully updated!");
    } else {
      alert("Data was not updated!");
    }
  } catch (error) {
    console.log("Error updating data:", error);
  }
};
 


  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}  onCellValueChanged={onCellValueChanged} />
    </div>
  );
};

export default GridComponent;

