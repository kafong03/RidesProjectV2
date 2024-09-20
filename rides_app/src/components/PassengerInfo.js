const PassengerInfo = ({id, passengerName, location, address, friday, sunday1st, sunday2nd, sunday3rd, contact}) =>{
   return (
    <div className="passengerInfo">
        {id}, {passengerName}, {address}, 
    </div>
   )
};

export default PassengerInfo;