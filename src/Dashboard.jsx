import HeaderLog from './HeaderLog'
import './Dashboard.css'
import Dash from './assets/dashboard.png'
import Cert from './assets/certf.png'
import Convo from './assets/conv.png'
import Report from './assets/report.png'
import Residents from './assets/team.png'

function Dashboard(){
    return(
        <>
        <HeaderLog />
        <div className="Sidebar">
            <div className="button">
            <div className="b">
                <button className="dbutton">
                    <img className="dicon" src={Dash}></img>
                    Dashboard
                </button>
            </div>
            <div className="b">
                <button className="dbutton">
                <img className="dicon" src={Cert}></img>
                    Certificates
                </button>
            </div>
            <div className="b">
            <button className="dbutton">
            <img className="dicon" src={Convo}></img>
                Complaints
            </button>
            </div>
            <div className="b">
                <button className="dbutton">
                <img className="dicon" src={Residents}></img>
                Residents
                </button>
            </div>
            <div className="b">
                <button className="dbutton">
                <img className="dicon" src={Report}></img>
                Reports
                </button>
            </div>
            </div>
        </div>
        </>
    );
}
export default Dashboard;