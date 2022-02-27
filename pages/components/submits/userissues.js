import React, { useEffect, useState,useRef } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
export default Userissue;

function Userissue(props) {

    const [loader,setloader]=useState(false);
    const { customername } = props;
    const [Email, setEmail] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [DomainName, setDomainName] = useState('');
    const [Description, setDescription] = useState('');
    const [Screenshots, setScreenshots] = useState();
    const[projectcode,setProjectcode] = useState('');
    const [show, setShow] = useState();
    const EmailR = useRef();
    const PhonenumberR = useRef();
    const DomainnameR = useRef();
    const DescriptionR = useRef();
    const FileR = useRef();

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

    useEffect(()=>{
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
        .then(res =>{
            setProjectcode(res.data[0].Projectcode)
        }).catch(err=>{ return err; })
    });

    function handleScreenshot(e) {
        setScreenshots(e.target.files[0]);
    };

    const addIssues = () => {
        setloader(true)
        const data = new FormData();
        data.append("UserName", customername);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("DomainName", DomainName);
        data.append("Date", date+ ' ' + fullTime);
        data.append("Description", Description);
        data.append("Projectcode",projectcode);
        data.append("file", Screenshots);
        data.append("Cus_CreatedOn", date + ' ' + fullTime)
        Axios.post("https://mindmadetech.in/api/tickets/new", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setShow("Updated Successfully");
            setloader(false);
            EmailR.current.value = " ";
            PhonenumberR.current.value = " ";
            DomainnameR.current.value = " ";
            DescriptionR.current.value = " ";
            FileR.current.value = null;
        })
        .catch((err)=>{ return err; })
    };

    useEffect(()=>{
        const timer = setTimeout(() => {
              setShow();
          }, [3500]);
          return () =>{
              clearTimeout(timer);
          }
      })

    return (
            <div>
                <form className="form3" action="/" method="post">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                    <div className="form-group mt-2 mb-2 flex" >
                        <label className="label width-25">User Name</label>
                        <h5 className="issue-form-input">{props.customername}</h5>
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Email</label>
                        <input className="issue-form-input" name="email" type="text" ref={EmailR} onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Phonenumber</label>
                        <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR} onChange={(e) => { setPhonenumber(e.target.value); }} />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Domain Name</label>
                        <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} onChange={(e) => { setDomainName(e.target.value); }} />
                    </div>
                    <div className="form-group scrolable  mb-2">
                        <label className="label">Description</label>
                        <textarea className="issue-form-input" name="description" ref={DescriptionR} rows="4" cols="50" maxLength="200" onChange={(e) => { setDescription(e.target.value) }} />
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
                                    onChange={handleScreenshot} multiple="true"
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
    );
}
