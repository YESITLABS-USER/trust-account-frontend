import React, { useState } from 'react'
import Sidebar from '../../../components/header/SideBar';
import { useAuth } from '../../../contexts/AuthContext';

const MyProfile = () => {
    const { isSidebarOpen, isLogedinData, user } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        oldPassword: "",
        newPassword: "",
        fullName: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
    });

    console.log(user)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        alert("Your profile has been updated successfully!");
    };

    const handleDelete = () => {
        console.log("Delete Account");
        alert(
            "Are you sure you want to delete your account? This action cannot be undone."
        )
    }


    return (
        <>
           
            <div className={`dashboard-body-wrp show ${isSidebarOpen ? " active" : ""}`}>
                <div className="dashboard-body">
                    <div className="ds-bdy-head max">
                        <h1>My Profile</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="my-profile-form-in">
                            <div className="col-lg-12">
                                <div className="first-section">
                                    <h4>Personal Detail</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Name</h3>
                                                <input type="text" name="name" placeholder="Enter Name" value={isLogedinData ? isLogedinData.name : formData.name} onChange={handleChange} />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Email</h3>
                                                <input type="text" name="email" placeholder="Enter Email" value={isLogedinData ? isLogedinData.email : formData.email} onChange={handleChange} />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Phone Number</h3>
                                                <input type="text" name="phone" placeholder="Enter Phone Number" value={isLogedinData ? isLogedinData.phone : formData.phone} onChange={handleChange} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="second-section">
                                    <h4>Change Password</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Old Password
                                                </h3>
                                                <input type="text" name='oldPassword' value={formData.oldPassword} onChange={handleChange} placeholder="Enter Old Password" />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>New Password
                                                </h3>
                                                <input type="text" name='newPassword' value={formData.newPassword} onChange={handleChange} placeholder="Enter New Password " />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="third-section">
                                    <h4>My Bank Details</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Full Name</h3>
                                                <input type="text" name="fullName" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Bank Name</h3>
                                                <input type="text" name="bankName" placeholder="Enter Bank Name" value={formData.bankName} onChange={handleChange} />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Account Number</h3>
                                                <input type="text" name="accountNumber" placeholder="Enter Account Number" value={formData.accountNumber} onChange={handleChange} />
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>
                                                <h3>Routing Number</h3>
                                                <input type="text" name="routingNumber" placeholder="Enter Routing Number" value={formData.routingNumber} onChange={handleChange} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bank-charges-btns" onClick={handleSubmit}>
                                <a type="submit" >Save Changes</a>
                            </div>
                        </div>
                    </form>
                    <div className="delete-acount-wrap" onClick={handleDelete}>
                        <a href="#">Delete Account</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile
