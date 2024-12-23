import PassengerClass from "../classes/PassengerClass";
import { useState, useContext } from "react";
import { StorageContext } from "../Contexts";

const NewPassengerForm = (getInfoFun) => {
    const [inputs, setInputs] = useState({});
    const StorageHandler = useContext(StorageContext); 
    const [component, setComponent] = useState(<div>Enter a passenger</div>);
    const getCheckedFunction = (list) => {
        console.log(list);
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPassenger = StorageHandler.CreatePassenger(inputs.passengerName, inputs.location, inputs.address, inputs.friday != null, 
                                                            inputs.first != null, inputs.second != null, inputs.third != null, inputs.contact);
        // var newPassenger = new PassengerClass(StorageHandler.NextPassengerId(), inputs.passengerName, inputs.address, inputs.location, inputs.friday != null,
        //     inputs.first != null, inputs.second != null, inputs.third != null,  new Map(), false, inputs.contact, []);
        // StorageHandler.AddPassenger(newPassenger);

        try{
            // StorageHandler.GetPassengers()
            //     .then(response => response.json())
            //     .then(json => {
            //         var mapped = [];
            //         json.forEach(dataPoint => {
            //             var newpassenger = new PassengerClass();
            //             newpassenger.FromJSON(dataPoint);
            //             mapped.push(newpassenger);
            //         });
            //         // setList(mapped);
            //     });
            setComponent(<h1>Added {newPassenger.name}</h1>)
        }
        catch{
            setComponent(<h1>Could not retrieve passengers, please refresh</h1>)
        }
      }
    

    return (
        <div>
            <h1>New Passenger</h1>
        <form onSubmit={handleSubmit}>
            <label>Enter the passenger's name:
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="passengerName" 
                value={inputs.passengerName || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Enter the passenger's address:
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="address" 
                value={inputs.address || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Enter the passenger's general location if any:
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="location" 
                value={inputs.location || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Enter the passenger's contact info:
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="contact" 
                value={inputs.contact || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Needs a ride for friday?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="friday" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Needs a ride for first service?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="first" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Needs a ride for second service?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="second" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Needs a ride for third service?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="third" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <input type="submit" />
        </form>
        {component}
        </div>
    )
}

export default NewPassengerForm;