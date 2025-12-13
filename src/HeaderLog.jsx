import logo from './assets/BICMS_logo.png';
import Logout from './Logout.jsx';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function HeaderLog(){
    const name = localStorage.getItem('fullname') || 'Guest';
    const role = localStorage.getItem('role' || ' ').trim().toLowerCase();
    const [isOverlayOpen, setIsOverlayOpen] = useState (false);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);

    const handleSettings = () => {
        if(role === "admin"){
            navigate("/adminprofile");
        }else if(role === "user"){
            navigate("/residentprofile")
        }
    }

    useEffect(() => {
      fetch("http://localhost/bicms_backend/reflectpic.php", {
        method: "GET",
        credentials: "include"
      })
      .then(res => res.json())
      .then(data =>{
        const imagePath = `http://localhost/bicms_backend/profile_pic/${data.profile_picture}`;
        setProfileImage(imagePath);
      })
      .catch(err => console.error("Fetch Error:", err))
    }, [localStorage.getItem("profileRefresh")]);

    return(
        <>
            <div className="header">
                <div className="hleft">
                    <img className="logo" src={logo} alt="BICMS logo"></img>
                    <p className="title"><b>Barangay Issuance and Complaint Management System</b></p>
                </div>
                <div className="b">
                    {/* <h1 className="login">
                        &nbsp; Juan Cruz
                    </h1> */}
                    <button className="login" onClick = {handleSettings}>
                            <div className="profile-wrap">
                         <img className ="profilepic" src={profileImage} alt="profile picture"/>
                            &nbsp; 
                            <h2 className = "h2-profile-wrap">&nbsp; {name}</h2>
                           </div>
                    </button>
                    
                    <button
                        className="buttonlog"
                        onClick={() => setIsOverlayOpen(true)}
                    >
                        <b>➜]           Log-out</b>
                    </button>
                </div>
            </div>
            {isOverlayOpen && (
                <Logout onClose={() => setIsOverlayOpen(false)} />
            )}
        </>
    );
}
export default HeaderLog;
