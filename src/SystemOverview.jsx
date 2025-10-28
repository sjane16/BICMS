import './Report.css';
import Convo from './assets/conv.png';
import Cert from './assets/certf.png';
import People from './assets/team.png';
import Calendar from './assets/calendar.png';

function SystemOverview(){
    return(
        <>
        <div className="report-cont1">
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Total Complaints</h1>
                                     <img className="report-icon" src={Convo} alt="Complaint icon"></img>
                                     </div>
                                         <div className="report-desc">
                                         <h1><b>3</b></h1>
                                         <p>3.33% resolved</p>
                                         </div>
                                 </div>
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Total Certificates</h1>
                                     <img className="report-icon" src={Cert} alt="Certificate icon"></img>
                                     </div>
                                         <div className="report-desc">
                                             <h1><b>3</b></h1>
                                         <p>1 claimed</p>
                                         </div>
                                 </div>
                                 <div className="report-card">
                                     <div className="report-title">
                                     <h1>Active Cases</h1>
                                     <img className="report-icon" src={People} alt="Resident icon"></img>
                                     </div>
                                     <div className="report-residents-container">
                                         <h1 className="report-residents">3</h1>
                                     </div>
                                     <div className="report-desc">
                                     <p>Requiring attention</p>
                                     </div>
                                 </div>
                        </div>
                        <div className="report-cont2">
                                    <div className="report-card2">
                                        <h1 className="report-title2">Complaints by Category</h1>
                                        <p className="report-desc2">Distribution of complaints</p>
                                        <div className="report-comp">
                                            <p>Noise</p>
                                            <p>Sanitation</p>
                                            <p>Dispute</p>
                                            <p>1</p>
                                            <p>1</p>
                                            <p>1</p>
                                        </div>
                                    </div>
                                    <div className="report-card2">
                                        <h1 className="report-title2">Certificates by Type</h1>
                                        <p className="report-desc2">Distribution of certificate types</p>
                                        <div className="report-comp">
                                            <p>Clearance</p>
                                            <p>Residency</p>
                                            <p>Indigency</p>
                                            <p>1</p>
                                            <p>1</p>
                                            <p>1</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="report-cont2">
                                    <div className="report-card2">
                                        <div className="report-report-info">
                                            <img className="report-calendar" src={Calendar} alt="Calendar icon"></img>
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
                            <div className="report-space"></div>
        </>
    )
}

export default SystemOverview