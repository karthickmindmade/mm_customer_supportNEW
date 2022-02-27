import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { use } from 'echarts';
import UserDashboardLayout from '../common/customerNavbar';
export default function CustomerProfile(props) {
    const [customername,setcustomername] =useState("");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setcustomername(window.localStorage.getItem('clientname'));
      });
    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
            .then((res) => setUsers(res.data))
            .catch((err)=>{ return err; })
    }, [setUsers,customername]);
console.log(customername)
    return (
        <UserDashboardLayout>
             <div className="profile-body">
                {users.map((users) =>
                    <div className="row gutters-sm" key={users.usersId}>
                        <div className="col-md-4 mb-3">
                            <div className="profile-card">
                                <div className="profile-card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://mindmadetech.in/public/images/file-1642586098635.png" alt="Admin" className="rounded-circle" width="150" height="150" />
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="mb-0 profile-label">
                                                    UserName
                                                </h6>
                                            </div>
                                            :
                                            <div className="col text-secondary">
                                                {users.Username}
                                            </div>
                                        </div>
                                        <h4 className="profile-label"></h4>
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="mb-0 profile-label">Project code</h6>
                                            </div>:
                                            <div className="col text-secondary">
                                                MMM000001
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="profile-card mb-3">
                                <div className="profile-card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0 profile-label">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {users.Username}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0 profile-label">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {users.Email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0 profile-label">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {users.Phonenumber}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0 profile-label">Companyname</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {users.Companyname}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0 profile-label">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserDashboardLayout>
           
       
    )
}