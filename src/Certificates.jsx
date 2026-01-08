import React, { useState, useEffect } from 'react';
import './Certificates.css';
import SearchLogo from './assets/searchlogo.png'
import Cert from './assets/certf.png';
import Profile from './assets/profile.png';
import Tel from './assets/telephone.png';
import Calendar from './assets/calendar.png';
import Location from './assets/location.png';
import Purpose from './assets/purpose.png';

function Certificates() {
  const [certificates, setCert] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");


    useEffect(() => {
       const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/trackcert.php`, {
            method: "POST",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setCert(data))
        .catch(err => console.error("Fetch Error:", err))
    }, []);

    const filterCert = certificates
    .filter(cert => {
      if(status === "") return cert.cert_status;
      return cert.cert_status === status;
    })
    .filter(cert =>{
        if(!search) return true;
        const formatID = `C00${cert.id}`;
        const searchLower = search.toLowerCase();
        return(
            formatID.toLowerCase().includes(searchLower) ||
            cert.fullname.toLowerCase().includes(searchLower)
        )
    });

    const updateStatus = (id, newStatus) => {
       const API_URL = import.meta.env.VITE_API_URL;
      fetch(`${API_URL}/updatestatuscert.php`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        credentials: "include",
        body: JSON.stringify({id, status: newStatus})
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          const issuedDate = newStatus === "processing" ? new Date().toLocaleDateString('en-CA') : null;
          setCert(prev =>
            prev.map(cert => 
              cert.id === id ? {
                ...cert, cert_status: newStatus, issued: issuedDate || cert.issued
              } : cert
            )
          );
        }else{
          console.error("Update failed" , data.message);
        }
      })
      .catch(err => console.error("Fetch Error:", err));
    };

    const downloadCert = async (cert) =>{
       const API_URL = import.meta.env.VITE_API_URL;
      
      try{
        const resData = {
          name: cert.fullname,
          address: cert.address,
          purpose: cert.purpose,
          issued: cert.issued,
          type: cert.type
        };

        const res = await fetch(`${API_URL}/generatecert.php`, {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(resData)
        });

        const pdf = await res.blob();
        const url = window.URL.createObjectURL(pdf);

         window.open(url, '_blank');

        const a = document.createElement("a");
        a.href = url;
        a.download = `Certificate_${cert.fullname}.pdf`;
        a.Click();
       
        window.URL.revokeObjectURL(url);

      }catch(err){
        console.error("Error generating certificate: ", err);
      }
    };

  return (
    <>
      <div className="create-certificate">
        <div className="heading">
          <h1>Certificates</h1>
        </div>
      </div>

      <div className="search_status">
        <div className="searchFunction">
          <img src={SearchLogo} alt="searchlogo" />
          <input 
          type="text" 
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="Status">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" >All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="ready">Ready</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>
      </div>

              {filterCert.map((cert,index) => {
                return(
              <div className="certificate-list" key={cert.id}>
                  <div className="cert1">
                      <div className="certificate-name_status">
                          <div className="certificate-name_label">
                              <div className="certificate-title">
                              <img className="certificate-complainticon" src={Cert} alt="Complaint icon"></img>
                              <h1>C00{cert.id}</h1>
                              </div>
                              <span className="certificate-status-label ready">{cert.cert_status}</span>
                          </div>
                          <div className="cert1Button">
                            {cert.cert_status === "pending" && (
                          <button 
                          className="certificate-statbutton"
                          onClick={async () => {
                            await updateStatus(cert.id, "processing");
                            const updatedCert = {
                              ...cert, cert_status: "processing",
                              issued: new Date().toLocaleDateString('en-CA')
                            };
                            downloadCert(updatedCert)
                          }}
                          >
                            Create
                            </button>
                          )}
                            {cert.cert_status === "processing" && (
                          <button 
                          className="certificate-statbutton"
                          onClick={() => updateStatus(cert.id, "ready")}
                          >
                            Mark Ready
                            </button>
                          )}
                          {cert.cert_status === "ready" && (
                          <button 
                          className="certificate-statbutton"
                          onClick={() => updateStatus(cert.id, "claimed")}
                          >
                            Mark Claimed
                            </button>
                          )}
                          </div>
                      </div>
      
                      <h2 className="cert-type">{cert.type}</h2>
    
                      <div className="certificate-FirstRow">
                          <div className="certificate-cont">
                          <img className="certificate-RowIcon" src={Profile} alt="Profile icon"></img>
                          <p className="certificate-p1"><b>{cert.fullname}</b></p>
                          </div>
                          <div className="certificate-cont">
                          <img className="certificate-RowIcon" src={Tel} alt="Telephone icon"></img>
                          <p className="certificate-p2">{cert.contact}</p>
                          </div>
                          <div className = "certificate-cont">
                          <img className = "certificate-RowIcon" src = {Location} />
                          <p className="certificate-p3">{cert.address}</p>
                          </div>
                      </div>
      
                      <div className="certificate-SecondRow">
                        <div className = "certificate-cont">
                          <img className = "certificate-RowIcon" src = {Purpose} />
                          <p className="certificate-p4"> <b>Purpose: </b> {cert.purpose}</p>
                        </div>
                          <div className="certificate-dates">
                          <div className="certificate-cont">
                              <img className="certificate-RowIcon" src={Calendar} alt="Calendar Icon"></img>
                              <div className = "cert-dates">
                              <p className="cert-request"><b>Requested: </b> {cert.date}</p>
                              {(cert.cert_status === "processing" || cert.cert_status === "ready" || cert.cert_status === "claimed")  && (
                                <div className="certificate-cont">
                                  <img className="certificate-RowIcon" src={Calendar} alt="Calendar Icon"></img>
                                  <p className="cert-issued"><b>Issued:</b> {cert.issued}</p>
                              
                                </div>
                              )}
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              );
            })}

    </>
  );
}

export default Certificates;
