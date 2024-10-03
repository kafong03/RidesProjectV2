class EventClass{
    static get SUNDAY () { return 0};
    static get FRIDAY () { return 1};
    static get OTHER () { return 2};

    constructor(id,  eventName, date, type, driverToPassengerMap = new Map()){
        this._id = id;
        this.eventName = eventName;
        this.date = date;
        this.type = type;
        this.driverToPassenger = driverToPassengerMap; // Map<DriverId, Set<PassengerId>>
    }

    UpdateDriverToPassengerMap(newMapping) {
        this.driverToPassenger.clear();
        //console.log(newMapping);
        newMapping.forEach((driverId, passengerSet) => {
            this.driverToPassenger[driverId] = passengerSet;
        });
    }
}

export default EventClass;