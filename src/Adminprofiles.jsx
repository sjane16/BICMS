import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import './Adminprofiles.css';
import HeaderLog from "./HeaderLog";


function Adminprofile({onClose}) {
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        contactNo: "",
        email: ""
    });
    const navigate = useNavigate();
    const [password, setPassword] = useState("");


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            setProfileImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };


    const handleRemoveImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };

    const handleSaveChanges = () => {
        const API_URL = import.meta.env.VITE_API_URL;

        if(profileImage){
            const uploadImage = new FormData();
            uploadImage.append("profileImage", profileImage);

            fetch(`${API_URL}/updateprofilepic.php`, {
                method: "POST",
                credentials: "include",
                body: uploadImage
            })
            .then(res => res.json())
            .then(data =>{
                console.log("Image uploaded", data.filename);
                localStorage.setItem("profileRefresh", Date.now());
            });
        }

        fetch(`${API_URL}/updateprofile.php`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            body: JSON.stringify({
                firstname: formData.firstname,
                middlename: formData.middlename,
                lastname: formData.lastname,
                contactNo: formData.contactNo,
                email: formData.email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message)

            if(data.success){
                 navigate("/dashboard"); 
            }
        })
    };

     const handleCancel = () => {
        navigate("/dashboard")
    }

     useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/getprofile.php`, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "Access denied. User needs to log-in"){
                console.warn("User not logged in")
            }else{
                setFormData({
                    firstname: data[0].firstname,
                    lastname: data[0].lastname,
                    middlename: data[0].middlename,
                    password: "",
                    contactNo: data[0].contact,
                    email: data[0].email 
                })
            }
        })
        .catch(err => console.error("Fetch error:", err));
    }, [])

    return (
        <>
        <HeaderLog/>
        <div className="admin-page-container">
            <div className="admin-page-header">
                <h1 className="admin-label">Admin Page</h1>
                <p className="admin-subtitle">Manage your profile and system settings</p>
            </div>
            <hr className="admin-divider"></hr>

            <div className="admin-content-wrapper">
                <div className="admin-profile">
                    <h1 className="admin-section-title">Profile Picture</h1>
                    <div className="profile-picture-container">
                        <div className="image-preview">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="profile-img" />
                            ) : (
                                <div className="placeholder-avatar">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="user-icon"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        <div className="upload-buttons">
                            <input 
                                type="file" 
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profile-upload" className="upload-btn">
                                {imagePreview ? 'Change Photo' : 'Upload Photo'}
                            </label>
                            
                            {imagePreview && (
                                <button onClick={handleRemoveImage} className="remove-btn">
                                    Remove Photo
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="admin-personal-info">
                    <h1 className="admin-section-title">Personal Information</h1>
                    <div className="admin-info-container">
                        <div className="admin-info-field">
                            <label><b>First Name:</b></label>
                            <input 
                                type="text" 
                                name="firstname"
                                value={formData.firstname}
                                onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                                className="admin-input-field"
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="admin-info-field">
                            <label><b>Middle Name:</b></label>
                            <input 
                                type="text" 
                                name="middlename"
                                value={formData.middlename}
                                onChange={(e) => setFormData({...formData, middlename: e.target.value})}
                                className="admin-input-field"
                                placeholder="Enter middle name"
                            />
                        </div>

                        <div className="admin-info-field">
                            <label><b>Last Name:</b></label>
                            <input 
                                type="text" 
                                name="lastname"
                                value={formData.lastname}
                                onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                                className="admin-input-field"
                                placeholder="Enter last name"
                            />
                        </div>

                        <div className="admin-info-field">
                            <label><b>Password:</b></label>
                            <input 
                                type="password" 
                                name="password"
                                value={password}
                                onChange = {(e) => setPassword(e.target.value)}
                                className="admin-input-field"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="admin-info-field">
                            <label><b>Contact No.:</b></label>
                            <input 
                                type="tel" 
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={(e) => setFormData({...formData, contactNo: e.target.value})}
                                className="admin-input-field"
                                placeholder="Enter contact number"
                            />
                        </div>

                        <div className="admin-info-field">
                            <label><b>Email:</b></label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="admin-input-field"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <button className="save-btn" onClick={handleCancel}>Cancel</button>
                        <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
        </>
    );
}


export default Adminprofile;
