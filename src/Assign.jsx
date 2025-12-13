import assignIcon from './assets/assign.png';
import './Resolve_.css';
import {useState} from 'react';

function Assign ({assigned, onClose, refreshList}) {
    const [assignComp, setAssignComp] = useState("");

    const handleCancel = () => {
        onClose();
    };

    const handleSave = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost/bicms_backend/assignofficial.php",{
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
        try{
            const res = await fetch("http://localhost/bicms_backend/generatesummon.php", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    id: assigned.id,
                    complainant_name: assigned.fullname,
                    respondent_name: assigned.respondent_name,
                    subject: assigned.subject
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

                <div className = "resolve-footer">
                    <button className = "b1-resolve" onClick={handleCancel}>Cancel</button>
                    <button className = "b2-resolve" onClick={(e) => {
                        handleSave(e);
                        downloadSummon();
                    }}>Assign the task</button>
                </div>
            </div>
        </div>
    );
}

export default Assign