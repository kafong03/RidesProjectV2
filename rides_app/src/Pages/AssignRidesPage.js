import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

ModuleRegistry.registerModules([ClientSideRowModelModule]);
const AssignRidesPage = () =>{
    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const gridRef = useRef();
    const [passengerList, setPassengerList] = React.useState([]);
    const [dataGridApi, setDataGridApi] = useState(null);

    const [colDefs, setColDefs] = useState([
        { field: "name", dndSource: true  },
        { field: "address" },
        { field: "location" },
        { field: "friday" },
        { field: "first" },
        { field: "second" },
        { field: "third" },
        { field: "contact" },
        { field: "flagged" },
        { field: "notes" },
    ]);


    const [rowData, setRowData] = useState(
        // passengerList.map(passenger => ({
        //     id: passenger.id,
        //     name: passenger.name,
        //     address: passenger.address,
        //     location: passenger.location,
        //     friday: passenger.friday ? "yes" : "no",
        //     first: passenger.sunday1st ? "yes" : "no",
        //     second: passenger.sunday2nd ? "yes" : "no",
        //     third: passenger.sunday3rd ? "yes" : "no",
        //     contact: passenger.contact,
        //     flagged: passenger.flagged,
        //     notes: passenger.notes
        // }))

 
        [       {
            id: "test",
            name: "test name",
            address: "test address",
            location: "passenger.location",
            friday: "no",
            first: "yes",
            second: "no",
            third: "no",
            contact: "passenger.contact",
            flagged: "passenger.flagged",
            notes: "passenger.notes"
        }]
    );

    const addGridDropZone = (gridPos, api) => {
        const dropApi = dataGridApi;
        const dropZone = dropApi.getRowDropZoneParams();

        api.addRowDropZone(dropZone);
    };

    useEffect(() => {
        if (dataGridApi) {
            addGridDropZone('data', dataGridApi);
        }
    });

    const getRowId = useCallback((params) => String(params.data.id), []);

    const onGridReady = (gridPos, params) => {
        if (gridPos === 'data') {
            setDataGridApi(params.api);
        }
    };

    return (<div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
        >
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            autoSizeStrategy={autoSizeStrategy}
            rowDragManaged={true}
            getRowId={getRowId}
            onGridReady={(params) => onGridReady('data', params)}
        />
        </div>)
};

// import React, {
//     useCallback,
//     useMemo,
//     useRef,
//     useState,
//   } from "react";
//   import { AgGridReact } from "@ag-grid-community/react";
//   import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
//   import { ModuleRegistry, createGrid } from "@ag-grid-community/core";
//   import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
//   ModuleRegistry.registerModules([ClientSideRowModelModule]);
  
//   var rowIdSequence = 100;

//   function getData() {
//       var data = [];
//       ['Red', 'Green', 'Blue', 'Red', 'Green', 'Blue', 'Red', 'Green', 'Blue'].forEach(function (color) {
//           var newDataItem = {
//               id: rowIdSequence++,
//               color: color,
//               value1: Math.floor(Math.random() * 100),
//               value2: Math.floor(Math.random() * 100),
//           };
//           data.push(newDataItem);
//       });
//       return data;
//   }

//   const AssignRidesPage = () => {
//     const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
//     const [rowData, setRowData] = useState(getData());
//     const [columnDefs, setColumnDefs] = useState([
//       { valueGetter: "'Drag'", dndSource: true },
//       { field: "id" },
//       { field: "color" },
//       { field: "value1" },
//       { field: "value2" },
//     ]);
//     const defaultColDef = useMemo(() => {
//       return {
//         width: 80,
//         filter: true,
//       };
//     }, []);
//     const rowClassRules = useMemo(() => {
//       return {
//         "red-row": 'data.color == "Red"',
//         "green-row": 'data.color == "Green"',
//         "blue-row": 'data.color == "Blue"',
//       };
//     }, []);
  
//     return (
//       <div style={containerStyle}>
//             <div className="outer">
//           <div className="grid-col">
//             <div
//               className="ag-theme-quartz" // applying the grid theme
//                style={{ height: 500 }} // the grid will fill the size of the parent container
//                     >
//               <AgGridReact
//                 rowData={rowData}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 rowClassRules={rowClassRules}
//                 rowDragManaged={true}
//               />
//             </div>
//           </div>
  
//           {/* <div
//             className="drop-col"
//             onDragOver={(event) => onDragOver(event)}
//             onDrop={(event) => onDrop(event)}
//           >
//             <span id="eDropTarget" className="drop-target">
//               {" "}
//               ==&gt; Drop to here{" "}
//             </span>
//             <div id="eJsonDisplay" className="json-display"></div>
//           </div> */}
//         </div>
//       </div>
//     );
//   };

export default AssignRidesPage;