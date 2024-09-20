import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AssignRidesPage = () =>{
    const [driverList, setDriverList] = useState(["Driver1", "Driver2"]);
      

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const dataGridRef = useRef(null);
    const testGridRef = useRef(null);
    const [passengerList, setPassengerList] = React.useState([]);
    const [dataGridApi, setDataGridApi] = useState(null);
    const [testGridApi, setTestGridApi] = useState(null);

    var gridApis = [];

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

    const [tempColDefs, setTestColDefs] = useState([
        { field: "name", rowDrag: true  },
        { field: "address" },
        { field: "location" }
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
    };

    useEffect(() => {
        if (dataGridApi) {
            addGridDropZone('data', dataGridApi);
        }
    });

    const onGridReady = (side, params) => {
        if (side === 'test') {
            //setTestGridApi(params.api);
        } else {
            setDataGridApi(params.api);
        }
        var curApi = params.api;
        gridApis = [... gridApis, params.api];

    };

    const onDriverGridReady = (params) => {
        const newApi = params.api;
        // console.log(dataGridApi);
        // dataGridApi.addRowDropZone(newApi);
        // newApi.addRowDropZone(dataGridApi);
        gridApis.forEach(api => {
            console.log(api);
            api.addRowDropZone(newApi.getRowDropZoneParams()); //problem with these
            newApi.addRowDropZone(api.getRowDropZoneParams());
        });
        gridApis = [... gridApis, newApi];
    }

    const createDriverGrid = (driver) => {
        return (<li
    className="ag-theme-quartz" // applying the grid theme
    style={{ height: 500, width: '30% '}} // the grid will fill the size of the parent container
    //Create ref in the .map, pass in to the ag grid. Set the list item id to the driver id. Store the api in a list, will be rendered every time anyway and the driver id will keep track of the necessary stuff. We don't want to pair them bc the positions need to change
    >
        {driver}
    <AgGridReact 
        rowData={testRowData}
        columnDefs={dataColDefs}
        autoSizeStrategy={autoSizeStrategy}
        rowDragManaged={true}
        suppressMoveWhenRowDragging={true}
        getRowId={getRowId}
        onGridReady={(params) => onDriverGridReady(params)}
    />
    </li>)
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
        <ul>
            {driverList.map(driver => {
                return createDriverGrid(driver);
            })}
        </ul>
        
        </div>)
};

export default AssignRidesPage;