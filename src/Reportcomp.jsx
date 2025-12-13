import './Report.css'
import Pending from './assets/pending.png';
import InProgress from './assets/clock.png';
import Resolve from './assets/resolve-report.png';
import Resolution from './assets/resrate.png';
import ResInfo from './assets/repinfo.png';
import {useState, useEffect} from 'react';
import Dlreportcomp from './Dlreportcomp.jsx';

function Reportcomp(){

    const[stats, setStats] = useState([]);
    const[downloadrep, setDownloadRep] = useState(null);
    const[repinfocomp, setRepInfoComp] = useState([]);

    useEffect(() => {
        fetch("http://localhost/bicms_backend/complaintreports.php", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setStats(data);
            }else{
                alert(data.message)
            }
        })
    }, []);

    const fetchrepinfo = () => {
    fetch("http://localhost/bicms_backend/reportinfocomp.php", {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setRepInfoComp(data))
        .catch(err => console.error("Failed to fetch report info:", err));
    }

    useEffect(() => {
        fetchrepinfo()
    }, []);

    return(
        <>
         <div className="report-head-title">
                <button className="report-download"
                onClick={() => setDownloadRep(true)}
                >⭳ Download Report</button>
            </div>
        
             <div className="report-cont1">
                         <div className="report-card">
                             <div className="report-title">
                             <div className = "report-info-header">
                                <h1>Pending</h1>
                                <img className = "" src = {Pending} />
                             </div>
                             </div>
                                 <div className="report-desc">
                                 <h1><b>{stats.pending ?? 0}</b></h1>
                                 <p>Awaiting assignment</p>
                                 </div>
                         </div>
                         <div className="report-card">
                             <div className="report-title">
                             <h1>In Progress</h1>
                             <img src = {InProgress} />
                             </div>
                                 <div className="report-desc">
                                     <h1><b>{stats.progress ?? 0}</b></h1>
                                 <p>Currently being handled</p>
                                 </div>
                         </div>
                          <div className="report-card">
                             <div className="report-title">
                                <div className = "report-info-header">
                                    <h1>Resolved</h1>
                                    <img src = {Resolve} className = "Resolve-Report"/> 
                                </div>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>{stats.resolved ?? 0}</b></h1>
                                 <p>Successfully completed</p>
                                 </div>
                         </div>
                          <div className="report-card">
                             <div className="report-title">
                                <div className = "report-info-header">
                                    <h1>Dismissed</h1>
                                    <img src = {Resolve} className = "Resolve-Report"/> 
                                </div>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>{stats.dismissed ?? 0}</b></h1>
                                 <p>Turned over to higher officials</p>
                                 </div>
                         </div>
                        
                </div>
                <div className="report-cont2">
                            <div className="report-card2">
                                <div className="report-progress-title">
                                <div className = "report-info-header">
                                <img src = {Resolution} className = "ResRate" />
                                <h1 className="report-title2">Resolution Rate</h1>
                                </div>
                                <p className="report-desc2">Percentage of complaints resolved</p>
                                <h1>{stats.resolvedPercent}%</h1>
                                </div>
                                <div className="report-progress-bar">
                                    <div className="report-progress-fill" style={{width: `${stats.resolvedPercent}`}}></div>
                                </div>
                            </div>
                    </div>
                    <div className="report-cont2">
                            <div className="report-card2">
                                <div className="report-info">
                                    <div className = "report-info-header">
                                        <img className="report-calendar" src={ResInfo} alt="Calendar icon"></img>
                                        <h1 className="report-title2">Report Information</h1>
                                    </div>
                                </div>
                                {repinfocomp.length > 0 ? (
                                <div className="report-info">
                                    <p><b>Report Type:</b> {repinfocomp[0].report_type}</p>
                                    <p><b>Period:</b> {repinfocomp[0].period}</p>
                                    <p><b>Generated by:</b> {repinfocomp[0].generated_by}</p>
                                    <p><b>Date as of:</b> {repinfocomp[0].generation_date}</p>
                                </div>
                                ) : " "}
                            </div>
                    </div>
                    <div className="report-space"></div>

                    {downloadrep && (
                        <Dlreportcomp 
                        onClose={() => {setDownloadRep(null)
                            fetchrepinfo()
                        }}
                        
                        />
                    )}
       
        </>
    );
}
export default Reportcomp