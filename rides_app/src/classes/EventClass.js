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

    FromJSON(json) {
        this._id = json._id;
        this.eventName = json.eventName;
        this.date = json.date;
        this.type = json.type;
        this.driverToPassenger = new Map(Object.entries(json.driverToPassenger));
    }

    toJSON(){
        var EventObject = {_id: this._id, eventName: this.eventName, date: this.date, 
                            type: this.type, driverToPassenger: Object.fromEntries(this.driverToPassenger)};

        return EventObject;
    }
}

export default EventClass;