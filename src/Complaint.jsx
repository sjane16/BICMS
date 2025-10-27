import './Complaint.css'
import HeaderLog from './HeaderLog.jsx'
import SearchLogo from './assets/searchlogo.png'
import Convo from './assets/conversation.png'
import Profile from './assets/profile.png'
import Tel from './assets/telephone.png'
import Warning from './assets/warning.png'
import Calendar from './assets/calendar.png'
import React, { useState } from 'react';
import Filecomplaint from './Filecomplaint.jsx'

function Complaint(){
    const [isOverlayOpen, setIsOverlayOpen] = useState (false);


    return(
        <>
        <div className="complaint-page">
        <div className="complaints-create-complaints">
            <div className="complaints-heading">
                <h1>Complaints</h1>
            </div>

            <div className="complaints-button">
                <button onClick = {() => setIsOverlayOpen(true)}><b>+ &nbsp;File Complaint</b></button>
            </div>
        </div>
    
        <div className="complaints-search_status">
            <div className="complaints-searchFunction">
                <img src={SearchLogo} alt="searchlogo" />
                <input type="text" placeholder="Search by name or ID..." />
            </div>

            <div className="complaints-Status">
                <select>
                    <option value="" disabled selected>All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Resolved</option>
                    <option value="denied">Dismissed</option>
                </select>
            </div>
        </div>

        {isOverlayOpen && (
            <Filecomplaint
                onClose = {() => setIsOverlayOpen (false)}
                    />
                )}
                    
        <div className="complaints-list-certificate">
            <div className="complaints-cert1">
                <div className="complaints-name_status">
                    <div className="complaints-name_label">
                        <div className="complaints-complaint-title">
                        <img className="complaints-complainticon" src={Convo} alt="Complaint icon"></img>
                        <h1>C001</h1>
                        </div>
                        <span className="complaints-status-label ready">Pending</span>
                        <span className="complaints-status-label priority">Medium</span>
                    </div>
                    <div className="complaints-cert1Button">
                    <button className="complaints-statbutton">Create Notice</button>
                    <button className="complaints-statbutton">Resolve</button>
                    </div>
                </div>

                <h2>Loud Music Disturbance</h2>


                <div className="complaints-FirstRow">
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Profile} alt="Profile icon"></img>
                    <p className="complaints-p1"><b>Jose Martinez</b></p>
                    </div>
                    <div className="complaints-cont">
                    <img className="complaints-RowIcon" src={Tel} alt="Telephone icon"></img>
                    <p className="complaints-p2">09123456789</p>
                    </div>
                    <p className="complaints-p3">Blk 4 Lot 20, Barangay Sample</p>
                    <div className="complaints-cont">
                        <img className="complaints-RowIcon" src={Warning}></img>
                        <p>Noise</p>
                    </div>
                </div>

                <div className="complaints-SecondRow">
                    <p className="complaints-p4">Neighbor playing loud music until late hours disturbing the peace</p>
                    <div className="complaints-cont">
                        <img className="complaints-RowIcon" src={Calendar} alt="Calendar Icon"></img>
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