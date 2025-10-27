import React from "react";
import './Filecomplaint.css';

function Filecomplaint ({onClose}) {
    return (
        <div className="file-complaint">
            <div className ='file-complaint-content'>
                <h1 className = "h1-filecomp">File A Complaint</h1>
                <p className="p-filecomp">Fill in the details for the new complaint</p>

                <h2>Complainant Name</h2>
                    <input type="text" placeholder="Enter full name"></input>
                <h2>Contact Number</h2>  
                    <input type="text" placeholder="Enter contact number"></input>
                <h2>Address</h2>
                    <textarea rows = "2" cols="50" placeholder="Enter complete address"></textarea>

                <h2>Category</h2>
                    <select>
                        <option value ="" disabled>Select Category</option>
                        <option value ="Noise Complaint">Noise Complaint</option>
                        <option value ="Sanitation Issue">Sanitation Issue</option>
                        <option value ="Property/Neighbor Dispute">Property/Neighbor Dispute</option>
                        <option value ="Infrastructure Problem">Infrastructure Problem</option>
                        <option value ="Others">Others</option>
                    </select>
                <h2>Priority</h2>
                    <select>
                        <option value =" "disabled>Set Priority</option>
                        <option value ="Low">Low</option>
                        <option value ="Medium">Medium</option>
                        <option value ="High">High</option>
                        
                    </select>
                <h2>Subject</h2>
                    <input type ="text" placeholder="Brief Description of the issue"></input>
                <h2>Description</h2>
                    <textarea rows = "3" cols="50" placeholder="Detailed description of the complaint"></textarea>
                <div className = "buttons-filecomp">
                    <button className ="close-btn" onClick = {onClose}>Cancel</button>
                    <button className = "filecomp-btn">File Complaint</button>
                </div>
            </div> 
        </div>
    );
}

export default Filecomplaint;