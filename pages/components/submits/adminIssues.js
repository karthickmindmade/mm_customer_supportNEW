import React, { useEffect, useState,useRef } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import DashboardLayout from "../common/adminNavbar";

 export default function Adminissues(props) {

    const [loader,setloader]=useState(false);
    const [show, setShow] = useState();
    const UsernameR = useRef();
    const EmailR = useRef();
    const PhonenumberR = useRef();
    const DomainnameR = useRef();
    const DescriptionR = useRef();
    const FileR = useRef();
    const [Adminname, setAdminname] = useState([]);
    const [Createdby, setCreatedby] = useState();
    const [Logo, setLogo] = useState();

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
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();

    function handleScreenshot(e) {
        setLogo(e.target.files)
    };

    function addIssues(){
       if(Logo.length > 0){
       
        const data = new FormData();
        data.append("Username", UsernameR.current.value);
        data.append("Email", EmailR.current.value);
        data.append("Phonenumber", PhonenumberR.current.value);
        data.append("DomainName", DomainnameR.current.value);
        data.append("Description", DescriptionR.current.value);
        data.append("Adm_CreatedOn", date+ ' ' + fullTime);
        data.append("Adm_CreatedBy", "admin");
        data.append("Cus_CreatedOn","null")
        for(let i=0; i<Logo.length; i++){
            data.append("files",Logo[i]);  
        }
     
        Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
        }).then((res) => {
                    setShow("Updated Successfully");
                    setloader(false);
                    UsernameR.current.value = " ";
                    EmailR.current.value = " ";
                    PhonenumberR.current.value = " ";
                    DomainnameR.current.value = " ";
                    DescriptionR.current.value = " ";
                    FileR.current.value = null;
        }).catch((err)=>{ return err; })
    
       }else{
        const data = new FormData();
        data.append("Username", UsernameR.current.value);
        data.append("Email", EmailR.current.value);
        data.append("Phonenumber", PhonenumberR.current.value);
        data.append("DomainName", DomainnameR.current.value);
        data.append("Description", DescriptionR.current.value);
        data.append("Adm_CreatedOn", date+ ' ' + fullTime);
        data.append("Adm_CreatedBy", "admin");
        data.append("Cus_CreatedOn","null")
        
        Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
        }).then((res) => {
                    setShow("Updated Successfully");
                    setloader(false);
                    UsernameR.current.value = " ";
                    EmailR.current.value = " ";
                    PhonenumberR.current.value = " ";
                    DomainnameR.current.value = " ";
                    DescriptionR.current.value = " ";
                    FileR.current.value = null;
        }).catch((err)=>{ return err; })
       }    
    }

    return (
        <DashboardLayout>
 <div className="userbody">
                <form className="form3" action="/" method="post">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                    <div className="form-group mt-2 mb-2 flex" >
                        <label className="label width-25">User Name</label>
                        <input className="issue-form-input" name="email" type="text" ref={UsernameR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Email</label>
                        <input className="issue-form-input" name="email" type="text" ref={EmailR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Phonenumber</label>
                        <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Domain Name</label>
                        <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} />
                    </div>
                    <div className="form-group scrolable  mb-2">
                        <label className="label">Description</label>
                        <textarea className="issue-form-input" name="description" ref={DescriptionR} rows="4" cols="50" maxLength="200"  />
                    </div>
                    <div className="form-group  mb-2">
                        <form>
                            <label htmlFor="contained-button-file">
                                <input type="file"
                                className="upload-proof"
                                    id="file"
                                    ref={FileR}
                                    accept="image/*,application/pdf,
                                                application/msword,
                                                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                                application/zip"
                                     multiple
                                     onChange={(e) => handleScreenshot(e)}
                                />
                            </label>
                        </form>
                    </div>
                    <div className="">
                    {loader===false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></>:<> <CircularProgress size={30} /></>} 
                   
                    </div>
                </form>
                <h4 className="alert1 text-center">{show}</h4>
            </div>
        </DashboardLayout>
           
    );
}