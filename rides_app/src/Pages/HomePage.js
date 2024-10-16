import BereanLogoPng from "../Resources/BereanLogo.png"

const HomePage = () => {
    return (
        <div className={'titleContainer'}>
            <img
            id="bereanLogo"
            src={BereanLogoPng}
            alt="Berean"
            />
            College Rides
        </div>    
    );
};

export default HomePage;