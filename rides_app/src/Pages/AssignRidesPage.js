import React, { useCallback, useRef, useState, useContext, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import PassengerClass from '../classes/PassengerClass';
import DriverClass from '../classes/DriverClass';
import { StorageContext } from '../Contexts';
import "../CSS/AssignPage.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const dragWholeRow = true;

const AssignRidesPage = () =>{
    const StorageHandler = useContext(StorageContext);

    const [driverList, setDriverList] = useState(StorageHandler.GetDrivers());
    const unassignedPassengers = new Set();

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const dataGridRef = useRef(null);
    const [passengerList, setPassengerList] = React.useState(StorageHandler.GetPassengers());
    var dataGridApi = null;

    var gridApis = [];

    const [dataColDefs, setDataColDefs] = useState([
        { field: "name", rowDrag: true, suppressMovable: true, },
        { field: "address", suppressMovable: true, },
        { field: "location", suppressMovable: true, },
        { field: "friday", suppressMovable: true, },
        { field: "first", suppressMovable: true, },
        { field: "second", suppressMovable: true, },
        { field: "third", suppressMovable: true, },
        { field: "contact", suppressMovable: true, },
        { field: "flagged", suppressMovable: true, },
        { field: "notes", suppressMovable: true, },
    ]);

    const [tempColDefs, setTestColDefs] = useState([
        { field: "name", rowDrag: true, suppressMovable: true,  },
        { field: "address", suppressMovable: true, },
        { field: "location", suppressMovable: true, }
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