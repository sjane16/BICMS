import {useState} from "react";
import './Report.css';
import Reportcomp from './Reportcomp.jsx';
import Reportcert from './Reportcert.jsx';
import SystemOverview from './SystemOverview.jsx';

function Report(){
    const [selectedReport, setSelectedReport]=useState("system_overview");
    
    const handleChange = (e) =>{
        setSelectedReport(e.target.value);
    };
    
    const[compReport, setCompReport] = useState(null);
    
    return(
        <>
        <div className="report-page">
            <div className="report-head-title">
                <h1>Reports</h1>
            </div>
            <div className="report-dropdown">
                <select className="report-options" id="overview" name="overview" value={selectedReport} onChange={handleChange}>
                   <option value="system_overview">System Overview</option>
                    <option value="complaints_report">Complaints Report</option>
                    <option value="certificates_report">Certificates Report</option>
                </select>
            </div>

            {selectedReport === "complaints_report" && (<Reportcomp />)}
            {selectedReport === "certificates_report" && (<Reportcert />)}
            {selectedReport === "system_overview" && (<SystemOverview />)}

        </div>
       
        </>
    );
}
export default Report 