import React, { useState } from 'react';
import RequestCert from './RequestCert';
import './Certificates.css';
import SearchLogo from './assets/searchlogo.png'

function Certificates() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  
  const [certificates, setCertificates] = useState([]);

  const handleCreateCertificate = (newCertData) => {
    const newCert = {
      id: `CERT${String(certificates.length + 1).padStart(3, '0')}`,
      ...newCertData
    };

    setCertificates([...certificates, newCert]);
    setIsOverlayOpen(false); 
  };

  const handleMarkClaimed = (id) => {
    setCertificates(
      certificates.map(cert =>
        cert.id === id ? { ...cert, status: 'Claimed' } : cert
      )
    );
  };

  return (
    <>
      <div className="create-certificate">
        <div className="heading">
          <h1>Certificates</h1>
        </div>

        <div className="button">
          <button onClick={() => setIsOverlayOpen(true)}>
            <b>+ &nbsp;Create Certificate</b>
          </button>
        </div>
      </div>

      <div className="search_status">
        <div className="searchFunction">
          <img src={SearchLogo} alt="searchlogo" />
          <input type="text" placeholder="Search by name or ID..." />
        </div>

        <div className="Status">
          <select>
            <option value="" disabled>Status</option>
            <option value="pending">Pending</option>
            <option value="ready">Ready</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>
      </div>

      {/* Overlay Form */}
      {isOverlayOpen && (
        <RequestCert 
          onClose={() => setIsOverlayOpen(false)}
          onSubmit={handleCreateCertificate}
        />
      )}

      {/* Certificates List */}
      <div className="list-certificate">
        {certificates.map(cert => (
          <div className="cert1" key={cert.id}>
            <div className="name_status">
              <div className="name_label">
                <img src="cert_icon.png" alt="cert_icon" />
                <h1>{cert.id}</h1>
                <span className={`status-label ${cert.status.toLowerCase()}`}>{cert.status}</span>
              </div>
              {cert.status !== 'Claimed' && (
                <button onClick={() => handleMarkClaimed(cert.id)}>✓ Mark Ready</button>
              )}
            </div>
            <h2>{cert.type}</h2>

            <div className="FirstRow">
              <div className="FirstRow1">
                <img src="blkuser_icon.png" alt="blkuser_icon" />
                <p className="p1">{cert.name}</p>
              </div>

              <div className="FirstRow2">
                <img src="phone_icon.png" alt="phone_icon" />
                <p className="p2">{cert.contact}</p>
              </div>
              <p className="p3">{cert.address}</p>
            </div>

            <div className="SecondRow">
              <div className="SecondRow1">
                <p className="p4">
                  <strong>Purpose</strong> : {cert.purpose}
                </p>
              </div>
              <div className="SecondRow2">
                <img src="date_icon.png" alt="date_icon" />
                <p className="p5">Requested: {cert.requested}</p>
              </div>
              {cert.issued && (
                <div className="SecondRow3">
                  <img src="date_icon.png" alt="date_icon" />
                  <p className="p6">Issued: {cert.issued}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Certificates;
