import './Report.css';
import Convo from './assets/complaints_.png';
import Cert from './assets/certificates_.png';
import People from './assets/residents_.png';
import ResInfo from './assets/repinfo.png';
import categories from './assets/categories.png';
import Type from './assets/cert-type.png';
import {useState, useEffect} from "react";

function SystemOverview(){

    const [stats, setStats] = useState([]);

    useEffect(() => {
            const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/systemoverview.php`,{
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setStats(data);
            }else(
                alert(data.message)
            )
        })
    }, []);

    return(
        <>
        <div className="report-cont1">
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Total Complaints</h1>
                                     <img className="report-icon" src={Convo} alt="Complaint icon"></img>
                                     </div>
                                         <div className="report-desc">
                                         <h1><b>{stats.totalComplaints ?? 0}</b></h1>
                                         <p>{stats.resolvedPercent ?? 0}% resolved</p>
                                         </div>
                                 </div>
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Total Certificates</h1>
                                     <img className="report-icon" src={Cert} alt="Certificate icon"></img>
                                     </div>
                                         <div className="report-desc">
                                             <h1><b>{stats.totalCert ?? 0}</b></h1>
                                         <p>{stats.claimed ?? 0} claimed</p>
                                         </div>
                                 </div>
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Active Cases</h1>
                                     <img className="report-icon" src={People} alt="Resident icon"></img>
                                     </div>
                                
                                         <div className = "report-desc">
                                            <h1>{stats.active ?? 0}</h1>
                                            <p>Requiring attention</p>
                                         </div>
                                 </div>
                        </div>
                        <div className="report-cont2">
                                    <div className="report-card2">
                                        <div className = "report-report-info">
                                            <img src = {categories} className = "report-categories"/>
                                            <h1 className="report-title2">Complaints by Category</h1>
                                        </div>
                                        <p className="report-desc2">Distribution of complaints</p>
                                        <div className="report-comp">
                                            <div className = "report-comp-item">
                                                <p>Noise Complaint</p>
                                                <p>{stats.noise ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Sanitation Issue</p>
                                                <p>{stats.sanitation ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Property/Neighbor Dispute</p>
                                                <p>{stats.dispute ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Infrastructure Problem</p>
                                                <p>{stats.infrastructure ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Others</p>
                                                <p>{stats.others ?? 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="report-card2">
                                        <div className = "report-report-info">
                                            <img src = {Type} className = "cert-type"/>
                                            <h1 className="report-title2">Certificates by Type</h1>
                                        </div>
                                        <p className="report-desc2">Distribution of certificate types</p>
                                        <div className="report-comp">
                                            <div className = "report-comp-item">
                                                <p>Barangay Clearance</p>
                                                <p>{stats.clearance ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Certificate of Residency</p>
                                                <p>{stats.residency ?? 0}</p>
                                            </div>
                                            <div className = "report-comp-item">
                                                <p>Certificate of Indigency</p>
                                                <p>{stats.indigency ?? 0}</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* <div className="report-cont2">
                                    <div className="report-card2">
                                        <div className="report-report-info">
                                            <img className="report-calendar" src={ResInfo} alt="Calendar icon"></img>
                                        <h1 className="report-title2">Report Information</h1>
                                        </div>
                                        <div className="report-info">
                                            <p><b>Report Type:</b> System Overview</p>
                                            <p><b>Period:</b> Current Month</p>
                                            <p><b>Generated:</b> 10/23/25</p>
                                            <p><b>Date as of:</b> 10/23/25</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="report-space"></div> */}
        </>
    )
}

export default SystemOverview