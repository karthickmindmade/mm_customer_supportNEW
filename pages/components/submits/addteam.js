import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required(),
});

function Addteam() {

    var [addteam, setAddteam] = useState('');
    const Router = useRouter();
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const addTeam = ({ Username, Password }) => {
        Axios.post(`https://mindmadetech.in/api/team/new`, {
            Username: Username,
            Password: Password,
            Team: addteam
        }).then((response) => {
            if (response.data.message) {
                setShow(response.data.message)
                localStorage.setItem('updateclose', "close");
            } else {
                setShow("Registered Successfully");
                localStorage.setItem('updateclose', "close"); 
            }
        })
        .catch((err)=>{ return err; })
    };
 
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
    });

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
            <div className="container mainbody">
                <div className="top-btn">
                    <div className='team-dropdown'>
                        <div className='team-list'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Design" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >Design</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="server" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >server</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="development" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >development</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="SEO" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >SEO</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addform">
                    <form>
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
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <button type="submit" onClick={handleSubmit(addTeam)} className="btn2 float-end"> Add </button>
                            </div>
                        </div>
                    </form>
                    <h4 className="alert1 text-center">{show}</h4>
                </div>
            </div>
        </div>
    );
}
export default Addteam;
