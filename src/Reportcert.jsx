import './Report.css'
import Calendar from './assets/calendar.png'

function Reportcert(){
    return(
        <>
             <div className="report-cont1">
                         <div className="report-card">
                             <div className="report-title">
                             <h1>Pending</h1>
                             </div>
                                 <div className="report-desc">
                                 <h1><b>1</b></h1>
                                 </div>
                         </div>
                         <div className="report-card">
                             <div className="report-title">
                             <h1>Processing</h1>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>1</b></h1>
                                 </div>
                         </div>
                          <div className="report-card">
                             <div className="report-title">
                             <h1>Ready</h1>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>1</b></h1>
                                 </div>
                         </div>
                         <div className="report-card">
                             <div className="report-title">
                             <h1>Claimed</h1>
                             </div>
                                 <div className="report-desc">
                                     <h1><b>1</b></h1>
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
    );
}
export default Reportcert