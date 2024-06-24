class DriverClass{
    static get UNASSIGNED () { return 0};
    static get ASSIGNED () { return 1};
    static get ASSIGNING () { return 2};

    constructor(id, name, address, friday, sunday1st, sunday2nd, sunday3rd, seats, contact){
        this._id = id; //Mongo DB Id
        this.name = name; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.seats = seats; //Int
        this.seatsLeft = new Map(); //Map<eventId, num seats left
        this.assigned = new Map(); //Map<eventId, int> Use the UNASSIGNED/ASSIGNED/ASSIGNING above
        this.unavailable = new Set(); //Set<date>
        this.contact = contact; //String
        this.note = ""; //String
        this.labels = []; //Array of String?
        this.cars = new Map(); //Map<eventId, carId>
    }
}

export default DriverClass;