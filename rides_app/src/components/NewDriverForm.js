import { useState, useContext } from "react";
import { StorageContext } from "../Contexts";
import DriverClass from "../classes/DriverClass";

const NewDriverForm = (getInfoFun) => {
    const [inputs, setInputs] = useState({seats: "0"});
    const [component, setComponent] = useState(<div>Enter a driver</div>)
    const StorageHandler = useContext(StorageContext); 
    
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
        const newDriver = StorageHandler.CreateDriver(inputs.driverName, inputs.address, inputs.friday != null, 
                                                        inputs.first != null, inputs.second != null, inputs.third != null, parseInt(inputs.seats), inputs.contact);
        // var newDriver = new DriverClass(StorageHandler.NextDriverId(), inputs.driverName, inputs.address, inputs.friday != null,
        //     inputs.first != null, inputs.second != null, inputs.third != null,  parseInt(inputs.seats), new Map(), new Set(), inputs.contact, [], new Map());
        // StorageHandler.AddDriver(newDriver);

        try{
            // StorageHandler.GetDrivers()
            //     .then(response => response.json())
            //     .then(json => {
            //         var mapped = [];
            //         json.forEach(dataPoint => {
            //             var newDriver = new DriverClass();
            //             newDriver.FromJSON(dataPoint);
            //             mapped.push(newDriver);
            //         });
            //         // setList(mapped);
            //     });
            setComponent(<h1>Added {newDriver.name}</h1>)
        }
        catch{
            setComponent(<h1>Could not retrieve drivers, please refresh</h1>)
        }
      }

      //id, driverName, address, friday, sunday1st, sunday2nd, sunday3rd, seats, assigned, unavailable, contact, labels, cars
    return (
        <div>
            <h1>New Driver</h1>
        <form onSubmit={handleSubmit}>
            <label>Enter the driver's name:
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="driverName" 
                value={inputs.driverName || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Enter the driver's address:
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

            <label>Enter the driver's contact info:
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

            <label>How many seats?
            <input 
                required 
                className='textInputContainer'
                type="text" 
                pattern="[0-9]*"
                name="seats" 
                value={inputs.seats} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Drives for friday?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="friday" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Drives for first service?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="first" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Drives for second service?
            <input 
                className='inlineItem'
                type="checkbox" 
                name="second" 
                value="yes"
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Drives for third service?
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

export default NewDriverForm;