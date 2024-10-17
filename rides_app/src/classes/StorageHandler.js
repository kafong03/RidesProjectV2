import DriverClass from "./DriverClass";
import PassengerClass from "./PassengerClass";
import EventClass from "./EventClass";

class StorageHandler{
    /* 
    Will construct all the variables and establish connection but will
    not fetch the drivers/passengers until necessary
    */
    constructor(){

        var testDriverData1 = new DriverClass("1", "test1", "testAddress1", true, false, true, false, 3, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData2 = new DriverClass("2", "test2", "testAddress2", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData3 = new DriverClass("3", "test3", "testAddress3", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData4 = new DriverClass("4", "test4", "testAddress4", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData5 = new DriverClass("5", "test5", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData6 = new DriverClass("6", "test6", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        var testDriverData7 = new DriverClass("7", "test7", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        
        var testPassengerData1 = new PassengerClass("1", "testPassenger1", "testLocation", "testAddress1", true, false, true, false,"contact",  new Map(), new Set(), "", new Map(), []);
        var testPassengerData2 = new PassengerClass("2", "testPassenger2", "testLocation", "testAddress2", true, true, false, false, "contact",  new Map(), new Set(), "", new Map(), []);
        var testPassengerData3 = new PassengerClass("3", "testPassenger3", "testLocation1", "testAddress3", true, false, false, true, "contact",  new Map(), new Set(), "", new Map(), []);
        var testPassengerData4 = new PassengerClass("4", "testPassenger4", "testLocation1", "testAddress4", true, false, false, false, "contact",  new Map(), new Set(), "", new Map(), []);
        
        var testEventMapping = new Map();
        testEventMapping.set(testDriverData1._id, new Set([testPassengerData3._id]));
        testEventMapping.set(testDriverData2._id, new Set([testPassengerData1._id]));
        var testEvent = new EventClass(1, "testEvent", new Date(), Event.SUNDAY, testEventMapping);

        this.testDriverList = [testDriverData1, testDriverData2, testDriverData3, testDriverData4, testDriverData5, testDriverData6, testDriverData7];
        this.testPassengerList = [testPassengerData1, testPassengerData2, testPassengerData3, testPassengerData4];
        this.testEventList = [testEvent];
    };

    GetPassengers(){
        return this.testPassengerList;
    }

    GetDrivers(){
        return this.testDriverList;
    }

    GetEvents(){
        return this.testEventList;
    }

    UpdateEvent(updatedEvent){
        // const oldEvent = this.testEventList.find(event => event._id === updatedEvent._id)
        // var sameMapping = true;
        // if (oldEvent && oldEvent.eventName === updatedEvent.eventName &&
        //     oldEvent.date === updatedEvent.date &&
        //     oldEvent.type === updatedEvent.type
        // ){
        //     updatedEvent.driverToPassenger.forEach((driverId, passengerSet) => {
        //         const oldPassengerSet = oldEvent.driverToPassenger[driverId];
        //         if (oldPassengerSet && oldPassengerSet.size === passengerSet.size){
        //             passengerSet.forEach(passengerId => {
        //                 if (! oldPassengerSet.has(passengerId)){
        //                     sameMapping = false;
        //                 }
        //             });
        //         }
        //         else{
        //             sameMapping = false;
        //         }
        //     });
        // }
        // else{
        //     sameMapping = false;
        // }

        console.log(updatedEvent);
        // if(! sameMapping){
        // }
    }

    UpdateDriverToPassengerMap(eventId, newMapping){
        const oldEvent = this.testEventList.find(event => event._id === eventId);
        // console.log(oldEvent.driverToPassenger)
        // console.log(newMapping)
        var sameMapping = true;
        if (oldEvent && oldEvent.driverToPassenger.size === newMapping.size){
            
            newMapping.forEach((passengerSet, driverId) => {
                const oldPassengerSet = oldEvent.driverToPassenger.get(driverId);
                
                // console.log(oldPassengerSet);
                // console.log(passengerSet);
                if (oldPassengerSet && oldPassengerSet.size === passengerSet.size){
                    passengerSet.forEach(passengerId => {
                        if (! oldPassengerSet.has(passengerId)){
                            sameMapping = false;
                        }
                    });
                }
                else{
                    sameMapping = false;
                }
            });
        }
        else{
            sameMapping = false;
        }

        if(! sameMapping){
            oldEvent.UpdateDriverToPassengerMap(newMapping);
            this.UpdateEvent(oldEvent);
        }
    }
}

export default StorageHandler;