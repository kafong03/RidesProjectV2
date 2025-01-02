import React, { useCallback, useRef, useState, useContext, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import PassengerClass from '../classes/PassengerClass';
import DriverClass from '../classes/DriverClass';
import { StorageContext } from '../Contexts';
import { useAuth0 } from '@auth0/auth0-react';
import "../CSS/AssignPage.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useNavigate } from 'react-router-dom';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

class FullWidthCellRenderer{
    eGui;

    init(params) {
        const eTemp = document.createElement('div');
        eTemp.innerHTML = this.getTemplate(params);
        this.eGui = eTemp.firstElementChild ;
    }

    getTemplate(params){
        const data = params.node.data;
        // const service = data.first ? "First Service" : (data.second ? "Second Service" : "ThirdService")
        // console.log(data);

        var service;
        if (data.first === "yes"){
            service = "First Service";
        }
        else if (data.second === "yes"){
            service = "Second Service";
        }
        else if (data.third === "yes"){
            service = "Third Service";
        }
        else{
            service = "No Sunday ride"
        }

        const template = 
        `
        <div class="FullWidthRow">
        <div>${data.name}</div>
        <ul>
            <li> ${data.address} </li>
            <li> ${data.location} </li>
        </ul>
        <div>
            ${service}
        </div>
        </div>
        `

        return template;
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
}

const dragWholeRow = true;

const AssignRidesPageComponent = ({curEvent}) =>{
    const currentEvent = curEvent;
    const navigate = useNavigate();

    const currentEventMapping = useRef(new Map(curEvent.driverToPassenger)); //Make sure to use ref

    const StorageHandler = useContext(StorageContext); 

    // Use memo or ref to prevent rerender, may not be necessary
    const [masterDriverList, setMasterDriverList] = useState(null);

    var assignedPassengers = useMemo(() => new Set(), [assignedPassengers]);

    const autoSizeStrategy = {
        type: 'fitCellContents'
    };
    const dataGridRef = useRef(null);

    const [masterPassengerList, setMasterPassengerList] = useState([]);
    const [passengerList, setPassengerList] = useState(null);

    var dataGridApi = useRef(null);

    var gridApis = useRef([]);

    const [driverGrids, setDriverGrids] = useState([]);

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
                if (targetApi === dataGridApi.current){
                    sendingApi.applyTransaction({
                        remove: nodes.map(function (node) {
                          return node.data;
                        }),
                      });
                }
                else{
                    const targetGridPair = gridApis.current.find(gridPair => gridPair.second === targetApi)
                    const driverId = targetGridPair.first
                    const driver = masterDriverList.find(driver => driver._id === driverId)
                    if (targetApi.getDisplayedRowCount() <= driver.seats){
                        sendingApi.applyTransaction({
                          remove: nodes.map(function (node) {
                            return node.data;
                          }),
                        });
                    }
                    else {
                        targetApi.applyTransaction({
                            remove: nodes.map(function (node) {
                              return node.data;
                            }),
                          });
                    }
                }
            },
          })
    }

    const onGridReady = (params) => {
        dataGridApi.current = params.api;
        
        setDriverGrids([... masterDriverList.map(driver => {
            return createDriverGrid(driver);
        })]);
        
        const newPassengerList = masterPassengerList.filter(passenger => !assignedPassengers.has(passenger._id))
        setPassengerList(newPassengerList.map(passenger => getPassengerTableInfo(passenger)));
    };

    const onDriverGridReady = (params, driverId) => {
        const newApi = params.api;
        dataGridApi.current.addRowDropZone(getDropZoneParams(newApi, dataGridApi.current));
        newApi.addRowDropZone(getDropZoneParams(dataGridApi.current, newApi));
        gridApis.current.forEach(object => {
            const api = object.second;
            api.addRowDropZone(getDropZoneParams(newApi, api)); //problem with these
            newApi.addRowDropZone(getDropZoneParams(api, newApi));
        });
        gridApis.current = [... gridApis.current, {first: driverId, second: newApi}];
    }

    const createDriverGrid = (driver) => {
        var passengers = []

        const passengerSet = currentEventMapping.current.get(driver._id);
        if (passengerSet){
            passengerSet.forEach(passengerId => {
                const passenger = masterPassengerList.find(passenger => passengerId == passenger._id);
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
    <div className='DriverHeader'>
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
        
        gridApis.current.forEach(object => {
            const grid = object.second;
            const driverId = object.first;
            if (grid.getDisplayedRowCount() > 0){
                currentEventMapping.current.set(driverId, new Set());
                grid.forEachNode(passenger => {
                    assignedPassengers.add(passenger.id);
                    currentEventMapping.current.get(driverId).add(passenger.id);
                });
            }
            else if (currentEventMapping.current.has(driverId)){
                currentEventMapping.current.delete(driverId);
            }
        });
        dataGridApi.current.forEachNode(passenger => {
            if (! assignedPassengers.has(passenger.id)){
                assignedPassengers.add(passenger.id);
            }
        });

        StorageHandler.UpdateDriverToPassengerMap(currentEvent._id, currentEventMapping.current);
        // StorageHandler.UpdateEvent(currentEvent);
        // Conforming event mapping to tables, send update to cloud
    }

    const filterDrivers = () => {
        StorageHandler.UpdateDriverToPassengerMap(currentEvent._id, currentEventMapping.current);
        gridApis.current = [];

        setDriverGrids([... masterDriverList.sort(driver => 4-driver._id).map(driver => {
            return createDriverGrid(driver);
        })]);
    }

    const {
        user,
        isAuthenticated
    } = useAuth0();

    useEffect(() => {
        if (user){
            initializePage();
        }

        window.onbeforeunload = function() {
            navigate("/admin")
            return true;
        };
    
        return () => {
            window.onbeforeunload = null;
        };
            
    }, [user])

    const initializePage = async () => {
        try{
            const account = await StorageHandler.GetAccount(user.email);
            setAccount(account);
            const drivers = await StorageHandler.GetDrivers();
            const passengers = await StorageHandler.GetPassengers();
            setMasterDriverList(drivers);
            setMasterPassengerList(passengers);
            setLoaded(true);      
        }
        catch{
            console.log("Could not retrieve, please refresh")
        }
    };
    const [curAccount, setAccount] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    if (! isAuthenticated){
        <div>Please login before viewing this page</div>
    }

    if (!user){
        return (
            <div>
                Error, no user found
            </div>
        )
    }

    if (!isLoaded){
        return(<h1>Loading</h1>)
    }

    if (! curAccount){
        return (
            <div>
                Error, no account found
            </div>
        );
    }

    if (curAccount.accountType !== "admin"){
        return (
            <div>
                This is not an admin account
            </div>
        );
    }

    if (!currentEvent){
        navigate("/admin")
    }

    return (
        <div>
            <div className='flexDiv'>
                <div
                    className={"ag-theme-quartz" + ' ' + "DataDiv"} // applying the grid theme
                >
                    <AgGridReact
                        ref={dataGridRef}
                        rowData={passengerList}
                        columnDefs={dataColDefs}
                        autoSizeStrategy={autoSizeStrategy}
                        rowDragManaged={true}
                        rowDragEntireRow={dragWholeRow}
                        suppressMoveWhenRowDragging={true}
                        getRowId={getRowId}
                        onGridReady={(params) => onGridReady(params)}
                        fullWidthCellRenderer={FullWidthCellRenderer}
                        isFullWidthRow ={ () => { return true; }}
                        rowHeight = {60}
                    />
                </div>
                <div className="AssignDiv">
                    <ul className='AssignListItem'>
                        {driverGrids}
                    </ul>
                </div>
            </div>
            <div>
                <button onClick={updateDriverToPassengerMap}>
                    save
                </button>

                <button onClick={filterDrivers}>
                    filter
                </button>
            </div>
        </div>)
};

export default AssignRidesPageComponent;