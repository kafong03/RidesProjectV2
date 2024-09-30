import React, { useCallback, useRef, useState, useContext, useMemo, useEffect } from 'react';
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

const AssignRidesPage = ({eventMapping}) =>{
    const currentEventMapping = eventMapping;
    const StorageHandler = useContext(StorageContext); 

    // Use memo or ref to prevent rerender, may not be necessary
    var masterDriverList = useMemo(() => StorageHandler.GetDrivers(), [masterDriverList]);

    var assignedPassengers = useMemo(() => new Set(), [assignedPassengers]);

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const dataGridRef = useRef(null);

    var masterPassengerList = useMemo(() => StorageHandler.GetPassengers(), masterPassengerList);
    var dataGridApi = null;

    var gridApis = useMemo(() => [], [gridApis]);

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

    const minColDefs = [
        { field: "name", rowDrag: true, suppressMovable: true,  },
        { field: "address", suppressMovable: true, },
        { field: "location", suppressMovable: true, }
    ];


    function getPassengerTableInfo(passenger){
        return {id: passenger._id,
            name: passenger.name,
            address: passenger.address,
            location: passenger.location,
            friday: passenger.friday ? "yes" : "no",
            first: passenger.sunday1st ? "yes" : "no",
            second: passenger.sunday2nd ? "yes" : "no",
            third: passenger.sunday3rd ? "yes" : "no",
            contact: passenger.contact,
            flagged: passenger.flagged,
            notes: passenger.notes};
    }

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
        const newList = masterPassengerList.filter(passenger => (!assignedPassengers.has(passenger._id)));

        dataGridApi.applyTransaction({
            add: newList.map(passenger => getPassengerTableInfo(passenger)),
            addIndex: 0,
        });
        
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

        const passengerSet = currentEventMapping[driver._id];
        if (passengerSet){
            
            passengerSet.forEach(passengerId => {
                const passenger = masterPassengerList.find(passenger => passengerId === passenger._id);
                passengers.push(getPassengerTableInfo(passenger));
                assignedPassengers.add(passengerId);
            });
        }

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
        columnDefs={minColDefs}
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

    // Handle setting assigned bool and driver updates
    const updateDriverToPassengerMap = () => {
        assignedPassengers.clear();
        currentEventMapping.clear();

        gridApis.forEach(object => {
            const grid = object.second;
            const driver = masterDriverList.find(driver => object.first === driver._id);
            currentEventMapping[driver._id] = new Set();
            grid.forEachNode(passenger => {
                assignedPassengers.add(passenger.id);
                currentEventMapping[driver._id].add(passenger.id);
            });
        });

        dataGridApi.forEachNode(passenger => {
            if (! assignedPassengers.has(passenger.id)){
                assignedPassengers.add(passenger.id);
            }
        });

        console.log(eventMapping);
        // Conforming event mapping to tables, send update to cloud
    }

    return (
    <div className='flexDiv'>
        <div
        className={"ag-theme-quartz" + ' ' + "DataDiv"} // applying the grid theme
        >
        <AgGridReact
            ref={dataGridRef}
            rowData={[]}
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
                    {masterDriverList.map(driver => {
                        return createDriverGrid(driver);
                    })}
                </ul>
        </div>
        <button onClick={updateDriverToPassengerMap}>
            
        </button>
        </div>)
};

export default AssignRidesPage;