import React, { useState, useEffect } from 'react';
import Imageviewer from '../common/imageviewer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from "axios";
import FormDialog from '../common/dialogsform';
import { Button } from '@mui/material';

function Non_userTickets(props) {

    const { registerId, closeDetails} = props;
    const [nonUserDetails, setNonUserDetails] = useState([]);
    const [Adminname, setAdminname] = useState([]);
    const [Createdby, setCreatedby] = useState();

    useEffect(() => {
        setAdminname(window.localStorage.getItem('user'));
    }, []);

    useEffect(() => {
        setCreatedby(Adminname.slice(3, 20));
    });

    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var fullDate, TimeType, hour, minutes, seconds, fullTime;
    fullDate = new Date();
    hour = fullDate.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = fullDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = fullDate.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/unregisteredcustomer/list/${registerId}`)
            .then((res) => setNonUserDetails(res.data))
            .catch((err)=>{ return err;})
    }, [setNonUserDetails]);

    function handleRejection(Id){
        Axios.put(`https://mindmadetech.in/api/unregisteredcustomer/statusupdate/${Id}`,{
            Status : "Rejected",
            Adm_UpdatedOn : date + ' ' + fullTime,
            Adm_UpdatedBy : Createdby
        });
    }

    function handleApproval(nonuser){
        console.log(nonuser.DomainName,nonuser.Description,nonuser.CreatedOn)
        const data = new FormData();
            data.append("Companyname", nonuser.Companyname);
            data.append("Clientname",  nonuser.Clientname);
            data.append("Email",  nonuser.Email);
            data.append("Phonenumber",  nonuser.Phonenumber);
            data.append("Username",  nonuser.Username);
            data.append("Password",  nonuser.Password);
            data.append("Logo",  nonuser.Logo);
            data.append("Createdon", date+ ' ' + fullTime);
            data.append("Createdby",  Createdby)
            Axios.post(`https://mindmadetech.in/api/customer/new`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.data.statusCode === 400) {
                    return null;
                } else {
                    return response;
                }
            }).catch((err)=>{ return err; });

            const formData = new FormData();
            formData.append("Username", nonuser.Username);
            formData.append("Email", nonuser.Email);
            formData.append("Phonenumber", nonuser.Phonenumber);
            formData.append("DomainName", nonuser.DomainName);
            formData.append("Cus_CreatedOn", nonuser.CreatedOn);
            formData.append("Description", nonuser.Description);
            Axios.post("https://mindmadetech.in/api/tickets/new", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
            }).then((res) => {
                return res;
            }) .catch((err)=>{ return err });

            Axios.put(`https://mindmadetech.in/api/unregisteredcustomer/statusupdate/${nonuser.registerId}`,{
                Status : "Approved",
                Adm_UpdatedOn : date + ' ' + fullTime,
                Adm_UpdatedBy : Createdby
            });
             
    }
    
    return (
        <>
            {nonUserDetails.reverse().map((nonuser) =>
                <div className='ticket-details' key={nonuser.registerId}>
                    <div className='ticket-details-head'>
                        viewing Unregistered Customer Details
                        <div className='ticket-details-head-btn '>
                            <button className='btn2' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
                        <div className='ticket-details-middle-2 row'>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    ID
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.registerId}
                                </div>
                            </div>

                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Companyname
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Companyname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Clientname
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Clientname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Email Id
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Email}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='user-profile-ticket-details row'>
                    <div className='ticket-details-screenshot col'>
                                <div className='label-ticket-details'>
                                    Logo
                                </div>
                                    <Imageviewer
                                        imgdialogbutton={<img src={nonuser.Logo}  alt="screenshots" width={200} height={100} />}
                                        imgdialogbody={<img className='screeshot-img-viewer' src={nonuser.Logo} alt="screenshots" />}
                                    /> 
                        </div> 
                        <div className='user-profile-ticket-details-2 col flex'>
                            <div>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.Phonenumber}
                                </div>
                                <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.CreatedOn}
                                </div>
                            </div>
                        </div>
                       
                        <div className='user-profile-ticket-details-1 col'>
                        <div className='col'>
                                <div className='label-ticket-details'>
                                    DomainName
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.DomainName}
                                </div>
                        </div>
                            <div className='label-ticket-details'>
                                Description
                            </div>
                            <div className='ticket-input-details' >
                                {nonuser.Description}
                            </div>
                            <FormDialog
                                className="team-delete"
                                dialogtitle={"Reject"}
                                headtitle={<div className='head-dialog'>Are you sure to reject the unregsitered client?</div>}
                                dialogactions={
                                    <div>
                                        <Button onClick={()=>handleRejection(nonuser.registerId)}>YES</Button>
                                        <Button  >NO</Button>
                                    </div>
                                }
                            />
                            <FormDialog
                                className="team-delete"
                                dialogtitle={"Approve"}
                                headtitle={<div className='head-dialog'>Are you sure to Approve the unregsitered client?</div>}
                                dialogactions={
                                    <div>
                                        <Button onClick={()=>handleApproval(nonuser)}>YES</Button>
                                        <Button  >NO</Button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Non_userTickets;