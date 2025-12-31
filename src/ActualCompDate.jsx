import assignIcon from './assets/assign.png';
import './Resolve_.css';
import {useState} from 'react';

function ActualCompDate ({actualdate, onClose, refreshList}) {
   
    const [actualCompDate, setActualCompDate] = useState("");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart("2", 0);
    const date = String(today.getDate()).padStart("2", 0);
    const maxActual = `${year}-${month}-${date}`;

    const handleCancel = () => {
        onClose();
    };

    const handleSave = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost/bicms_backend/actualcompdate.php",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    actualCompDate: actualCompDate,
                    complaintId: actualdate.id,
                    agreementStatus: "complied",
                    complaintStatus: "resolved"
                })
            });

            const data = await res.json();
            alert(data.message);

            if(data.message){
                setActualCompDate("");
                refreshList();
                onClose();
            }
        }catch(err){
            console.error(err);
            alert("Fail to save Actual Compliance Date")
        }
    }

    
    return (
        <div className =  "resolve-page">    
            <div className ="resolve-container">
                <div className = "resolve-header">
                    <div className = "first-row-header-assign">    
                        <img src = {assignIcon} className='Assign'/>
                        <h1 className  = "h1-resolve-header"> Actual Date of Compliance</h1>
                    </div>
                </div>

                <div className = "resolve-body-comp">
                    <h2 className = "h2-resolve-header">Select the Actual Date of Compliance:</h2>
                    <input
                    className="actualcompliance" 
                    type="date"
                    value={actualCompDate}
                    min={actualdate.resolution_date}
                    max={maxActual}
                    onChange={(e) => setActualCompDate(e.target.value)}
                    />
                </div>

                <div className = "resolve-footer">
                    <button className = "b1-resolve" onClick={handleCancel}>Cancel</button>
                    <button className = "b2-resolve" onClick={(e) => handleSave(e)}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ActualCompDate