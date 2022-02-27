import React,{ useState,useContext, useEffect } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import {CounterContext} from "../components/contex/adminProvider"
import DashboardLayout from './common/adminNavbar';
const schema = yup.object().shape({
    Companyname: yup.string().required(),
    Clientname: yup.string().required(),
    Email: yup.string().required().email(),
    Phonenumber: yup.string().required().max(10),
    Username : yup.string().required(),
    Password :  yup.string().required(),
    DomainName: yup.string().required(),
    Description: yup.string().required(),
});
export default function ScrollDialog(props) {
    const { setTesting,setshowvalue} = useContext(CounterContext);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [show,setShow] = useState('');
    const [Logo, setLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    var [showlogo, setShowlogo] = useState('');
    const [logovalidate, setLogovalidate] = useState(); 
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleScreenshot(e) {
        setLogovalidate(e.target.files[0]);
        setLogo(e.target.files[0]);
        setUploadLogo(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmitForm = ({ Companyname, Clientname, Email, Phonenumber, Username, Password, DomainName, Description }) => {

        if (logovalidate === undefined) {
            setShowlogo("images is required")
        } else {
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
            console.log(Companyname,Clientname,Email,Phonenumber,Username,Password,date + ' ' + fullTime,DomainName,Description)
            const data = new FormData();
            data.append("Companyname", Companyname);
            data.append("Clientname", Clientname);
            data.append("Email", Email);
            data.append("Phonenumber", Phonenumber);
            data.append("Username", Username);
            data.append("Password", Password);
            data.append("file", Logo);
            data.append("CreatedOn", date + ' ' + fullTime);
            data.append("DomainName", DomainName);
            data.append("Description", Description)
            Axios.post(`https://mindmadetech.in/api/unregisteredcustomer/new`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                
                if (response.data.statusCode === 400) {
                    setShow(response.data.message)
                    setshowvalue(response.data.message)
                    setTesting(true)
                } else {
                    setShow("Registered Successfully");
                    setshowvalue("Registered Successfully")
                    setOpen(false);               
                    setTesting(true)
                }
            }).catch((err) => { return err; })
        }
    }
    
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        setTesting(false)
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
       
             <div className='z-index-99'>
            <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Dialog
                open={open}

                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"><div className='form-title'>Non User Ticket Form</div></DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                            <div className="addform">
                            <form>
                                <div className="form-group upload">
                                    <label htmlFor="contained-button-file">
                                        <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                        <p className="text-danger mt-3 ml-2">{showlogo}</p>
                                        <Avatar
                                            alt="uploadlogo"
                                            src={uploadLogo}
                                            sx={{ width: 65, height: 65 }}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="label">Company Name</label>
                                    <input className="issue-form-input" name="Companyname" type="text" {...register('Companyname')} />
                                    <p className="me-2 text-danger">{errors.Companyname?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label"> Client Name</label>
                                    <input className="issue-form-input" name="Clientname" type="text" {...register('Clientname')} />
                                    <p className="me-2 text-danger">{errors.Clientname?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">EMail ID</label>
                                    <input className="issue-form-input" name="Email" type="text" {...register('Email')} />
                                    <p className="me-2 text-danger">{errors.Email?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">Phone Number</label>
                                    <input className="issue-form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                                    <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label">Username</label>
                                    <input className="form-input" name="Username" type="text" {...register('Username')} />
                                    <p className="me-2 text-danger">{errors.Username?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">Password</label>
                                    <input className="form-input" name="Password" type="password" {...register('Password')} />
                                    <p className="me-2 text-danger">{errors.Password?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label">Domain Name</label>
                                    <input className="issue-form-input" name="DomainName" rows="4" cols="50" maxLength="200" {...register('DomainName')} />
                                    <p className="me-2 text-danger">{errors.DomainName?.message}</p>
                                </div>

                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <textarea className="issue-form-input" name="Description" rows="4" cols="50" maxLength="200" {...register('Description')} />
                                    <p className="me-2 text-danger">{errors.Description?.message}</p>
                                </div>
                            </form>
                            <h4 className="alert1 text-center">{show}</h4>
                           
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(handleSubmitForm)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
       
       
    );
}