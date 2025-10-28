import './Dashmain.css';
import Complaint from './Complaint.jsx';
import Certificate from './Certificates.jsx';
import Cert from './assets/certf.png';
import Convo from './assets/conv.png';
import Residents from './assets/team.png';
import Calendar from './assets/calendar.png';

function Dashmain({ selectedPage, setSelectedPage }){

    return(
        <>
        {selectedPage === "dashboard" && (
        <div className="dashmain-page">
        <div className="dashmain-header-title">
        <h1>Dashboard</h1>
        <h1>October 5, 2025</h1>
        </div>
        <div className="dashmain-cont1">
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Total Complaints</h1>
                <img className="dashmain-icon" src={Convo} alt="Complaint icon"></img>
                </div>
                    <div className="dashmain-desc">
                    <h1><b>3</b></h1>
                    <p>Processing: </p>
                    <p>Resolved: </p>
                    </div>
            </div>
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Total Certificates</h1>
                <img className="dashmain-icon" src={Cert} alt="Certificate icon"></img>
                </div>
                    <div className="dashmain-desc">
                        <h1><b>3</b></h1>
                    <p>Processing: </p>
                    <p>Ready: </p>
                    <p>Claimed: </p>
                    </div>
            </div>
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Number of Residents</h1>
                <img className="dashmain-icon" src={Residents} alt="Resident icon"></img>
                </div>
                <div className="dashmain-residents-container">
                    <h1 className="dashmain-residents">3</h1>
                </div>
                <div className="dashmain-desc">
                <p>Registered</p>
                </div>
            </div>
        </div>
        <div className="dashmain-cont2">
            <div className="dashmain-card2">
                <h1 className="dashmain-title2">Recent Complaints</h1>
                <p className="dashmain-desc2">Latest complaints submitted by residents</p>
                <div className="dashmain-comp">
                    <p><b>Loud Music Disturbance</b></p>
                    <p>Pedro Garcia</p>
                    <div className="dashmain-date">
                        <img className="dashmain-icon" src={Calendar}></img>
                        <p>2024-01-15</p>
                    </div>
                </div>
                <button onClick={() => setSelectedPage("complaints")}>View All Complaints</button>
            </div>
            <div className="dashmain-card2">
                <h1 className="dashmain-title2">Recent Certificates</h1>
                <p className="dashmain-desc2">Latest certificate requests and issuances</p>
                <div className="dashmain-comp">
                    <p><b>Barangay Clearance</b></p>
                    <p>Jose Martinez</p>
                    <div className="dashmain-date">
                        <img className="dashmain-icon" src={Calendar}></img>
                        <p>2024-01-15</p>
                    </div>
                </div>
                <button onClick={() => setSelectedPage("certificates")}>View All Certificates</button>
            </div>
        </div>
        </div>
        )}
        </>
    )
}
export default Dashmain 