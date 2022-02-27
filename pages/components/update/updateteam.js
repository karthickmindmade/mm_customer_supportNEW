import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../common/dialogsform';
import { Formik, Form, Field } from 'formik';
import { CounterContext } from '../contex/adminProvider';

function Updateteam({ teamId }) {

    const { setdialogformopen } = useContext(CounterContext);
    var [getTeam, setGetTeam] = useState([]);
    var [show, setShow] = useState('');

    useEffect(()=>{
    localStorage.getItem("passValue",false);
    });

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/team/list/${teamId}`)
            .then(res => setGetTeam(res.data))
            .catch((err)=>{ return err; })
    }, []);

    const getvalue = ({ Username, Password, Team }) => {
        axios.put(`https://mindmadetech.in/api/team/update/${teamId}`, {
            Username: Username,
            Password: Password,
            Team: Team,
        }).then((res) => {
            setShow("Updated Successfully");
            setdialogformopen("true")
            localStorage.setItem("passValue",true);
        }).catch((err)=>{ return err; })
    };
    useEffect(()=>{
        const Timer = setTimeout(() => {
            setShow();
          }, [4000]);
          return () =>{
              clearTimeout(Timer);
          }
      })

    return (
        <FormDialog
            className=""
            dialogtitle={<EditIcon />}
            dialogbody={
                <>
                    <div>
                        {getTeam.map((data) =>
                            <div className="container dialog-body" key={data.teamId}>
                                <Formik
                                    className="addform"
                                    initialValues={{ Username: data.Username, Password: data.Password, Team: data.Team }}
                                    onSubmit={value => getvalue(value)}
                                >
                                    <Form >
                                        <div className="form-group">
                                            <label className="label">Username</label>
                                            <Field className="form-input" name="Username" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col label">Password</label>
                                            <Field className="form-input" name="Password" />
                                        </div>
                                        <div>
                                            <div className="form-group">
                                                <label className="col label">Team</label>
                                                <Field className="form-input" as="select" name="Team">
                                                    <option >select</option>
                                                    <option value="design">Design</option>
                                                    <option value="development">Development</option>
                                                    <option value="server">server</option>
                                                    <option value="seo">SEO</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className='bottom-area'>
                                                <button type="submit" className="btn2 float-end">Submit</button>
                                            </div>
                                        </div>
                                        <h4 className="alert1 text-center">{show}</h4>
                                    </Form>
                                </Formik>
                            </div>
                        )}
                    </div>
                </>
            }
        />
    );
}
export default Updateteam;