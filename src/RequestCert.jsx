import React from 'react';
import './RequestCert.css';

function RequestCert ({onClose}) {
    return (
        <div className="request-cert">
            <div className ='request-cert-content'>
                <h1 className = "h1-requestcert">Request Certificate</h1>
                <p className="p-requestcert">Fill in the details for the new certificate</p>
                <h2 className = "h2-requestcert">Certificate Type</h2>
                    <select>
                        <option value ="" disabled>Select Certificate Type</option>             
                        <option value ="Barangay Clearance">Barangay Clearance</option>
                        <option value ="Certificate of Residency">Certificate of Residency</option>
                        <option value ="Certificate of Indigency">Certificate of Indigency</option>
                        <option value ="Certificate of File Action">Certificate of File Action</option>
                    </select>
                <h2 className = "h2-requestcert">Applicant Name</h2>
                    <input type="text" placeholder="Enter full name"></input>
                <h2 className = "h2-requestcert">Contact Number</h2>
                    <input type ="text" placeholder="Enter contact number"></input>
                <h2 className = "h2-requestcert">Address</h2>
                    <input type ="text" placeholder="Enter complete address"></input>
                <h2 className = "h2-requestcert">Purpose</h2>
                    <input type ="text" placeholder="Enter purpose of certificate"></input>
                <div className = "buttons-requestcert">
                    <button className ="closerequest-btn" onClick = {onClose}>Cancel</button>  
                    <button className = "requestcert-btn">Request Certificate</button>
                </div>
            </div> 
        </div>
    );
}   
export default RequestCert;