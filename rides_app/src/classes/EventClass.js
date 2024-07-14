class EventClass{
    static get SUNDAY1ST () { return 0};
    static get SUNDAY2ND () { return 1};
    static get SUNDAY3RD () { return 2};
    static get FRIDAY () { return 3};
    static get OTHER () { return 4};

    constructor(id,  eventName, date, type){
        this._id = id;
        this.eventName = eventName;
        this.date = date;
        this.type = type;
    }
}

export default EventClass;