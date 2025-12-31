import './Complaint.css'
import HeaderLog from './HeaderLog.jsx'
import SearchLogo from './assets/searchlogo.png'
import Convo from './assets/conversation.png'
import Profile from './assets/profile.png'
import Tel from './assets/telephone.png'
import Warning from './assets/warning.png'
import Calendar from './assets/calendar.png'
import React, { useState, useEffect } from 'react';
import Assign from './Assign.jsx';
import Resolve from './Resolve_.jsx';
import Location from './assets/location.png';
import description from './assets/description.png';
import assigncon from './assets/assigned.png';
import resolution from './assets/resolution.png';
import ActualCompDate from './ActualCompDate.jsx';

function Complaint(){
    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [assign, setAssign] = useState(null);
    const [resolve, setResolve] = useState(null);
    const [actualCDate, setActualCDate] = useState(null);
    const [status, setStatus] = useState("");

    const fetchComplaints = () => {
        fetch("http://localhost/bicms_backend/trackcomp.php", {
            method: "POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setComplaints(data))
        .catch(err => console.error("Fetch Error:", err))
    }

    useEffect(() => {
        fetchComplaints();
    }, []);

    const filterComp = complaints
    .filter(complaint => {
        if(status === "") return complaint.status != "escalated";
        return complaint.status === status;
    })
    .filter(complaint =>{
        if(!search) return true;
        const formatID = `C00${complaint.id}`;
        const searchLower = search.toLowerCase();
        return(
            formatID.toLowerCase().includes(searchLower) ||
            complaint.fullname.toLowerCase().includes(searchLower)
        )
    });

    return(
        <>
        
        <div className="complaint-page">
        <div className="complaints-create-complaints">
            <div className="complaints-heading">
                <h1>Complaints</h1>
            </div>
        </div>
    
        <div className="complaints-search_status">
            <div className="complaints-searchFunction">
                <img src={SearchLogo} alt="searchlogo" />
                <input 
                type="text" 
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="complaints-Status">
                <select value={status} onChange ={(e) => setStatus(e.target.value)}>
                    <option value="" >All Status</option>
                    <option value="pending">Pending</option>
                     <option value="in progress">In Progress</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Escalated</option>
                </select>
            </div>
        </div>

         {filterComp.map((complaint, index) => { 
            return(         
        <div className="complaints-list-certificate" key={complaint.id}>
            <div className="complaints-cert1">
                <div className="complaints-name_status">
                    <div className="complaints-name_label">
                        <div className="complaints-complaint-title">
                        <img className="complaints-complainticon" src={Convo} alt="Complaint icon"></img>
                        <h1>C00{complaint.id}</h1>
                        </div>
                        <span className="complaints-status-label ready">{complaint.status}</span>
                    </div>
                    <div className="complaints-cert1Button">
                    {!complaint.assigned_to && (
                    <button className="complaints-statbutton" onClick={() => setAssign(complaint)}>Assign</button>
                    )}
                    {complaint.status === "in progress"  && (
                    <button className="complaints-statbutton" onClick={() => setResolve(complaint)}>Resolve</button>
                    )}
                    {["monitoring"].includes(complaint.status) && (
                    <button className="complaints-statbutton" onClick ={() => setActualCDate(complaint)}>Actual Compliance Date</button>
                    )}
                    </div>
                </div>

                <h2>{complaint.subject}</h2>

            <div className = "column-item">
                <div className="complaints-FirstRow">
                    <h2>Complainant</h2>
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Profile} alt="Profile icon"></img>
                    <p className="complaints-p1"><b>{complaint.fullname}</b></p>
                    </div>
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Tel} alt="Telephone icon"></img>
                    <p className="complaints-p2">{complaint.contact}</p>
                    </div>
                    <div className = "complaints-cont">
                    <img className = "complaints-RowIcon" src = {Location} />
                    <p className="complaints-p3">{complaint.address}</p>
                    </div>
                    <div className="complaints-cont">
                        <img className="complaints-RowIcon" src={Warning}></img>
                        <p>{complaint.type}</p>
                    </div>
                </div>

                <div className="complaints-SecondRow">
                    <h2>Respondent</h2>
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Profile} alt="Profile icon"></img>
                    <p className="complaints-p1"><b>{complaint.respondent_name}</b></p>
                    </div>
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Tel} alt="Telephone icon"></img>
                    <p className="complaints-p2">{complaint.respondent_address}</p>
                    </div>
                    <div className = "complaints-cont">
                    <img className = "complaints-RowIcon" src = {Location} />
                    <p className="complaints-p3"><b>Relationship:</b> {complaint.relationship}</p>
                    </div>
                    <div className="complaints-cont">
                        <img className="complaints-RowIcon" src={Warning}></img>
                        <p><b>Incident date:</b> {complaint.incident_date}</p>
                    </div>
                </div>

                <div className="complaints-ThirdRow">
                    <div className = "complaints-cont">
                    <img className = "complaints-RowIcon" src = {description} />
                    <p className="complaints-p4"><b>Description: </b> {complaint.description}</p>
                    </div>
                    <div className="complaints-cont">
                        <img className="complaints-RowIcon" src={Calendar} alt="Calendar Icon"></img>
                        <p className="complaint-submit"><b>Submitted: </b> {complaint.date}</p>
                    </div>
                    {complaint.assigned_to && (
                    <div className="complaints-cont">
                        <img className ="complaints-RowIcon" src = {assigncon}  alt="Calendar Icon"></img>
                        <p className="complaint-submit"><b>Assigned to: </b> {complaint.assigned_to}</p>
                    </div>
                    )}
                    <div className="complaints-cont">
                        {["monitoring", "resolved", "dismissed", "escalated"].includes(complaint.status) && (
                        <div className = "Res-Res">
                            <div className = "resolution-header">
                            <p className="complaint-submit"><b>Resolution Type: </b> {complaint.resolution_type}</p>
                            </div>
                            {["Amicable Settlement (Kasunduang Pag-aayos)", "Arbitration Award"].includes(complaint.resolution_type) && (
                            <div className="amicable/arbitration">
                            <p className="complaint-submit"><b>Resolution Date: </b> {complaint.resolution_date}</p>
                            <p className="complaint-submit"><b>Terms and Conditions: </b> {complaint.Terms_Conditions}</p>

                            {complaint.Terms_Conditions === "Monetary Claim Settlement" &&(
                            <div className="monetary">
                            <p className="complaint-submit"><b>Amount: </b> {complaint.amount}</p>
                            <p className="complaint-submit"><b>Type of Payment: </b> {complaint.payment_type}</p>
                            {complaint.payment_type === "Full Payment" && (
                            <p className="complaint-submit"><b>Payment Date: </b> {complaint.compliance_date}</p>
                            )}
                            {complaint.payment_type === "Partial Payment" && (
                            <p className="complaint-submit"><b>Installment Details: </b> {complaint.description}</p>
                            )}
                            </div>
                            )}

                            {complaint.Terms_Conditions === "Return/Restitution of Property" && (
                                <div className="return">
                                    <p className="complaint-submit"><b>Item Description: </b> {complaint.description}</p>
                                    <p className="complaint-submit"><b>Return Date: </b> {complaint.compliance_date}</p>
                                </div>
                            )}

                            {complaint.Terms_Conditions === "Performance of Service/Action" && (
                                <div className="service">
                                    <p className="complaint-submit"><b>Service Description: </b> {complaint.description}</p>
                                     <p className="complaint-submit"><b>Deadline: </b> {complaint.compliance_date}</p>
                                </div>
                            )}

                            {complaint.Terms_Conditions === "Apology/Formal Reconciliation" && (
                                <div className="apology">
                                     <p className="complaint-submit"><b>Date of Apology: </b> {complaint.compliance_date}</p>
                                </div>
                            )}

                            {complaint.Terms_Conditions === "Agreement to Vacate Property" && (
                                <div className="vacate">
                                    <p className="complaint-submit"><b>Move-out Date: </b> {complaint.compliance_date}</p>
                                </div>
                            )}

                            {complaint.Terms_Conditions === "Acknowledgement of Debt" && (
                                <div className="debt">
                                    <p className="complaint-submit"><b>Total Amount of Debt: </b> {complaint.amount}</p>
                                    <p className="complaint-submit"><b>Payment Plan: </b> {complaint.description}</p>
                                </div>
                            )}

                            {complaint.Terms_Conditions === "Others" && (
                                <div className="others">
                                    <p className="complaint-submit"><b>Description: </b> {complaint.description}</p>
                                </div>
                            )}
                                <p className="complaint-submit"><b>Resolution Status: </b> {complaint.resolution_status}</p>
                                {complaint.resolution_status === "Complied" && (
                                    <p className="complaint-submit"><b>Actual Compliance Date: </b> {complaint.actualcompliance_date}</p>
                                )}
                                
                            </div>
                            )}

                            {complaint.resolution_type === "Withdrawal of Complaint" && (
                                <div className="withdrawal">
                                    <p className="complaint-submit"><b>Resolution Type: </b> {complaint.resolution_type}</p>
                                    <p className="complaint-submit"><b>Date of Withdrawal: </b> {complaint.resolution_date}</p>
                                    <p className="complaint-submit"><b>Resolution Status: </b> {complaint.resolution_status}</p>
                                </div>
                            )}

                            {complaint.resolution_type === "Referral to Court/Proper Agency" &&(
                                <div className="referral">
                                    <p className="complaint-submit"><b>Resolution Type: </b> {complaint.resolution_type}</p>
                                    <p className="complaint-submit"><b>Date of Issuance: </b> {complaint.resolution_date}</p>
                                    <p className="complaint-submit"><b>Resolution Status: </b> {complaint.resolution_status}</p>
                                </div>
                            )}

                            
                        </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
            );
        })}

        {assign && (
            <Assign 
            assigned = {assign}
            onClose={() => setAssign(null)}
            refreshList = {fetchComplaints}
            />
        )}

        {resolve &&(
            <Resolve
             resolved = {resolve}
             onClose ={() => setResolve(null)}
             refreshList = {fetchComplaints}
            />
        )}

        {actualCDate && (
            <ActualCompDate 
            actualdate = {actualCDate}
            onClose ={() => setActualCDate(null)}
            refreshList = {fetchComplaints}
            />
        )}

        
        </div>

    
        </>
    );
}
export default Complaint