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
    const dataGridRef = useRef(null);
    const testGridRef = useRef(null);
    const [passengerList, setPassengerList] = React.useState([]);
    const [dataGridApi, setDataGridApi] = useState(null);
    const [testGridApi, setTestGridApi] = useState(null);

    const [dataColDefs, setDataColDefs] = useState([
        { field: "name", rowDrag: true  },
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


    const [dataRowData, setDataRowData] = useState(
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

    const [testRowData, setTestRowData] = useState([{
        id: "test2",
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
    }]);

    const addGridDropZone = (gridPos, api) => {
        var dropApi = null;
        if (gridPos === 'data'){
            dropApi = testGridApi;
        }
        else{
            dropApi = dataGridApi;
        }
        const dropZone = dropApi.getRowDropZoneParams({
        });
        
        api.addRowDropZone(dropZone);
    };

    useEffect(() => {
        if (dataGridApi && testGridApi) {
            addGridDropZone('data', dataGridApi);
            addGridDropZone('test', testGridApi);
        }
    });

    const onGridReady = (side, params) => {
        if (side === 'test') {
            setTestGridApi(params.api);
        } else {
            setDataGridApi(params.api);
        }
    };

    const getRowId = useCallback((params) => String(params.data.id), []);

    return (<div>
        <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500, width: '30%' }} // the grid will fill the size of the parent container
        >
        <AgGridReact
            ref={dataGridRef}
            rowData={dataRowData}
            columnDefs={dataColDefs}
            autoSizeStrategy={autoSizeStrategy}
            rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
            getRowId={getRowId}
            onGridReady={(params) => onGridReady('data', params)}
        />
        </div>

        <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500, width: '30% '}} // the grid will fill the size of the parent container
        >
        <AgGridReact
            ref={testGridRef}
            rowData={testRowData}
            columnDefs={dataColDefs}
            autoSizeStrategy={autoSizeStrategy}
            rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
            getRowId={getRowId}
            onGridReady={(params) => onGridReady('test', params)}
        />
        </div>
        </div>)
};

export default AssignRidesPage;