import React from "react";
import './Logout.css'
import {useNavigate} from "react-router-dom";

function Deleteinfo ({onClose, resident, refreshList}) {

    const handleCancel = () => {
        onClose();
    };

    const handleConfirm = async(e) => {
            const API_URL = import.meta.env.VITE_API_URL;
        e.preventDefault();

        try{
            const res = await fetch(`${API_URL}/deleteres_info.php`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    resident_ID: parseInt(resident.resident_ID)
                }),
            })

            const data = await res.json();
            alert(data.message);

            if(data.success){
                onClose();
                refreshList();
            }
        }catch(err){
            console.error(err);
            alert("Fail to delete resident");
        }
    }
    
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="h2-logout">Delete Resident</h2>
                </div>
                <div className="modal-body">
                    <p className="p-logout">
                        Are you sure you want to delete {`${resident.first_name} ${resident.last_name}`} from the system?
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="btn btn-logout" onClick={handleConfirm}>Confirm Delete</button>
                </div>
            </div> 
        </div>
    );
}

export default Deleteinfo;
