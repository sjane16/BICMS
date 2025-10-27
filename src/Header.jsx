import {Link} from "react-router-dom"
import logo from './assets/BICMS_logo.png'

function Header(){
    return(
        <>
            <div className="header">
                <div className="hleft">
                <img className="logo" src={logo}alt="BICMS logo"></img>
                <p className="title"><b>Barangay Issuance and Complaint Management System</b></p>
                </div>
                 <div className="b">
                    <Link to="/login">
                    <button className="b1"><b>Log-in</b></button>
                    </Link>
                    <button className="b2"><b>Register</b></button>
                </div>
            </div>
        </>
    );
}
export default Header