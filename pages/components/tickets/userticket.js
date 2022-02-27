import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import { useRouter } from 'next/router';
import UserDashboardLayout from '../common/customerNavbar';
import Axios from 'axios';
function Userticket(props) {
   
    const [maptickets, setmaptickets] = useState([]);
    const Router = useRouter();
    const [login, setLogin] = useState();
    const [showdetails, setShowdetails] = useState(false);
    const [dticketsId, setdticketsId] = useState("");
    const [dticketsscreenshots, setdticketsscreenshots] = useState("");
    const [customername,setcustomername] =useState("");
   
    useEffect(() => {
        setcustomername(window.localStorage.getItem('clientname'));
      });
    var [tickets, setTickets] = useState([]);
    useEffect(() => {
      Axios.get(`https://mindmadetech.in/api/tickets/customertickets/${customername}`)
        .then((res) => setTickets(res.data))
        .catch((err) => { return err; })
    });
  
    useEffect(() => {
        setmaptickets(tickets.reverse());
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        };
        localStorage.setItem('updateclose', "open");
    }, [tickets]);
    const Openticket = (ticketsId, Screenshots) => {
        setdticketsId(ticketsId);
        setdticketsscreenshots(Screenshots);
        setShowdetails(true);
    };
    function closeDetails() {
        setShowdetails(false);
    };
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <UserDashboardLayout>
            {showdetails === false ?
               
               <div className="teambody">
                   <div className='adminticket-head'>
                       <h1>Tickets</h1>
                   </div>
                   <TableContainer component={Paper}>
                       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                           <TableHead>
                               <TableRow>
                                   <TableCell  >TicketId</TableCell>
                                   <TableCell align="left">Username</TableCell>
                                   <TableCell align="left">Date</TableCell>
                                   <TableCell align="left">Team</TableCell>
                                   <TableCell align="left">Status</TableCell>
                               </TableRow>
                           </TableHead>
                           {maptickets.map((tickets) =>
                               <TableBody key={tickets.ticketsId} >
                                   <TableRow className="tickets-bodyrow" onClick={() => Openticket(tickets.ticketsId, tickets.Screenshots)}>
                                       <TableCell>{tickets.ticketsId}</TableCell>
                                       <TableCell >{tickets.Username}</TableCell>
                                       <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                       <TableCell > {tickets.Design === "y" ? <div>Design</div> : <></>}{tickets.Development === "y" ? <div>Development</div> : <></>} {tickets.Seo === "y" ? <div>Seo</div> : <></>} {tickets.Server === "y" ? <div>Server</div> : <></>} {tickets.Server === "" && tickets.Design === "" && tickets.Seo === "" && tickets.Development === "" || tickets.Server === "n" && tickets.Design === "n" && tickets.Seo === "n" && tickets.Development === "n" ? <>Not assigned</> : <></>}</TableCell>
                                       <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}

                                       </TableCell>
                                   </TableRow>
                               </TableBody>
                           )}
                       </Table>
                   </TableContainer>
               
           </div> :
           <>
               <Ticketviewer
                   dticketsId={dticketsId}
                   dticketsscreenshots={dticketsscreenshots}
                   closeDetails={closeDetails}
               />
           </>
       }
            </UserDashboardLayout>
           

        </div>
    );
}
export default Userticket;