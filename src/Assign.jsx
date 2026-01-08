import assignIcon from './assets/assign.png';
import './Resolve_.css';
import {useState} from 'react';

function Assign ({assigned, onClose, refreshList}) {
    const [assignComp, setAssignComp] = useState("");
    const [generateSummon, setGenerateSummon] = useState("");
    const [hearingDate, setHearingDate] = useState("");
    const [hearingTime, setHearingTime] = useState("");
    const [timeError, setTimeError] = useState("");

    const saveTime = (e) => {
        const newTime = e.target.value;
        setHearingTime(newTime);

        if(!newTime){
            setTimeError("");
            return;
        }

        if(newTime < "14:00" || newTime > "17:00"){
            setTimeError("Please schedule between 2:00 pm and 5:00 pm");
        }else{
            setTimeError("");
        }
    };

    const today = new Date();
    const year = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const min = `${year}-${mm}-${dd}`;
    const max = `${year}-12-31`;

    const handleCancel = () => {
        onClose();
    };

    const handleSave = async(e) => {
        const API_URL = import.meta.env.VITE_API_URL;
        e.preventDefault();

        try{
            const res = await fetch(`${API_URL}/assignofficial.php`,{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    id: assigned.id, 
                    assign: assignComp,
                    status: 'in progress'
                })
            });

            const data = await res.json();
            alert(data.message);

            if(data.success){
                setAssignComp("");
                refreshList();
                onClose();
            }
        }catch(err){
            console.error(err);
            alert("Fail to assign officials")
        }
    };

    const downloadSummon = async () =>{
        const API_URL = import.meta.env.VITE_API_URL;
        try{
            const res = await fetch(`${API_URL}/generatesummon.php`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    id: assigned.id,
                    complainant_name: assigned.fullname,
                    respondent_name: assigned.respondent_name,
                    subject: assigned.subject,
                    hearingdate: hearingDate,
                    hearingtime: hearingTime
                })
            });

            const pdf = await res.blob();
            const url = window.URL.createObjectURL(pdf);

            window.open(url, '_blank');

            const a = document.createElement("a");
            a.href = url;
            a.download = "Summon_Letter.pdf";
            a.Click();

            window.URL.revokeObjectURL(url);
        }catch(err){
            console.error("Error generating summon letter", err)
        }
    };

    return (
        <div className =  "resolve-page">    
            <div className ="resolve-container">
                <div className = "resolve-header">
                    <div className = "first-row-header-assign">    
                        <img src = {assignIcon} className='Assign'/>
                        <h1 className  = "h1-resolve-header"> Assigning Complaint</h1>
                    </div>
                </div>

                <div className = "resolve-body">
                    <h2 className = "h2-resolve-header">Assign the complaint to:</h2>
                    <select
                    className="resolve-select"
                    value = {assignComp}
                    onChange = {(e) => setAssignComp(e.target.value)}
                    >
                        <option value="" disabled>Choose a barangay official</option>
                        <option value="Edgardo A. Bornales">Edgardo A. Bornales</option>
                        <option value="Manilyn R. Malonzo">Manilyn R. Malonzo</option>
                        <option value="Amalia V. Guina">Amalia V. Guina</option>
                        <option value="Conrad S. Jacinto">Conrad S. Jacinto</option>
                        <option value="Pedro S. Maddatu">Pedro S. Maddatu</option>
                        <option value="Anthony O. Sera Jose">Anthony O. Sera Jose</option>
                        <option value="Yolanda S. Tangi">Yolanda S. Tangi</option>
                        <option value="Gilbert D.C. Caballero">Gilbert D.C. Caballero</option>
                        <option value="Michael C. Sera Jose">Michael C. Sera Jose</option>
                        <option value="Dorida B. Zape">Dorida B. Zape</option>                       
                    </select>
                </div>
                

                <div className="cont1">
                    <div className="type-payment">
                    <h2 className = "h2-resolve-headers">Would you like to generate a summon letter?</h2>
                    <div className="radio-group">
                    <div className="radio-option">
                    <label className="type">
                    <input
                    type = "radio"
                    className = "type_resolve"
                    name ="type"
                    value="Yes"
                    onChange={(e) => setGenerateSummon(e.target.value)}
                    />
               
                   Yes</label>
                    </div>
                    <div className="radio-option">
                     <label className="type">
                    <input
                    type = "radio"
                    className = "type_resolve"
                    name ="type"
                    value="No"
                    onChange={(e) => setGenerateSummon(e.target.value)}
                    />
                   No </label>
                    </div>
                    </div>
                    </div>
                </div>


                {generateSummon === "Yes" && (
                <div>
                <div className="summonform">
                        <div className="cont">
                            <h2 className = "h2-resolve-headers">Hearing/Appearance Date and Time:</h2>
                            <input
                                className="returndate"
                                type = "date"
                                value={hearingDate}
                                min={min}
                                max={max}
                                onChange={(e) => setHearingDate(e.target.value)}
                            />
                            <input
                                className="returndate"
                                type = "time"
                                value={hearingTime}
                                min= "14:00"
                                max= "17:00"
                                onChange={saveTime}
                            />
                            {timeError && (
                                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                    {timeError}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="cont">
                        <h2 className = "h2-resolve-headers">Generate Summon Letter:</h2>
                        <button className="fileaction" onClick={downloadSummon}>Generate Official Summon Letter</button>
                    </div>

                <div className = "resolve-footer">
                    <button className = "b1-resolve" onClick={handleCancel}>Cancel</button>
                    <button className = "b2-resolve" onClick={handleSave}>Assign the task</button>
                </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Assign