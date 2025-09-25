import logo from './assets/BICMS_logo.png'
function HeaderLog(){
    return(
            <>
                <div className="header">
                    <img className="logo" src={logo}alt="BICMS logo"></img>
                    <p className="title"><b>Barangay Issuance and Complaint Management System</b></p>
                     <div className="b">
                        <h1 className=""></h1>
                        <button className="buttonlog"><b>➜]           Log-out</b></button>
                    </div>
                </div>
            </>
        );
}
export default HeaderLog