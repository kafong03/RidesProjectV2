import NewDriverForm from "../components/NewDriverForm";
import NewPassengerForm from "../components/NewPassengerForm";

const AddNewPeople = () => {
    // const {
    //     isAuthenticated,
    //     user
    // } = useAuth0();
    
    // if (!isAuthenticated) {
    // return  (<h1>Please log in</h1>);
    // }

    const tabs = [
        {aKey: "form", title: "Form Input", content: 
            <>
                <NewDriverForm/>
                <NewPassengerForm/>
            </>
        },
        // {aKey: "csv", title: "CSV Input", content: 
        //     <>
        //         <ManageDrivers/>
        //         <ManagePassengers/>
        //     </>
        // },
    ]

    return (
        <div>
            <NewDriverForm/>
            <NewPassengerForm/> 
        </div>
    );
}

export default AddNewPeople;