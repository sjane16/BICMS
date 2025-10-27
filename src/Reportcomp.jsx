import './Report.css'
import Calendar from './assets/calendar.png'

function Reportcomp(){
    return(
        <>
             <div className="report-cont1">
                         <div className="report-card">
                             <div className="report-title">
                             <h1>Pending</h1>
                             </div>
                                 <div className="report-desc">
                                 <h1><b>1</b></h1>
                                 <p>Awaiting assignment</p>
                                 </div>
                         </div>
                         <div className="report-card">
                             <div className="report-title">
                             <h1>In Progress</h1>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>1</b></h1>
                                 <p>Currently being handled</p>
                                 </div>
                         </div>
                          <div className="report-card">
                             <div className="report-title">
                             <h1>Resolved</h1>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>1</b></h1>
                                 <p>Successfully completed</p>
                                 </div>
                         </div>
                        
                </div>
                <div className="report-cont2">
                            <div className="report-card2">
                                <div className="report-progress-title">
                                <h1 className="report-title2">Resolution Rate</h1>
                                <p className="report-desc2">Percentage of complaints resolved</p>
                                <h1>33.3%</h1>
                                </div>
                                <div className="report-progress-bar">
                                    <div className="report-progress-fill" style={{width: "33.3%"}}></div>
                                </div>
                            </div>
                    </div>
                    <div className="report-cont2">
                            <div className="report-card2">
                                <div className="report-info">
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
    );
}
export default Reportcomp