import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import PassengerClass from '../classes/PassengerClass';
import DriverClass from '../classes/DriverClass';
import "../CSS/AssignPage.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

ModuleRegistry.registerModules([ClientSideRowModelModule]);

var testDriverData1 = new DriverClass(2, "test1", "testAddress1", true, false, true, false, 3, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData2 = new DriverClass(1, "test", "testAddress", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);

var testPassengerData1 = new PassengerClass(1, "testPassenger", "testLocation", "testAddress", true, false, true, false,"contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData2 = new PassengerClass(2, "testPassenger1", "testLocation", "testAddress1", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData3 = new PassengerClass(3, "testPassenger2", "testLocation1", "testAddress2", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData4 = new PassengerClass(4, "testPassenger3", "testLocation1", "testAddress2", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);

const AssignRidesPage = () =>{
    const [driverList, setDriverList] = useState([testDriverData1, testDriverData2]);
      

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const dataGridRef = useRef(null);
    const [passengerList, setPassengerList] = React.useState([testPassengerData1, testPassengerData2, testPassengerData3, testPassengerData4]);
    var dataGridApi = null;

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
        passengerList.map(passenger => ({
            id: passenger._id,
            name: passenger.name,
            address: passenger.address,
            location: passenger.location,
            friday: passenger.friday ? "yes" : "no",
            first: passenger.sunday1st ? "yes" : "no",
            second: passenger.sunday2nd ? "yes" : "no",
            third: passenger.sunday3rd ? "yes" : "no",
            contact: passenger.contact,
            flagged: passenger.flagged,
            notes: passenger.notes
        }))

 
        // [       {
        //     id: "test",
        //     name: "test name",
        //     address: "test address",
        //     location: "passenger.location",
        //     friday: "no",
        //     first: "yes",
        //     second: "no",
        //     third: "no",
        //     contact: "passenger.contact",
        //     flagged: "passenger.flagged",
        //     notes: "passenger.notes"
        // }]
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

    const onGridReady = (params) => {
        dataGridApi = params.api;
    };

    const onDriverGridReady = (params) => {
        const newApi = params.api;
        // console.log(dataGridApi);
        dataGridApi.addRowDropZone(newApi.getRowDropZoneParams());
        newApi.addRowDropZone(dataGridApi.getRowDropZoneParams());
        gridApis.forEach(api => {
            console.log(api);
            api.addRowDropZone(newApi.getRowDropZoneParams()); //problem with these
            newApi.addRowDropZone(api.getRowDropZoneParams());
        });
        gridApis = [... gridApis, newApi];
    }

    const createDriverGrid = (driver) => {
        return (<li
    className={"ag-theme-quartz" + " "+ "PassengerGrid"} // applying the grid theme
    //Create ref in the .map, pass in to the ag grid. Set the list item id to the driver id. Store the api in a list, will be rendered every time anyway and the driver id will keep track of the necessary stuff. We don't want to pair them bc the positions need to change
    key={driver._id}
    >
        {driver.name}
    <AgGridReact 
        rowData={[]}
        columnDefs={tempColDefs}
        autoSizeStrategy={autoSizeStrategy}
        rowDragManaged={true}
        suppressMoveWhenRowDragging={true}
        getRowId={getRowId}
        onGridReady={(params) => onDriverGridReady(params)}
    />
    </li>)
    };

    const getRowId = useCallback((params) => String(params.data.id), []);

    return (
    <div className='flexDiv'>
        <div
        className={"ag-theme-quartz" + ' ' + "DataDiv"} // applying the grid theme
        >
        <AgGridReact
            ref={dataGridRef}
            rowData={dataRowData}
            columnDefs={dataColDefs}
            autoSizeStrategy={autoSizeStrategy}
            rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
            getRowId={getRowId}
            onGridReady={(params) => onGridReady(params)}
        />
        </div>
        <div className="AssignDiv">
                <ul className='AssignListItem'>
                    {driverList.map(driver => {
                        return createDriverGrid(driver);
                    })}
                </ul>
        </div>
        
        </div>)
};

export default AssignRidesPage;