import './Residentpage.css'
import Search from './assets/searchlogo.png'
import {useState} from "react";
import Addresident from './Addresident.jsx';

function Residentpage(){
    const [isOverlayOpen, setIsOverlayOpen] = useState (false);

    
    return(
    <>
    <div className="resident-page">
        <div className="resident-title">
            <h1>Residents</h1>
            <div className="resident-search">
                <div className="resident-searchFunction">
                 <img className="resident-searchicon" src={Search} alt="searchlogo" />
                <input type="text" placeholder="Search by name or ID..." />
                </div>
            </div>
        </div>
        <button onClick = {() => setIsOverlayOpen(true)} className="resident-add">+ Add Resident</button>



        <table>
            <thead>
                <tr>
                    <th>Resident ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Initial</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Civil Status</th>
                    <th>Contact</th>
                    <th>Occupation</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>001</td>
                    <td>Dela Cruz</td>
                    <td>Angelica</td>
                    <td>C</td>
                    <td>F</td>
                    <td>20</td>
                    <td>123 San Mateo</td>
                    <td>Single</td>
                    <td>0912345678</td>
                    <td>Actress</td>
                    <td>Active</td>
                </tr>
            </tbody>
        </table>
    </div>

            {isOverlayOpen && (
            <Addresident
                onClose = {() => setIsOverlayOpen (false)}
                    />
                )}
    </>
    )
}
export default Residentpage