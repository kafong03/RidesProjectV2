import DriverClass from "./DriverClass";
import PassengerClass from "./PassengerClass";
import EventClass from "./EventClass";
import { ObjectId } from 'bson';
import AccountClass from "./AccountClass";

class StorageHandler{
    /* 
    Will construct all the variables and establish connection but will
    not fetch the drivers/passengers until necessary
    */
    constructor(){

        // var testDriverData1 = new DriverClass("1", "test1", "testAddress1", true, false, true, false, 3, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData2 = new DriverClass("2", "test2", "testAddress2", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData3 = new DriverClass("3", "test3", "testAddress3", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData4 = new DriverClass("4", "test4", "testAddress4", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData5 = new DriverClass("5", "test5", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData6 = new DriverClass("6", "test6", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        // var testDriverData7 = new DriverClass("7", "test7", "testAddress5", true, false, true, false, 4, "contact", new Map(), new Map(), new Set(), "note", new Map(), []);
        
        // var testPassengerData1 = new PassengerClass("1", "testPassenger1", "testLocation", "testAddress1", true, false, true, false,"contact",  new Map(), new Set(), "", new Map(), []);
        // var testPassengerData2 = new PassengerClass("2", "testPassenger2", "testLocation", "testAddress2", true, true, false, false, "contact",  new Map(), new Set(), "", new Map(), []);
        // var testPassengerData3 = new PassengerClass("3", "testPassenger3", "testLocation1", "testAddress3", true, false, false, true, "contact",  new Map(), new Set(), "", new Map(), []);
        // var testPassengerData4 = new PassengerClass("4", "testPassenger4", "testLocation1", "testAddress4", true, false, false, false, "contact",  new Map(), new Set(), "", new Map(), []);
        
        // var testEventMapping = new Map();
        // testEventMapping.set(testDriverData1._id, new Set([testPassengerData3._id]));
        // testEventMapping.set(testDriverData2._id, new Set([testPassengerData1._id]));
        // var testEvent = new EventClass(1, "testEvent", new Date(), Event.SUNDAY, testEventMapping);

        // this.testDriverList = [testDriverData1, testDriverData2, testDriverData3, testDriverData4, testDriverData5, testDriverData6, testDriverData7];
        // this.testPassengerList = [testPassengerData1, testPassengerData2, testPassengerData3, testPassengerData4];
        // this.testEventList = [testEvent];

        // this.curAccount = new AccountClass("1", "email", "1", "driver");
        // this.curAdmin = new AccountClass("2", "", "-1", "admin");
        //const newAdmin = new AccountClass("1", "conjolee06@gmail.com", "-1", "admin");
        //console.log(JSON.stringify(newAdmin));

        this.curPassengerList = [];
        this.curDriverList = [];
        this.curEventList = [];
        this.curAccount = null;
        this.fetchURL = "http://localhost:3001/"
    };

    async GetPassengers(retrieveNew){
        if (!retrieveNew && this.curPassengerList){
            return this.curPassengerList;
        }

        this.curPassengerList = await fetch(this.fetchURL + "passenger");
        return this.curPassengerList;
    }

    async GetPassengerById(passengerId, retrieveNew){
        if (!retrieveNew && this.curPassengerList){
            return this.curPassengerList.find(passenger => passenger._id === passengerId);
        }

        await this.GetPassengers(false);

        return this.curPassengerList.find(passenger => passenger._id === passengerId);
    }

    async GetDrivers(retrieveNew){
        if (!retrieveNew && this.curDriverList){
            return this.curDriverList;
        }

        this.curDriverList = await fetch(this.fetchURL + "passenger");
        return this.curDriverList;
    }

    async GetDriverById(driverId, isDriverAccount, retrieveNew){
        if (isDriverAccount){
            return await fetch(this.fetchURL + "driver/" + driverId); 
        }
        else if (!retrieveNew && this.curDriverList){
            return this.curDriverList.find(driver => driver._id === driverId);
        }
        
        await this.GetDrivers(false);

        return this.curDriverList.find(driver => driver._id === driverId); 
    }

    async GetEvents(retrieveNew){
        if (!retrieveNew && this.curEventList.length > 0){
            return this.curEventList;
        }

        const eventRequest = await fetch(this.fetchURL + "events");
        const eventJson = (await eventRequest.json());
        this.curEventList = eventJson.map(curEvent => {
            const newEvent = new EventClass();
            newEvent.FromJSON(curEvent);
            return newEvent;
        });
        return this.curEventList;
    }

    async UpdateEvent(updatedEvent){
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
        return await fetch(this.fetchURL + "events/" + updatedEvent._id, {
            method: "PUT",
            body: JSON.stringify(updatedEvent.toJSON())
        });
        // if(! sameMapping){
        // }
    }

    async UpdateDriverToPassengerMap(eventId, newMapping){
        await this.GetEvents()
        const oldEvent = this.curEventList.find(event => event._id === eventId);
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

    async CreateEvent(eventName, eventDate, eventType){
        const id  = new ObjectId();

        var newEvent = new EventClass(id, eventName, eventDate, eventType);
        this.curEventList.push(newEvent);
        fetch(this.fetchURL + "events", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent.toJSON())
        })

        return newEvent;
    }

    async CreateDriver(name, address, sunday1st, sunday2nd, sunday3rd, seats, contact){
        const id  = new ObjectId();

        var newDriver = new DriverClass(id, name, address, sunday1st, sunday2nd, sunday3rd, seats, contact);
        this.curDriverList.push(newDriver);

        fetch(this.fetchURL + "driver", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDriver.toJSON())
        })

        return newDriver;
    }

    async CreatePassenger(name, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact){
        const id  = new ObjectId();

        var newPassenger = new PassengerClass(id, name, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact);
        this.curPassengerList.push(newPassenger);
        console.log(JSON.stringify(newPassenger.toJSON()));
        fetch(this.fetchURL + "passenger", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPassenger.toJSON())
        })

        return newPassenger;
    }

    async GetAccount(email){
        if (!this.curAccount){
            const curAccountInfo = (await fetch(this.fetchURL + "accounts/email", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: email})
            }));
            const curAccount = (await curAccountInfo.json());
            const account = new AccountClass();
            account.FromJSON(curAccount[0]);
            this.curAccount = account;
            return account;
        }
        else{
            return this.curAccount;
        }
    }

    async GetDriverAccount(email){
        if (this.curAccount){
            return this.curAccount;
        }
        else{
            this.curAccount = await this.GetAccount(email);
            return this.curAccount;
        }
    }
}

export default StorageHandler;