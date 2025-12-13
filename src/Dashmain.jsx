import './Dashmain.css';
import Complaint from './Complaint.jsx';
import Certificate from './Certificates.jsx';
import Cert from './assets/certificates_.png';
import Convo from './assets/complaints_.png';
import Residents from './assets/residents_.png';
import Calendar from './assets/calendar.png';
import {useState, useEffect} from "react";

function Dashmain({ selectedPage, setSelectedPage }){
 const [complaints, setComplaints] = useState([]);
 const [certificates, setCertificates] = useState([]);
 const [stats, setStats] = useState({
    complaints: {},
    certificates: {},
    residents: {}
 })

 useEffect(() => {
    fetch("http://localhost/bicms_backend/reflectcomplaintadmin.php", {
        method: "POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => setComplaints(data))
    .catch(err => console.error("Fetch error:", err))
 }, [])

 useEffect(() => {
    fetch("http://localhost/bicms_backend/reflectcertadmin.php", {
        method: "POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => setCertificates(data))
    .catch(err => console.error("Fetch error:", err))
 }, [])

 useEffect(() =>{
    fetch("http://localhost/bicms_backend/dashboardstats.php",{
        method: "POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error("Fetch error:", err))
 }, [])


    return(
        <>
        {selectedPage === "dashboard" && (
        <div className="dashmain-page">
        <div className="dashmain-header-title">
        <h1>Dashboard</h1>
        </div>
        <div className="dashmain-cont1">
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Total Complaints</h1>
                <img className="dashmain-icon" src={Convo} alt="Complaint icon"></img>
                </div>
                    <div className="dashmain-desc">
                    <h1><b>{stats.complaints.total}</b></h1>
                    <p>Processing: {stats.complaints.processing} </p>
                    <p>Resolved: {stats.complaints.resolved} </p>
                    </div>
            </div>
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Total Certificates</h1>
                <img className="dashmain-icon" src={Cert} alt="Certificate icon"></img>
                </div>
                    <div className="dashmain-desc">
                        <h1><b>{stats.certificates.total}</b></h1>
                    <p>Processing: {stats.certificates.processing} </p>
                    <p>Ready: {stats.certificates.ready}</p>
                    <p>Claimed: {stats.certificates.claimed}</p>
                    </div>
            </div>
            <div className="dashmain-card">
                <div className="dashmain-title">
                <h1>Number of Residents</h1>
                <img className="dashmain-icon" src={Residents} alt="Resident icon"></img>
                </div>
                <div className="dashmain-residents-container">
                    <h1 className="dashmain-residents">{stats.residents.total}</h1>
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

                {complaints.slice(0,3).map((complaint, index) =>{
                return(
                <div className="dashmain-comp">
                    <p><b>{complaint.subject}</b></p>
                    <p>{complaint.fullname}</p>
                    <div className="dashmain-date">
                        <img className="dashmain-icon" src={Calendar}></img>
                        <p className = "p-date">{complaint.date}</p>
                    </div>
                </div>
                );
                })}

                <button onClick={() => setSelectedPage("complaints")}>View All Complaints</button>
            </div>
            <div className="dashmain-card2">
                <h1 className="dashmain-title2">Recent Certificates</h1>
                <p className="dashmain-desc2">Latest certificate requests and issuances</p>

                {certificates.slice(0,3).map((cert, index) => {
                 return(
                <div className="dashmain-comp">
                    <p><b>{cert.type}</b></p>
                    <p>{cert.fullname}</p>
                    <div className="dashmain-date">
                        <img className="dashmain-icon" src={Calendar}></img>
                        <p className = "p-date">{cert.date}</p>
                    </div>
                </div>
                 );
                })}

                <button onClick={() => setSelectedPage("certificates")}>View All Certificates</button>
            </div>
        </div>
        </div>
        )}
        </>
    )
}
export default Dashmain 