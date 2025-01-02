import { StorageContext } from "../Contexts";
import {React, useContext, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const DriverProfilePageComponent = () => {
    const {
        user,
        isAuthenticated
    } = useAuth0();

    const StorageHandler = useContext(StorageContext); 
    const [curDriver, setDriver] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const [curAccount, setAccount] = useState(null);

    const [inputs, setInputs] = useState({});
    const [component, setComponent] = useState(<div>Edit information as needed</div>);
    const getCheckedFunction = (list) => {
        console.log(list);
    }
    useEffect(() => {
        if (user){
            initializePage();
        }
            
    }, [user])

    const initializePage = async () => {
        const account = await StorageHandler.GetAccount(user.email);
        setAccount(account);
        const driver = await StorageHandler.GetDriverById(account.accountId, true, false);
        setDriver(driver);
        console.log(driver);
        setLoaded(true);   
        // try{
        //     const account = await StorageHandler.GetAccount(user.email);
        //     setAccount(account);
        //     const driver = await StorageHandler.GetDriverById(account.accountId, true, false);
        //     setLoaded(true);      
        // }
        // catch{
        //     return (<h1>Could not retrieve driver, please refresh</h1>)
        // }
    };
    
    if (! isAuthenticated){
        <div>Please login before viewing this page</div>
    }

    if (! isLoaded){
        return (<h1>Loading</h1>)
    }

    if (! curAccount){
        return (
            <div>
                No account found
            </div>
        );
    }

    if (curAccount.accountType !== "driver"){
        return (
            <div>
                This is not a driver account
            </div>
        );
    }
    

    if (!curDriver){
        return (
            <div>
                Error occured, no driver found
            </div>
        );
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // const newPassenger = StorageHandler.CreatePassenger(inputs.passengerName, inputs.location, inputs.address, inputs.friday != null, 
        //                                                     inputs.first != null, inputs.second != null, inputs.third != null, inputs.contact);
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
            // setComponent(<h1>Added {newPassenger.name}</h1>)
        }
        catch{
            setComponent(<h1>Could not retrieve passengers, please refresh</h1>)
        }
      }

    return (
        <div>
            <h1>Driver Info</h1>
        <form onSubmit={handleSubmit}>
            <label>Name: 
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="name"
                value={inputs.name || curDriver.name} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Address: 
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="address"
                value={inputs.address || curDriver.address} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Seats: 
            <input 
                required 
                className="textInputContainer"
                type="text" 
                pattern="[0-9]*"
                name="seats" 
                value={inputs.seats || curDriver.seats} 
                onChange={handleChange}
            />
            </label>
            <br/>

            <label>Contact: 
            <input 
                required 
                className="textInputContainer"
                type="text" 
                name="contact" 
                value={inputs.contact || curDriver.contact} 
                onChange={handleChange}
            />
            </label>
            <br/>
            <input type="submit" />
        </form>
        {component}
        </div>
    )
};

export default DriverProfilePageComponent;