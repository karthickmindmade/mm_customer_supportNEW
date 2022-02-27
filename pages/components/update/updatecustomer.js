import React, { useEffect, useState, createRef,useContext } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { CounterContext } from '../contex/adminProvider';

function Updatecustomer({ usersId }) {

    const { setdialogformopen } = useContext(CounterContext);
    var [getCustomer, setGetCustomer] = useState([]);
    const [editLogo, setEditLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    const [selected, setSelected] = useState(false);
    var [show, setShow] = useState('');
    const [Adminname, setAdminname] = useState([]);
    const [passValue, setPassValue] = useState();
    const [Modifiedby, setModifiedby] = useState();
    let CompanynameR = createRef();
    let ClientnameR = createRef();
    let UsernameR = createRef();
    let PasswordR = createRef();
    let EmailR = createRef();
    let PhonenumberR = createRef();
    let ProjectcodeR = createRef();

    useEffect(() => {
        setPassValue(localStorage.getItem("passValue", false));
    });

    useEffect(() => {
        setModifiedby(Adminname.slice(3, 20));
        setAdminname(window.localStorage.getItem('user'));
    }, []);

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/customer/list/${usersId}`)
            .then(res => setGetCustomer(res.data))
            .catch((err)=>{ return err; })
    }, [setGetCustomer]);

    function handleUpdate() {
        var Logo, Companyname, Clientname, Username, Password, Email, Phonenumber;
        Companyname = CompanynameR.current.value;
        Clientname = ClientnameR.current.value;
        Username = UsernameR.current.value;
        Password = PasswordR.current.value;
        Email = EmailR.current.value;
        Phonenumber = PhonenumberR.current.value;

        switch (editLogo) {
            case undefined:
                Logo = Logo;
                console.log("empty");
                break;
            default:
                Logo = editLogo;
                console.log("editLogo");
                break;
        }

        const data = new FormData();
        data.append("Companyname", Companyname);
        data.append("Clientname", Clientname);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("Username", Username);
        data.append("Password", Password);
        if (editLogo) {
            data.append("file", Logo);
        } else {
            data.append("Logo", Logo);
        }
        data.append("Modifiedon", date + ' ' + fullTime);
        data.append("Modifiedby", Modifiedby)
        axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setShow("Updated Successfully");
            setdialogformopen("true");
            localStorage.setItem("passValue", true);
        }).catch((err)=>{ return err; })
    };

    useEffect(()=>{
        setShow("");
        const Timer = setTimeout(() => {
            setShow();
          }, [4000]);
          return () =>{
              clearTimeout(Timer);
          }
      })

    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var fullDate, TimeType, hour, minutes, seconds, fullTime;
    fullDate = new Date();
    hour = fullDate.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }else {
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
        setEditLogo(e.target.files[0]);
        setSelected(true);
        setUploadLogo(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <FormDialog
            className="float-enduser button"
            dialogtitle={<EditIcon />}
            dialogbody={
                <div>
                    {getCustomer.map((data) =>
                        <div className="container mainbody" key={data.usersId}>
                            <div className="addform">
                                <form>
                                    <div className="form-group upload">
                                        <label htmlFor="contained-button-file">
                                            <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={selected === false ? data.Logo : uploadLogo}
                                                sx={{ width: 65, height: 65 }}
                                            />
                                            <Button size="small" variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>

                                    </div>

                                    <div className="form-group">
                                        <label className="label"> Comapany Name</label>
                                        <input className="form-input" name="Name" type="text" ref={CompanynameR} defaultValue={data.Companyname} />

                                    </div>
                                    <div className="form-group">
                                        <label className="label"> Client Name</label>
                                        <input className="form-input" name="Name" type="text" ref={ClientnameR} defaultValue={data.Clientname} />

                                    </div>
                                  
                                    <div className="form-group">
                                        <label className="label">Username</label>
                                        <input className="form-input" name="Username" type="text" ref={UsernameR} defaultValue={data.Username} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Password</label>
                                        <input className="form-input" name="Password" type="text" ref={PasswordR} defaultValue={data.Password} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">EMail ID</label>
                                        <input className="form-input" name="Email" type="text" ref={EmailR} defaultValue={data.Email} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Phone Number</label>
                                        <input className="form-input" name="Phonenumber" type="text" ref={PhonenumberR} defaultValue={data.Phonenumber} />

                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='bottom-area'>
                                            <button type="button" onClick={() => handleUpdate(data.Logo, data.Companyname, data.Clientname, data.Username, data.Password, data.Email, data.Phonenumber)} className="btn2 float-end"> Update </button>
                                        </div>
                                    </div>
                                    <h4 className="alert1 text-center">{show}</h4>
                                </form>

                            </div>
                        </div>
                    )}
                </div>}
        />
    );
}
export default Updatecustomer;
