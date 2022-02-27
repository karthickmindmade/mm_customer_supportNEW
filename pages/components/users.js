import React,{ useState, useEffect,useContext } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialog from './common/dialogsform';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import router from "next/router";
import Addcustomer from './submits/addcustomer';
import Updatecustomer from './update/updatecustomer';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageviewer from './common/imageviewer';
import ReactPaginate from 'react-paginate';
import { CounterContext } from './contex/adminProvider';
import DashboardLayout from './common/adminNavbar';

 function Users(props){

    const { setdialogformopen } = useContext(CounterContext);
    var [search, setSearch] = useState('');
    const router = useRouter();
    var [users, setUsers] = useState([]);
    var [exportUsers, setExportUsers] = useState([]);
    var [selectedValue, setSelectedValue] = useState([]);
    const [usercount, setusercount] = useState();
    const [login, setLogin] = useState();
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);

    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/customer/list")
            .then((res) => {
                setUsers(res.data);
                if(localStorage.getItem("passValue") === true){
                    setSelectedValue(team);
                }else{
                    setSelectedValue([]);
                }
            }).catch((err)=>{ return err; })
    }, [selectedValue]);

    useEffect(()=>{
        localStorage.setItem("passValue",false);
    });

    useEffect(() => {
        setusercount(users.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((userd) => setusercount(userd.Status)).length);
        // props.usercountcallback(usercount);
    });

    const deleteUsers = (id) => {
        Axios.put(`https://mindmadetech.in/api/customer/delete/${id}`, {
            Isdeleted: 'y'
        }).then(() => {          
            setdialogformopen(true)
        }).catch((err)=>{ return err; })     
    };

    const UsersList = [
        [
            "Users Id",
            "Project Code",
            "Company Name",
            "Client Name",
            "User Name",
            "Password",
            "Email Id",
            "Phonenumber"
        ],
        ...users.map(details => [
            details.usersId,
            details.Projectcode,
            details.Companyname,
            details.Clientname,
            details.Username,
            details.Password,
            details.Email,
            details.Phonenumber
        ])
    ]
    UsersList.reduce((prev, curr) => [prev, curr]);

    const handleExport = () => {
        const data = UsersList;
        setExportUsers(data);
    };
 
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            router.push("/");
        } else if (login === null) {
            router.push("/");
        }
        localStorage.setItem('updateclose', "open");
    })

    //pagination
    function handlePageChange(pageNumber) {
        setCurrentpage(pageNumber + 1);
    };

    const pagedatalimit = (e) => {
        setdatalimit(e.target.value);
    };

    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
          <DashboardLayout><div className="userbody2">
                    <div className='header-user'>
                        <h1>USERS</h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='userpage-pagedatalimit'>
                            <select className='pagedatalimit-select' onChange={pagedatalimit}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <div className='float-end caption'>Number of users per page</div>
                        </div>
                        <div className='right-user-btns'>
                            <CSVLink
                                data={exportUsers}
                                filename={'Customer_List.csv'}
                                className="float-enduser btn2 button"
                                target="_blank"
                                onClick={handleExport}
                            >Export</CSVLink>
                            <FormDialog
                                className="float-enduser btn2 button"
                                dialogtitle="+ADD customer"
                                dialogbody={<Addcustomer />}
                            />
                        </div>                      
                    </div>              
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='usertable'>
                                    <TableCell className="teamtablecel" >USERID</TableCell>
                                    <TableCell className="teamtablecel" align="left">LOGO</TableCell>
                                    <TableCell className="teamtablecel" align="left">COMPANY NAME</TableCell>
                                    <TableCell className="teamtablecel">CLIENT NAME</TableCell>
                                    <TableCell className="teamtablecel">EMAIL</TableCell>
                                    <TableCell className="teamtablecel">PHONE NUMBER</TableCell>
                                </TableRow>
                            </TableHead>
                            {users.filter(val=>{
                                if(search === ""){
                                    return val;
                                }else if(val.Companyname.toLowerCase().includes(search.toLowerCase())||
                                         val.Clientname.toLowerCase().includes(search.toLowerCase())) {
                                    return val;
                                }else null;
                            }).reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((item)=>
                            <TableBody key={item.usersId}>
                            <TableRow >
                                <TableCell className="teamtablecel" component="th"  scope="row">{item.usersId}</TableCell>
                                <TableCell className="teamtablecel" align="left" >
                                    <Imageviewer
                                        imgdialogbutton={<img src={item.Logo} alt='logo' className="rounded-circle mb-2" height={40} width={40} />}
                                        imgdialogbody={<img className="Imageviewer-userimg" src={item.Logo} alt='logo' />}
                                    />
                                </TableCell>
                                <TableCell className="teamtablecel" align="left">{item.Companyname}</TableCell>
                                <TableCell className="teamtablecel" align="left">{item.Clientname}</TableCell>
                                <TableCell className="teamtablecel" align="left">{item.Email}</TableCell>
                                <TableCell className="teamtablecel" align="left">{item.Phonenumber}</TableCell>
                                <div className='deteleandedit'>
                                    <Updatecustomer usersId={item.usersId} />
                                    <FormDialog
                                        className="user-delete"
                                        dialogtitle={<DeleteIcon />}
                                        headtitle={<div className='head-dialog'>Are you sure you want to delete the team?</div>}
                                        dialogactions={
                                            <div>
                                                <Button onClick={() => deleteUsers(item.usersId, item.Username)}>YES</Button>
                                                <Button>NO</Button>
                                            </div>
                                        }
                                    />
                                </div>
                            </TableRow>
                        </TableBody>
                            )}
                        </Table>                      
                    </TableContainer>
                    < ReactPaginate
                        previousLabel={""}
                        nextLabel={""}
                        pageCount={Math.ceil(users.length / datalimit)}                    
                        onPageChange={(e) => handlePageChange(e.selected)}
                        containerClassName={"pagination justify-content-center mt-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
              </DashboardLayout>
                
            </div>
    )
}

  export default Users