class EventClass{
    static get OTHER () { return 0};
    static get SUNDAY () { return 1};
    static get FRIDAY () { return 2};

    static get EVENT_OPTIONS () { return [{ value: 0, label: 'Other' },
                                          { value: 1, label: 'Sunday' },
                                          { value: 2, label: 'Friday' },
                                ]};

    constructor(id,  eventName, date, type, driverToPassengerMap = new Map()){
        this._id = id;
        this.eventName = eventName;
        this.date = date;
        this.type = type;
        this.driverToPassenger = driverToPassengerMap; // Map<DriverId, Set<PassengerId>>
    }

    UpdateDriverToPassengerMap(newMapping) {
        // this.driverToPassenger.clear();
        // //console.log(newMapping);
        // newMapping.forEach((driverId, passengerSet) => {
        //     this.driverToPassenger[driverId] = passengerSet;
        // });
        this.driverToPassenger = new Map(newMapping);
    }
}

export default EventClass;