import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
    event.preventDefault();
}

export default function Resentticket(props) {

    const { tickets, teamticket } = props;
    const [team, seteam] = useState([]);
    
    useEffect(() => {
        if (teamticket === undefined) {
            seteam(tickets);
        } else {
            seteam(teamticket);
        }
    }, [teamticket, tickets, seteam]);

    return (
        <div className='resentticket'>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Recent Tickets
            </Typography>
            <div className='resentticket-table'>
                <Table size="small" >
                    <TableHead>
                        <TableRow className="resentticket-row">
                            <TableCell>Date</TableCell>
                            <TableCell>TicketId</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                   
                        {team.filter(val => {
                            return val.Status.toLowerCase().includes("New".toLowerCase())
                        }).map((tickets) =>
                        <TableBody key={tickets.ticketsId}>
                                <TableRow className="resentticket-row" >
                                    <TableCell  >{tickets.Cus_CreatedOn}</TableCell>
                                    <TableCell >{tickets.ticketsId}</TableCell>
                                    <TableCell >{tickets.Username}</TableCell>
                                    <TableCell > {tickets.Design === "y" ? <div>Design</div> : <></>}{tickets.Development === "y" ? <div>Development</div> : <></>} {tickets.Seo === "y" ? <div>Seo</div> : <></>} {tickets.Server === "y" ? <div>Server</div> : <></>} {tickets.Server === "" && tickets.Design === "" && tickets.Seo === "" && tickets.Development === "" || tickets.Server === "n" && tickets.Design === "n" && tickets.Seo === "n" && tickets.Development === "n" ? <>Not assigned</> : <></>}</TableCell>
                                    <TableCell >{tickets.Status}</TableCell>
                                </TableRow>
                        </TableBody>
                        )}
                    
                </Table>
            </div>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </div>
    );
}
