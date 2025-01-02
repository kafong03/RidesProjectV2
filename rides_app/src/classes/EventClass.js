function ConvertSetsInMap(curMap){
    var newMap = new Map();
    for (let [key, value] of curMap) {
        newMap.set(key, [... value]);
    }
    return newMap
}

function ConvertArraysInMap(curMap){
    var newMap = new Map();
    for (let [key, value] of curMap) {
        newMap.set(key, new Set(value));
    }
    return newMap
}

class EventClass{
    static get OTHER () { return 0};
    static get SUNDAY () { return 1};
    static get FRIDAY () { return 2};

    static get EVENT_OPTIONS () { return [{ value: EventClass.OTHER, label: 'Other' },
                                          { value: EventClass.SUNDAY, label: 'Sunday' },
                                          { value: EventClass.FRIDAY, label: 'Friday' },
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
        this.date = new Date(json.date);
        this.type = json.type;
        this.driverToPassenger = ConvertArraysInMap(new Map(Object.entries(json.driverToPassenger)));
    }

    toJSON(){
        console.log(this.date);
        var EventObject = {_id: this._id, eventName: this.eventName, date: this.date.toISOString(), 
                            type: this.type, driverToPassenger: Object.fromEntries(ConvertSetsInMap(this.driverToPassenger))};

        return EventObject;
    }
}

export default EventClass;