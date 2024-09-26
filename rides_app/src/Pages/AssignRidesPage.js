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

var testDriverData1 = new DriverClass(1, "test1", "testAddress1", true, false, true, false, 3, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData2 = new DriverClass(2, "test2", "testAddress2", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData3 = new DriverClass(3, "test3", "testAddress3", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData4 = new DriverClass(4, "test4", "testAddress4", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData5 = new DriverClass(5, "test5", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData6 = new DriverClass(6, "test6", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
var testDriverData7 = new DriverClass(7, "test7", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);

var testPassengerData1 = new PassengerClass(1, "testPassenger1", "testLocation", "testAddress1", true, false, true, false,"contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData2 = new PassengerClass(2, "testPassenger2", "testLocation", "testAddress2", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData3 = new PassengerClass(3, "testPassenger3", "testLocation1", "testAddress3", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);
var testPassengerData4 = new PassengerClass(4, "testPassenger4", "testLocation1", "testAddress4", true, false, true, false, "contact",  new Map(), new Set(), "", new Map(), []);

const dragWholeRow = true;

const AssignRidesPage = () =>{
    const [driverList, setDriverList] = useState([testDriverData1, testDriverData2, testDriverData3, testDriverData4, testDriverData5, testDriverData6, testDriverData7]);
    const unassignedPassengers = new Set();

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
    );

    function getDropZoneParams(targetApi, sendingApi){
        return targetApi.getRowDropZoneParams({
            onDragStop: (params) => {
              const nodes = params.nodes;
                sendingApi.applyTransaction({
                  remove: nodes.map(function (node) {
                    return node.data;
                  }),
                });
            },
          })
    }

    const onGridReady = (params) => {
        dataGridApi = params.api;
    };

    const onDriverGridReady = (params, driverId) => {
        const newApi = params.api;
        // console.log(dataGridApi);
        dataGridApi.addRowDropZone(getDropZoneParams(newApi, dataGridApi));
        newApi.addRowDropZone(getDropZoneParams(dataGridApi, newApi));
        gridApis.forEach(object => {
            const api = object.second;
            api.addRowDropZone(getDropZoneParams(newApi, api)); //problem with these
            newApi.addRowDropZone(getDropZoneParams(api, newApi));
        });
        gridApis = [... gridApis, {first: driverId, second: newApi}];
    }

    const createDriverGrid = (driver) => {
        var passengers = []
        return (

        <li
    className={"ag-theme-quartz" + " "+ "PassengerGrid"} // applying the grid theme
    //Create ref in the .map, pass in to the ag grid. Set the list item id to the driver id. Store the api in a list, will be rendered every time anyway and the driver id will keep track of the necessary stuff. We don't want to pair them bc the positions need to change
    key={driver._id}
    >
    <div>
        {driver.name} : {driver.seats} seats : {driver.address}
    </div>
    <AgGridReact 
        rowData={passengers}
        columnDefs={tempColDefs}
        autoSizeStrategy={autoSizeStrategy}
        rowDragManaged={true}
        rowDragEntireRow={dragWholeRow}
        suppressMoveWhenRowDragging={true}
        getRowId={getRowId}
        onGridReady={(params) => onDriverGridReady(params, driver._id)}
    />
    </li>)
    };

    const getRowId = useCallback((params) => String(params.data.id), []);

    const updateDriverToPassengerMap = () => {
        unassignedPassengers.clear();
        console.log("Unasigned:")
        dataGridApi.forEachNode(passenger => {
            unassignedPassengers.add(passenger.id);
            console.log(passenger.id);

        });

        gridApis.forEach(object => {
            console.log(object.first + ":");
            const grid = object.second;
            grid.forEachNode(passenger => {
                console.log("   " + passenger.id);
            });
        });
    }

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
            rowDragEntireRow={dragWholeRow}
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
        <button onClick={updateDriverToPassengerMap}>
            
        </button>
        </div>)
};

export default AssignRidesPage;