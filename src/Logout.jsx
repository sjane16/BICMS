import React from "react";
import './Logout.css'
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';
import LogIcon from './assets/logout-icon.png';

function Logout ({onClose}) {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            const response = await fetch("http://localhost/bicms_backend/logout.php", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            if(result.success){
                localStorage.clear();
                navigate("/");
            }else{
                alert("Logout failed: " + result.message);
            }
        }catch(error){
            console.error("Logout error: " , error);
        }
    };

   return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src={LogIcon} className="LogIcon" alt="Logout icon" />
          <h2 className="h2-logout">Confirm Logout</h2>
        </div>
        <div className="modal-body">
          <p className="p-logout">Are you sure you want to log out?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <Link to ="/">
          <button className="btn btn-logout">
            Log Out
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
