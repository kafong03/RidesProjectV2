class DriverClass{
    static get UNASSIGNED () { return 0};
    static get ASSIGNED () { return 1};
    static get ASSIGNING () { return 2};

    constructor(id, name, address, friday, sunday1st, sunday2nd, sunday3rd, seats, contact, unavailable = new Set(), note = "", labels = []) {
        this._id = id; //Mongo DB Id
        this.name = name; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.seats = seats; //Int
        this.contact = contact; //String
        this.unavailable = unavailable; //Set<date>
        this.note = note; //String
        this.labels = labels; //Array of String?
    }
    
    FromJSON(json){
        this._id = json._id;
        this.name = json.name;
        this.address = json.address;
        this.friday = json.friday;
        this.sunday1st = json.sunday1st;
        this.sunday2nd = json.sunday2nd;
        this.sunday3rd = json.sunday3rd;
        this.seats = json.seats;
        this.unavailable = new Set(Array.from(Object.entries(json.unavailable)).map(curDate => new Date(curDate))); 
        this.contact = json.contact;
        this.note = json.note;
        this.labels = json.labels;
    }

    toJSON(){
        var DriverObject = {_id: this._id, name: this.name, 
                            address: this.address, friday: this.friday, 
                            sunday1st: this.sunday1st, sunday2nd: this.sunday2nd, 
                            sunday3rd: this.sunday3rd, seats: this.seats, 
                            unavailable: [... this.unavailable].map(date => date.toIsoString()), //Convert dates to string
                            contact: this.contact, note: this.note, labels: this.labels
                        };

        return DriverObject;
    }
}

export default DriverClass;