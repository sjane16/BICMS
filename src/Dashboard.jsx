import {useState} from "react";
import HeaderLog from './HeaderLog.jsx';
import Dashmain from './Dashmain.jsx';
import Complaint from './Complaint.jsx';
import Resident from './Residentpage.jsx';
import Reports from './Report.jsx';
import Certificate from './Certificates.jsx';
import './Dashboard.css';
import Dash from './assets/dashboard_.png';
import Cert from './assets/certificates_.png';
import Convo from './assets/complaints_.png';
import Report from './assets/report_.png';
import Residents from './assets/residents_.png';

function Dashboard(){

    const[selectedPage, setSelectedPage]=useState("dashboard");


    return(
        <>
        <div className="dashboard-container">
        <HeaderLog />
        <div className="dashboard-page">
        <div className="dashboard-Sidebar">
            <div className="dashboard-button">     
            <div className="dashboard-b">
                <button className="dashboard-dbutton" onClick={() => setSelectedPage("dashboard")}>
                    <img className="dashboard-dicon" src={Dash}></img>
                    Dashboard
                </button>
            </div>
            <div className="dashboard-b">
                <button className="dashboard-dbutton" onClick={() => setSelectedPage("certificates")}>
                <img className="dashboard-dicon" src={Cert}></img>
                    Certificates
                </button>
            </div> 
            <div className="dashboard-b">
            <button className="dashboard-dbutton" onClick={() => setSelectedPage("complaints")}>
            <img className="dashboard-dicon" src={Convo}></img>
                Complaints
            </button>
            </div>
            <div className="dashboard-b">
                <button className="dashboard-dbutton" onClick={() => setSelectedPage("residents")}>
                <img className="dashboard-dicon" src={Residents}></img>
                Residents
                </button>
            </div>
            <div className="dashboard-b">
                <button className="dashboard-dbutton" onClick={() => setSelectedPage("reports")}>
                <img className="dashboard-dicon" src={Report}></img>
                Reports
                </button>
            </div>
            </div>
        </div>
        <div className="dashboard-maincontent">
            {selectedPage === "dashboard" && (<Dashmain selectedPage={selectedPage} setSelectedPage={setSelectedPage} />)}
            {selectedPage === "certificates" && <Certificate />}
            {selectedPage === "complaints" && <Complaint />}
            {selectedPage === "residents" && <Resident />}
            {selectedPage === "reports" && <Reports />}

            </div>
        </div>
        </div>
        </>
    )
}

export default Dashboard;