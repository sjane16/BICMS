import React from "react";
import {useState, useEffect} from "react";
import './Filecomplaint.css';
import complaint from './assets/complaint_modal.png';

function Filecomplaint ({onClose, refreshList}) {

    const[info, setInfo] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        contact: "",
        address: ""
    });

    const today = new Date();
    const currentYear = today.getFullYear();
    const mm = String(today.getMonth() +1).padStart(2,"0");
    const dd = String(today.getDate()).padStart(2,"0");
    const minDate = `${currentYear}-01-01`;
    const maxDate = `${currentYear}-${mm}-${dd}`;

    useEffect(() => {
        fetch("http://localhost/bicms_backend/reflectform.php",{
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "Access denied. User needs to log-in first"){
                console.warn("User isn't logged in")
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
        .catch(err => console.error("Fetch error:" , err))
    }, [])

    const[category, setCategory] = useState("");
    const[priority, setPriority] = useState("");
    const[subject, setSubject] = useState("");
    const[description, setDescription] = useState("");
    const[respondentfname, setRespondentfname] = useState("");
    const[respondentmname, setRespondentmname] = useState("");
    const[respondentlname, setRespondentlname] = useState("");
    const[relationship, setRelationship] = useState("");
    const[respondentAddress, setRespondentAddress] = useState("");
    const[dateIncident, setDateIncident] = useState("");
    const [customCategory, setCustomCategory] = useState("");

    const finalCategory = category === "Others" ? customCategory : category;


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost/bicms_backend/filecomp.php", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    firstname: info.firstname,
                    middlename: info.middlename,
                    lastname: info.lastname,
                    contact: info.contact,
                    address: info.address,
                    category: category,
                    subject: subject,
                    description: description,
                    respondentfname: respondentfname,
                    respondentmname: respondentmname,
                    respondentlname: respondentlname,
                    relationship: relationship,
                    respondentAddress: respondentAddress,
                    dateIncident: dateIncident
                })
            });
            const data = await res.json();
            alert(data.message);

            if(data.success){
                setInfo({
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    contact: "",
                    address: ""
                });
                setCategory("");
                setPriority("");
                setSubject("");
                setDescription("");

                onClose()
                refreshList()
            }
        }catch(err){
            console.error(err);
            alert("Fail to file a complaint")
        }
    }

    return (
        <div className="file-complaint" onClick={onClose}>
            <div className="file-complaint-content" onClick={e => e.stopPropagation()}>
                <div className='heading-file-comp'>
                    <img src={complaint} alt="Complaint Icon" />
                    <h1 className="h1-filecomp">File A Complaint</h1>
                </div>
                <p className="p-filecomp">Fill in the details for the new complaint</p>

                <form onSubmit={handleSubmit}>
                    {/* Full Name split into 3 horizontally */}
                    <div className="Full-Name-Container">
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainant's First Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter First Name"
                                value={info.firstname}
                                onChange={(e) => setInfo({...info, firstname: e.target.value})}
                                required
                            />
                        </div>
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainant's Middle Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter Middle Name"
                                value={info.middlename}
                                onChange={(e) => setInfo({...info, middlename: e.target.value})}
                                required
                            />
                        </div>
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainant's Last Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter Last Name"
                                value={info.lastname}
                                onChange={(e) => setInfo({...info, lastname: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Contact and Address in 2 columns */}
                    <div className="contact-address-container">
                        <div className="contact-field">
                            <h2 className="h2-filecomp">Contact Number</h2>
                            <input 
                                type="text" 
                                placeholder="Enter contact number"
                                value={info.contact}
                                onChange={(e) => setInfo({...info, contact: e.target.value})}
                                required
                            />
                        </div>
                        <div className="address-field">
                            <h2 className="h2-filecomp">Address</h2>
                            <textarea 
                                rows="1" 
                                placeholder="Enter complete address"
                                value={info.address}
                                onChange={(e) => setInfo({...info, address: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <hr style={{margin: "30px 0px 20px 0px"}}/>

                    <div className="Full-Name-Container">
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainee's First Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter First Name"
                                value={respondentfname}
                                onChange={(e) => setRespondentfname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainee's Middle Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter Middle Name"
                                value={respondentmname}
                                onChange={(e) => setRespondentmname(e.target.value)}
                            />
                        </div>
                        <div className="name-field">
                            <h2 className="h2-filecomp">Complainee's Last Name</h2>
                            <input 
                                type="text" 
                                placeholder="Enter Last Name"
                                value={respondentlname}
                                onChange={(e) => setRespondentlname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="contact-address-container">
                        <div className="contact-field">
                            <h2 className="h2-filecomp">Relationship to Complainee</h2>
                            <select 
                            value={relationship} 
                            onChange={(e) => setRelationship(e.target.value)}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Family">Family</option>
                            <option value="Neighbor">Neighbor</option>
                            <option value="Household">Household</option>
                            <option value="Work-related">Work-related</option>
                            <option value="Community">Community</option>
                            <option value="Other">Other(Acquaintance, Stranger, Unknown)</option>
                        </select>
                        </div>
                        <div className="address-field">
                            <h2 className="h2-filecomp">Complainee's Address</h2>
                            <textarea 
                                rows="1" 
                                placeholder="Enter complete address"
                                value={respondentAddress}
                                onChange={(e) => setRespondentAddress(e.target.value)}
                            />
                        </div>
                      </div>
                     <hr style={{margin: "30px 0px 20px 0px"}}/>
                  <div className="contact-address-container">
                        <div className="address-field">
                            <h2 className="h2-filecomp">Date of Incident</h2>
                            <input 
                                type="date" 
                                placeholder="Enter date of incident"
                                value={dateIncident}
                                onChange={(e) => setDateIncident(e.target.value)}
                                required
                                min = {minDate}
                                max = {maxDate}
                            />
                        </div>
                    

                    {/* Category and Priority fields */}
                    <div className="select-field">
                        <h2 className="h2-filecomp">Category</h2>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Noise Complaint">Noise Complaint</option>
                            <option value="Sanitation Issue">Sanitation Issue</option>
                            <option value="Property/Neighbor Dispute">Property/Neighbor Dispute</option>
                            <option value="Infrastructure Problem">Infrastructure Problem</option>
                            <option value="Others">Others (please specify)</option>
                        </select>

                        {category === "Others" &&(
                            <input 
                                type="text" 
                                className="other-category"
                                placeholder='Input exact category'
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                required
                            />
                            )}
                    </div>
                 

                    

                    {/* Subject field */}
                    <div className="text-field">
                        <h2 className="h2-filecomp">Subject</h2>
                        <input 
                            type="text" 
                            placeholder="Brief description of the issue"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                     </div>

                    {/* Description field */}
                    <div className="text-field">
                        <h2 className="h2-filecomp">Description</h2>
                        <textarea 
                            rows="3" 
                            placeholder="Detailed description of the complaint"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="buttons-filecomp">
                        <button type="button" className="filecomp-close-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="filecomp-btn">File Complaint</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filecomplaint;
