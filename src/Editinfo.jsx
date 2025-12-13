import React from "react";
import './Addresident.css';
import {useState} from "react";
import ResIcon from './assets/addresident.png';

function Editinfo({resident, onClose, refreshList}) {
    const AgeOptions = [];
    for(let i = 15; i<= 99; i++){
        AgeOptions.push(<option key={i} value={i}>{i}</option>);
    }

    const[lastName, setLastName] = useState(resident.last_name);
    const[firstName, setFirstName] = useState(resident.first_name);
    const[middleName, setMiddleName] = useState(resident.middle_name);
    const[gender, setGender] = useState(resident.gender);
    const[birthday, setBirthday] = useState(resident.dob);
    const[age, setAge] = useState(resident.age);
    const[address, setAddress] = useState(resident.address);
    const[civilStatus, setCivilStatus] = useState(resident.civil_status);
    const[contactNumber, setContactNumber] = useState(resident.contact);
    const[occupation, setOccupation] = useState(resident.occupation);
    const[remarks, setRemarks] = useState(resident.remarks);

    const handleCancel = () => {
        onClose();
    };

    const editRes = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost/bicms_backend/editres_info.php",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    resident_ID: parseInt(resident.resident_ID),
                    lastName, 
                    firstName, 
                    middleName, 
                    gender, 
                    birthday,
                    age, 
                    address, 
                    civilStatus, 
                    contactNumber, 
                    occupation, 
                    remarks}),
            });

            const data = await res.json();
            alert(data.message);
            
            if(data.success){
                refreshList();
                onClose();
            }
        }catch(err){
            console.error(err);
            alert("Fail to edit resident");
        }
    };

    return (
        <div className="add-resident" onClick={onClose}>
            <div className="add-resident-content" onClick={e => e.stopPropagation()}>
                <div className="AddRes-Header">
                    <img src={ResIcon} className="ResIcon" alt="Edit Resident Icon" />
                    <h1 className="h1-addresident">Edit Resident Information</h1>
                </div>
                <p className="p-addresident">Fill in with new resident information</p>

                <form onSubmit={editRes}>
                    {/* Name fields in horizontal row */}
                    <div className="Full-Name-Container">
                        <div className="name-field input-field">
                            <h2 className="h2-addresident">Last Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="name-field input-field">
                            <h2 className="h2-addresident">First Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="name-field input-field">
                            <h2 className="h2-addresident">Middle Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter middle name"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Other fields in two-column grid */}
                    <div className="addresident-grid">
                        <div className="input-field">
                            <h2 className="h2-addresident">Gender</h2>
                            <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="prefer not to say">I prefer not to say</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Age</h2>
                            <select 
                                value={age} 
                                onChange={(e) => setAge(Number(e.target.value))}
                                required
                            >
                                <option value="" disabled>Select Age</option>
                                {AgeOptions}
                            </select>
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Address</h2>
                            <textarea 
                                rows="1" 
                                placeholder="Enter complete address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Civil Status</h2>
                            <select 
                                value={civilStatus} 
                                onChange={(e) => setCivilStatus(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Civil Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Separated">Separated</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Contact Number</h2>
                            <input 
                                type="text" 
                                placeholder="Enter contact number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Occupation</h2>
                            <input 
                                type="text" 
                                placeholder="Enter occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Birthday</h2>
                            <input 
                                type="date" 
                                placeholder="Enter birthday"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-addresident">Remarks</h2>
                            <select 
                                value={remarks} 
                                onChange={(e) => setRemarks(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Remarks</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="buttons-addresident">
                        <button type="button" className="close-btn" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="addresident-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Editinfo;
