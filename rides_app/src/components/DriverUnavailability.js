import { useState } from "react";
import DatePicker from "react-datepicker";

const DriverUnavailability = () => {
    const [startDate, setStartDate] = useState(new Date());

    const AddUnavailability = () => {
        
    }

    const RemoveUnavailabilty = () => {

    }
    
    return(
        <div>
            <label>
                {"Date"}: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </label>
            <button onClick={AddUnavailability}>Add</button>
            <button onClick={RemoveUnavailabilty}>Remove</button>
        </div>
    );
}

export default DriverUnavailability;