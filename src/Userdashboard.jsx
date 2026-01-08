import { useState, useEffect } from "react";
import Filecomplaint from "./Filecomplaint.jsx";
import RequestCert from "./RequestCert.jsx";
import "./Userdashboard.css";
import HeaderLog from './HeaderLog.jsx';
import Calendar from './assets/calendar.png';
import complaint from './assets/complaint_.png';
import certificate from './assets/certificate_.png';
import resident from './assets/resident.png';

function Userdashboard() {
  
  const [showFileComplaintModal, setShowFileComplaintModal] = useState(false);
  const [showRequestCertModal, setShowRequestCertModal] = useState(false);
  const [residentInfo, setResidentInfo] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [certificates, setCertificates] = useState([]);

  
  const handleOpenFileComplaint = () => setShowFileComplaintModal(true);
  const handleCloseFileComplaint = () => setShowFileComplaintModal(false);

  
  const handleOpenRequestCert = () => setShowRequestCertModal(true);
  const handleCloseRequestCert = () => setShowRequestCertModal(false);

  useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/userdashboard.php`, {
      method: "GET",
      credentials: "include",
    })
    .then(res => res.json())
    .then(data => {
      if(data.message === "Access Denied. User needs to log-in"){
        console.warn("User not logged in");
      }else{
        setResidentInfo(data);
      }
    })
    .catch(err => console.error("Fetch error:", err));
  }, []);

  const fetchComplaints = () => {
        const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/userdashboardcomp.php`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setComplaints(data));
  }

  useEffect(() =>{
    fetchComplaints()
  }, []);

  const fetchCertificates = () => {
        const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/userdashboardcert.php`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setCertificates(data));
  }

  useEffect(() =>{
    fetchCertificates()
  }, []);

  return (
    <>
      <HeaderLog />
      <div className="user-dashboard">
        {/* Resident Info Section */}
        <div className="user-resident-info">
          <div className="user-header">
            <img src={resident} alt="Resident Icon" />
            <h2 className="user-dashboard-title">Resident Information</h2>
          </div>
          <div className="user-personal-info">
            {residentInfo.length > 0 ? (
              <>
                <p className="user-info-item"><b>Name:</b> {residentInfo[0].firstname + " " + residentInfo[0].last_name}</p>
                <p className="user-info-item"><b>Address:</b> {residentInfo[0].address}</p>
                <p className="user-info-item"><b>Contact No.:</b> {residentInfo[0].contact}</p>
                <p className="user-info-item"><b>Date of Birth:</b> {residentInfo[0].dob}</p>
                <p className="user-info-item"><b>Sex:</b> {residentInfo[0].gender}</p>
                <p className="user-info-item"><b>Civil Status:</b> {residentInfo[0].civil_status}</p>
                <p className="user-info-item"><b>Occupation:</b> {residentInfo[0].occupation}</p>
                <p className="user-info-item"><b>Status:</b> {residentInfo[0].remarks}</p>
              </>
            ) : (
              <p>Loading resident information...</p>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="user-cards-container">
          {/* Complaint Section */}
          <div className="user-card">
            <div className="recent-comp">
              <img src={complaint} alt="Complaint Icon" />
              <h1 className="user-card-title">Recent Complaints</h1>
            </div>
            <p className="user-card-desc">Last Complaint Submitted</p>

            {complaints.length > 0 ? (
              complaints.map((comp, index) => (
                <div key={index} className="user-card-content">
                  <div className = "comps">
                  <p className="user-card-item-title">{comp.subject}</p>
                  <div className="user-card-date">
                    <img className="user-card-icon" src={Calendar} alt="date_icon" />
                    <p className="user-card-date-text">{comp.date}</p>
                  </div>
                  <p className = "user-comp-status">{comp.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No complaints yet</p>
            )}

            <button className="user-card-button" onClick={handleOpenFileComplaint}>
              File A Complaint
            </button>
          </div>

          {/* Certificate Section */}
          <div className="user-card">
            <div className="recent-comp">
              <img src={certificate} alt="Certificate Icon" />
              <h1 className="user-card-title">Recent Certificates</h1>
            </div>
            <p className="user-card-desc">Latest certificate requests and issuances</p>

            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <div key={index} className="user-card-content">
                  <p className="user-card-item-title">{cert.type}</p>
                  <div className="user-card-date">
                    <img className="user-card-icon" src={Calendar} alt="date_icon" />
                    <p className="user-card-date-text">{cert.certdate}</p>
                  </div>
                  <p className = "user-comp-status">{cert.status}</p>
                </div>
              ))
            ) : (
              <p>No certificates yet</p>
            )}

            <button className="user-card-button" onClick={handleOpenRequestCert}>
              Request Certificate
            </button>
          </div>
        </div>

        {/* Modals */}
        {showFileComplaintModal && (
          <Filecomplaint 
            onClose={handleCloseFileComplaint}
            refreshList={fetchComplaints}
          />
        )}

        {showRequestCertModal && (
          <RequestCert 
            onClose={handleCloseRequestCert}
            refreshList={fetchCertificates}
          />
        )}
      </div>
    </>
  );
}

export default Userdashboard;
