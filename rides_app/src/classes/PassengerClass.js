class PassengerClass{
    constructor(id, passengerName, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact, assigned = new Map(), flagged = new Set(), notes = "", cars = new Map(), labels = []){
        this._id = id; //MongoDB Id
        this.name = passengerName; //String
        this.location = location; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.contact = contact; //String
        this.assigned = assigned; //Map<eventId, boolean>
        this.flagged = flagged; //Set<eventId>
        this.notes = notes; //String
        this.cars = cars; //Map<eventId, carId>
        this.labels = labels; //Array of string
    }
}

export default PassengerClass;