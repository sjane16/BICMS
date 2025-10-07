import logo from './assets/BICMS_logo.png'

function Footer(){
    return(
        <div className="mainf">
            <div className="footer">
                <img className="logo" src={logo} alt="BICMS logo"></img>
                <p><b>Barangay Issuance and Complaint Management System</b></p>
            </div>
            <p className="desc">Building smarter communities through digital solutions</p>
            <div className="space"></div>
        </div>
    );
}
export default Footer