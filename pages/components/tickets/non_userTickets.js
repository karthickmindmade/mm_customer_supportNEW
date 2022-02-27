import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Non_userTickets from '../common/non_userviewer';
import Imageviewer from '../common/imageviewer';
import DashboardLayout from '../common/adminNavbar';

function NonUserTickets(props) {

    const [showdetails, setShowdetails] = useState(false);
    var[nonUser,setNonUser] = useState([]);
    const[registerId,setRegisterId] = useState(null);

   function ShowDetail(registerId){
    setRegisterId(registerId)
    setShowdetails(true)
   }

   useEffect(() => {
    Axios.get("https://mindmadetech.in/api/unregisteredcustomer/list")
        .then((res) => setNonUser(res.data))
        .catch((err) => { return err; })
}, [setNonUser]);
   
    function closeDetails() {
        setShowdetails(false);
    };

    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardLayout>
            {showdetails === false ?
                <div className="teambody">
                     <div className='adminticket-head'>
                     <h1>Non User Tickets</h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Logo</TableCell>
                                    <TableCell align="left">Companyname</TableCell>
                                    <TableCell align="left">Clientname</TableCell>
                                    <TableCell align="left">date</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                </TableRow>
                            </TableHead>
                          
                                <TableBody  className='update-right' >
                                {nonUser.map(value=>
                                    <TableRow className="tickets-bodyrow update6" key={value.registerId} onClick={()=>ShowDetail(value.registerId)}>
                                        <TableCell>{value.registerId}</TableCell>
                                        <TableCell className="teamtablecel" align="left" >
                                            <Imageviewer
                                                imgdialogbutton={<img src={value.Logo} alt='logo' className="rounded-circle mb-2" height={40} width={40} />}
                                                imgdialogbody={<img className="Imageviewer-userimg" src={value.Logo} alt='logo' />}
                                            />
                                        </TableCell>
                                        <TableCell>{value.Companyname}</TableCell>
                                        <TableCell >{value.Clientname}</TableCell>
                                        <TableCell >{value.CreatedOn}</TableCell>
                                        <TableCell >{value.Status}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>  
                        </Table>
                    </TableContainer>
                </div>
                :
                <>
                   <Non_userTickets registerId={registerId} closeDetails={closeDetails} />
                </>
            }
            </DashboardLayout>
           
        </div>
    );
}
export default NonUserTickets;