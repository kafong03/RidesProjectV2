class CarClass{
    constructor (id, event, driver, passengers){
        this._id = id;
        this.eventId = event;
        this.spotsLeft = driver != null ? (driver.seats - passengers.length) : 0;
        this.driver = driver;
        this.passengers = passengers;
    }
}