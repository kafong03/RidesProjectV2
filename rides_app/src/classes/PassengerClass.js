class PassengerClass{
    constructor(id, passengerName, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact, flagged = new Set(), notes = "", labels = []){
        this._id = id; //MongoDB Id
        this.name = passengerName; //String
        this.location = location; //String
        this.address = address; //String
        this.friday = friday; //Boolean
        this.sunday1st = sunday1st; //Boolean
        this.sunday2nd = sunday2nd; //Boolean
        this.sunday3rd = sunday3rd; //Boolean
        this.contact = contact; //String
        this.flagged = flagged; //Set<eventId>
        this.notes = notes; //String
        this.labels = labels; //Array of string
    }
    
    
    FromJSON(json){
        this._id = json._id;
        this.name = json.name;
        this.location = json.location
        this.address = json.address;
        this.friday = json.friday;
        this.sunday1st = json.sunday1st;
        this.sunday2nd = json.sunday2nd;
        this.sunday3rd = json.sunday3rd;
        this.contact = json.contact;
        this.flagged = new Set(json.flagged);
        this.notes = json.notes;
        this.labels = json.labels;
    }

    toJSON(){
        var PassengerObject = {_id: this._id, name: this.name, location: this.location,
                            address: this.address, friday: this.friday, 
                            sunday1st: this.sunday1st, sunday2nd: this.sunday2nd, 
                            sunday3rd: this.sunday3rd, seats: this.seats, 
                            flagged: Array.from(this.flagged), 
                            contact: this.contact, notes: this.notes, labels: this.labels
                        };

        return PassengerObject;
    }
}

export default PassengerClass;