import './Complaint.css'
import HeaderLog from './HeaderLog.jsx'
import SearchLogo from './assets/searchlogo.png'
import Convo from './assets/conversation.png'
import Profile from './assets/profile.png'
import Tel from './assets/telephone.png'
import Warning from './assets/warning.png'
import Calendar from './assets/calendar.png'

function Complaint(){
    return(
        <>
        <div className="complaint-page">
        <div className="create-complaints">
            <div className="heading">
                <h1>Complaints</h1>
            </div>

            <div className="button">
                <button><b>+ &nbsp;File Complaint</b></button>
            </div>
        </div>
    
        <div className="search_status">
            <div className="searchFunction">
                <img src={SearchLogo} alt="searchlogo" />
                <input type="text" placeholder="Search by name or ID..." />
            </div>

            <div className="Status">
                <select>
                    <option value="" disabled selected>All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Resolved</option>
                    <option value="denied">Dismissed</option>
                </select>
            </div>
        </div>

        <div className="list-certificate">
            <div className="cert1">
                <div className="name_status">
                    <div className="name_label">
                        <div className="complaint-title">
                        <img className="complainticon" src={Convo} alt="Complaint icon"></img>
                        <h1>C001</h1>
                        </div>
                        <span className="status-label ready">Pending</span>
                        <span className="status-label priority">Medium</span>
                    </div>
                    <div className="cert1Button">
                    <button className="statbutton">Create Notice</button>
                    <button className="statbutton">Resolve</button>
                    </div>
                </div>

                <h2>Loud Music Disturbance</h2>


                <div className="FirstRow">
                    <div className="cont">
                    <img className="RowIcon" src={Profile} alt="Profile icon"></img>
                    <p className="p1"><b>Jose Martinez</b></p>
                    </div>
                    <div className="cont">
                    <img className="RowIcon" src={Tel} alt="Telephone icon"></img>
                    <p className="p2">09123456789</p>
                    </div>
                    <p className="p3">Blk 4 Lot 20, Barangay Sample</p>
                    <div className="cont">
                        <img className="RowIcon" src={Warning}></img>
                        <p>Noise</p>
                    </div>
                </div>

                <div className="SecondRow">
                    <p className="p4">Neighbor playing loud music until late hours disturbing the peace</p>
                    <div className="cont">
                        <img className="RowIcon" src={Calendar} alt="Calendar Icon"></img>
                        <p>Submitted: 2024-01-15</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
export default Complaint