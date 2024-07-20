class DriverClass{
    static get UNASSIGNED () { return 0};
    static get ASSIGNED () { return 1};
    static get ASSIGNING () { return 2};

    constructor(id, name, address, friday, sunday1st, sunday2nd, sunday3rd, seats, contact, seatsLeft = new Map(), assigned = new Map(), unavailable = new Set(), note = "", cars = new Map(), labels = []) {
        this._id = id; //Mongo DB Id
        this.name = name; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.seats = seats; //Int
        this.contact = contact; //String
        this.seatsLeft = seatsLeft; //Map<eventId, num seats left
        this.assigned = assigned; //Map<eventId, int> Use the UNASSIGNED/ASSIGNED/ASSIGNING above
        this.unavailable = unavailable; //Set<date>
        this.note = note; //String
        this.cars = cars; //Map<eventId, carId>
        this.labels = labels; //Array of String?
    }
}

export default DriverClass;