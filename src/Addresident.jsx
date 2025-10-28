import React from "react";
import './Addresident.css';

function Addresident({onClose}) {
    const AgeOptions = [];
    for(let i = 15; i<= 99; i++){
        AgeOptions.push(<option key={i} value={i}>{i}</option>);
    }
    return (
        <div className="add-resident">
            <div className ='add-resident-content'>
                <h1 className = "h1-addresident">Add New Resident</h1>
                <p className="p-addresident">Fill in the details for the new resident</p>
                <div className="addresident-cont1">
                <h2 className="addres-lname">Last Name</h2>
                    <input type="text" placeholder="Enter last name"></input>
                <h2>First Name</h2>
                    <input type="text" placeholder="Enter first name"></input>
                <h2>Middle Name</h2>
                    <input type="text" placeholder="Enter middle name"></input>
                <h2>Gender</h2>
                    <select>
                        <option value ="" disabled>Select Category</option>
                        <option value ="Female">Female</option>
                        <option value ="Male">Male</option>
                        <option value ="Non-binary">Non-binary</option>
                        <option value ="prefer not to say">I prefer not to say</option>
                    </select>
                <h2>Age</h2>
                    <select>
                        <option value ="" disabled>Select Age</option>
                        {AgeOptions}
                    </select>
                <h2 className="addres-address-textarea">Address</h2>
                    <textarea rows = "1" cols="50" placeholder="Enter complete address"></textarea>
                <h2>Civil Status</h2>
                    <select>
                        <option value ="" disabled>Select Category</option>
                        <option value ="Single">Single</option>
                        <option value ="Married">Married</option>
                        <option value ="Separated">Separated</option>
                        <option value ="Widowed">Widowed</option>
                    </select>
                <h2>Contact Number</h2>  
                    <input type="text" placeholder="Enter contact number"></input>
                <h2>Occupation</h2>  
                    <input type="text" placeholder="Enter occupation"></input>
                <h2>Remarks</h2>
                    <select>
                        <option value ="" disabled>Select Category</option>
                        <option value ="Active">Active</option>
                        <option value ="Inactive">Inactive</option>
                    </select>
                </div>
                <div className = "buttons-addresident">
                    <button className ="close-btn" onClick = {onClose}>Cancel</button>
                    <button className = "addresident-btn">Add Resident</button>
                </div>
            </div> 
        </div>
    );
}

export default Addresident;