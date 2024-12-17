import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import EventClass from "../classes/EventClass";
import "../CSS/EventInput.css"

const EventInput = ({setEventFun, labelText}) =>{
    const [inputText, setText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(EventClass.EVENT_OPTIONS[0]);
    const SubmitEvent = () =>{
        setEventFun(inputText, startDate, selectedOption);
    }

    const options = EventClass.EVENT_OPTIONS;

    return (
        <div>
            <label>
                {labelText}: <input className={"textInputContainer"} name="myInput" onChange={e => setText(e.target.value)}/>
            </label>
            <label>
                {"Date"}: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </label>
            <label>
                {"Type"}: <Dropdown className="eventDropdown" options={options} onChange={setSelectedOption} value={selectedOption} placeholder="Select an option"/>
            </label>
            <button onClick={SubmitEvent}>Next</button>
        </div>
    );
}

export default EventInput;