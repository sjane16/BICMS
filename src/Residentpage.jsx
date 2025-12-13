import './Residentpage.css'
import Search from './assets/searchlogo.png'
import {useState, useEffect} from "react";
import Addresident from './Addresident.jsx';
import Editinfo from './Editinfo.jsx';
import Deleteinfo from './Deleteinfo.jsx';
import Edit from './assets/pencil.png';
import Delete from './assets/delete.png';

function Residentpage(){
    const [isOverlayOpen, setIsOverlayOpen] = useState (false);
    const [residents, setResidents] = useState([]);
    const [search, setSearch] = useState("");
    const [editResident, setEditResident] = useState(null);
    const [deleteResident, setDeleteResident] = useState(null);

    const fetchResidents = () =>{
        fetch("http://localhost/bicms_backend/resident_table.php")
        .then(res => res.json())
        .then(data => setResidents(data));
    }

    useEffect(() => {
        fetchResidents();
    }, []);

    const filterRes = residents.filter(resident =>{
        return(
        resident.resident_ID.includes(search) ||
        resident.first_name.toLowerCase().includes(search.toLowerCase()) ||
        resident.last_name.toLowerCase().includes(search.toLowerCase())
        );
    });


    
    return(
    <>
    <div className="resident-page">
        <div className="resident-title">
            <h1>Residents</h1>
            <div className="resident-search">
                <div className="resident-searchFunction">
                 <img className="resident-searchicon" src={Search} alt="searchlogo" />
                <input type="text" 
                placeholder="Search by name or ID..."
                value = {search}
                onChange = {(e) => setSearch(e.target.value)}
                />
                </div>
            </div>
        </div>
        <button onClick = {() => setIsOverlayOpen(true)} className="resident-add">+ Add Resident</button>


        <div className = "table-design">
        <table>
            <thead>
                <tr>
                    <th>Resident ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Gender</th>
                    <th>Birthday</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Civil Status</th>
                    <th>Contact</th>
                    <th>Occupation</th>
                    <th>Remarks</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filterRes.map((resident, index) => (
                <tr key={index}>
                    <td>{resident.resident_ID}</td>
                    <td>{resident.last_name}</td>
                    <td>{resident.first_name}</td>
                    <td>{resident.middle_name}</td>
                    <td>{resident.gender}</td>
                    <td>{resident.dob}</td>
                    <td>{resident.age}</td>
                    <td>{resident.address}</td>
                    <td>{resident.civil_status}</td>
                    <td>{resident.contact}</td>
                    <td>{resident.occupation}</td>
                    <td>{resident.remarks}</td>
                    <td>
                        <div className="editdelete-cont">
                        <button className="ed-b">
                            <img 
                            src={Edit} 
                            className="editdelete" 
                            alt="edit icon"
                            onClick = {() => setEditResident(resident)}
                            />
                        </button> 
                        <button className="ed-b">
                            <img 
                            src={Delete} 
                            className="editdelete" 
                            alt="delete icon"
                            onClick = {() => setDeleteResident(resident)}
                            />
                        </button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>

            {isOverlayOpen && (
            <Addresident
                onClose = {() => setIsOverlayOpen (false)}
                refreshList = {fetchResidents}
                    />
                )}

            {editResident && (
                <Editinfo
                    resident = {editResident}
                    onClose = {() => setEditResident(null)}
                    refreshList = {fetchResidents}
                />
            )}

            {deleteResident && (
                <Deleteinfo 
                resident = {deleteResident}
                onClose = {() => setDeleteResident(null)}
                refreshList = {(fetchResidents)}
                />
            )}
    </>
    )
}
export default Residentpage