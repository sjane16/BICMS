import './Dashmain.css'
import Cert from './assets/certf.png'
import Convo from './assets/conv.png'
import Residents from './assets/team.png'
import Calendar from './assets/calendar.png'
function Dashmain(){
    return(
        <>
        <div className="dashboard-page">
        <div className="header-title">
        <h1>Dashboard</h1>
        <h1>October 5, 2025</h1>
        </div>
        <div className="cont1">
            <div className="card">
                <div className="title">
                <h1>Total Complaints</h1>
                <img className="icon" src={Convo} alt="Complaint icon"></img>
                </div>
                    <div className="desc">
                    <h1><b>3</b></h1>
                    <p>Processing: </p>
                    <p>Resolved: </p>
                    </div>
            </div>
            <div className="card">
                <div className="title">
                <h1>Total Certificates</h1>
                <img className="icon" src={Cert} alt="Certificate icon"></img>
                </div>
                    <div className="desc">
                        <h1><b>3</b></h1>
                    <p>Processing: </p>
                    <p>Ready: </p>
                    <p>Claimed: </p>
                    </div>
            </div>
            <div className="card">
                <div className="title">
                <h1>Number of Residents</h1>
                <img className="icon" src={Residents} alt="Resident icon"></img>
                </div>
                <div className="desc">
                <h1 className="residents">3</h1>
                </div>
            </div>
        </div>
        <div className="cont2">
            <div className="card2">
                <h1>Recent Complaints</h1>
                <p>Latest complaints submitted by residents</p>
                <div className="comp">
                    <p>Loud Music Disturbance</p>
                    <p>Pedro Garcia</p>
                    <div className="date">
                        <img src={Calendar}></img>
                        <p>2024-01-15</p>
                    </div>
                </div>
                <button>View All Complaints</button>
            </div>
            <div className="card2">
                <h1>Recent Certificates</h1>
                <p>Latest certificate requests and issuances</p>
                <div className="comp">
                    <p>Barangay Clearance</p>
                    <p>Jose Martinez</p>
                    <div className="date">
                        <img src={Calendar}></img>
                        <p>2024-01-15</p>
                    </div>
                </div>
                <button>View All Certificates</button>
            </div>
        </div>
        </div>
        </>
    );
}
export default Dashmain 