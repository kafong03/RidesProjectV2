class PassengerClass{
    constructor(id, passengerName, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact){
        this._id = id; //MongoDB Id
        this.name = passengerName; //String
        this.location = location; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.assigned = new Map(); //Map<eventId, boolean>
        this.flagged = new Set(); //Set<eventId>
        this.contact = contact; //String
        this.labels = []; //Array of string
        this.notes = ""; //String
        this.cars = new Map(); //Map<eventId, carId>
    }
}

export default PassengerClass;