import logo from './assets/BICMS_logo.png'
import './Footer.css'

function Footer(){
    return(
        <div className="mainf">
            <div className="footer">
                <img className="logo" src={logo} alt="BICMS logo"></img>
                <p className="footer-title"><b>Barangay Issuance and Complaint Management System</b></p>
            </div>
            <p className="desc">Building smarter communities through digital solutions</p>
            <div className="space"></div>
        </div>
    );
}
export default Footer