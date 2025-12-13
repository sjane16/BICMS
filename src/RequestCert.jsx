import React from 'react';
import './RequestCert.css';
import {useState, useEffect} from "react";
import Medal from './assets/medal.png';

function RequestCert ({onClose, refreshList}) {
    const[info, setInfo] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        contact: "",
        address: ""
    })

    useEffect(() => {
        fetch("http://localhost/bicms_backend/reflectform.php", {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.message === "Access denied. User needs to log-in first"){
                console.warn("User needs to log-in first")
            }else{
                setInfo({
                    firstname: data[0].firstname,
                    middlename: data[0].middlename,
                    lastname: data[0].lastname,
                    contact: data[0].contact,
                    address: data[0].address
                })
            }
        })
        .catch(err => console.error("Fetch Error: ", err))
    }, [])

    const[type, setType] = useState("");
    const[purpose, setPurpose] = useState("");
    const [customPurpose, setCustomPurpose] = useState("");

    const finalPurpose = purpose === "Others" ? customPurpose : purpose;

    const handleRequest = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost/bicms_backend/requestcert.php", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    type: type,
                    firstname: info.firstname,
                    middlename: info.middlename,
                    lastname: info.lastname,
                    contact: info.contact,
                    address: info.address,
                    purpose: finalPurpose
                })
            });

            const data = await res.json();
            alert(data.message);

            if(data.success){
                setType("");
                setInfo({
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    contact: "",
                    address: ""
                }),
                setPurpose("")
                
                onClose()
                refreshList()
            };
        }catch(err){
            console.error(err);
            alert("Fetch Error:", err)
        }
    }

    return (
        <div className="request-cert" onClick={onClose}>
            <div className="request-cert-content" onClick={e => e.stopPropagation()}>
                <div className="requestcert-header">
                    <img src={Medal} alt="Medal Icon" />
                    <h1 className="h1-requestcert">Request Certificate</h1>
                </div>

                <p className="p-requestcert">Fill in the details for the new certificate</p>

                <form onSubmit={handleRequest}>
                    {/* Full Name split into 3 horizontally */}
                    <div className="Full-Name-Container">
                        <div className="name-field input-field">
                            <h2 className="h2-requestcert">First Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter first name"
                                value={info.firstname}
                                onChange={(e) => setInfo({...info, firstname: e.target.value})}
                                required
                            />
                        </div>
                        <div className="name-field input-field">
                            <h2 className="h2-requestcert">Middle Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter middle name"
                                value={info.middlename}
                                onChange={(e) => setInfo({...info, middlename: e.target.value})}
                                required
                            />
                        </div>
                        <div className="name-field input-field">
                            <h2 className="h2-requestcert">Last Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter last name"
                                value={info.lastname}
                                onChange={(e) => setInfo({...info, lastname: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Other fields in 2-column grid */}
                    <div className="requestcert-grid">
                        <div className="input-field">
                            <h2 className="h2-requestcert">Certificate Type</h2>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Certificate Type</option>             
                                <option value="Barangay Clearance">Barangay Clearance</option>
                                <option value="Certificate of Residency">Certificate of Residency</option>
                                <option value="Certificate of Indigency">Certificate of Indigency</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <h2 className="h2-requestcert">Contact Number</h2>
                            <input 
                                type="text" 
                                placeholder="Enter contact number"
                                value={info.contact}
                                onChange={(e) => setInfo({...info, contact: e.target.value})}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-requestcert">Address</h2>
                            <input 
                                type="text" 
                                placeholder="Enter complete address"
                                value={info.address}
                                onChange={(e) => setInfo({...info, address: e.target.value})}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <h2 className="h2-requestcert">Purpose</h2>
                            <select 
                                value={purpose} 
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Purpose</option>             
                                <option value="Job Application">Job Application</option>
                                <option value="Government ID Application">Government ID Application</option>
                                <option value="Legal Transaction">Legal Transaction</option>
                                <option value="Bank or Loan Application">Bank or Loan Application</option>
                                <option value="Business Transaction">Business Transaction</option>
                                <option value="Educational Assistance">Educational Assistance</option>
                                <option value="School Purpose">School Purpose</option>
                                <option value="Others">Others (please specify)</option>
                            </select>

                            {purpose === "Others" &&(
                            <input 
                                type="text" 
                                placeholder='No need to put "for" '
                                value={customPurpose}
                                onChange={(e) => setCustomPurpose(e.target.value)}
                                required
                            />
                            )}
                        </div>
                    </div>

                    <div className="buttons-requestcert">
                        <button type="button" className="closerequest-btn" onClick={onClose}>Cancel</button>  
                        <button type="submit" className="requestcert-btn">Request Certificate</button>
                    </div>
                </form>
            </div> 
        </div>
    );
}   
export default RequestCert;
