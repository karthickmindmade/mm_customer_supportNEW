import React, { useState, useEffect } from 'react';
import Imageviewer from '../common/imageviewer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from "axios";
import ViewTeam from './view_team';

function Ticketviewer(props) {

    const { dticketsId, closeDetails, dticketsscreenshots,teamarray} = props;
    const [ticket, settickets] = useState([]);
    const [mimetype, setMimetype] = useState('');
    const[downloadlink,setdownloadlink]=useState()

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/tickets/list/${dticketsId}`)
            .then((res) => settickets(res.data))
            .catch((err)=>{ return err;})
    }, [settickets]);
    
    // useEffect(() => {
    //     setMimetype(dticketsscreenshots.slice(dticketsscreenshots.length - 4));
    // },[setMimetype]);

    const downloadimg= (Screenshots) =>{
        setdownloadlink(`https://mindmadetech.in/download/${Screenshots.slice(38,100)}`);  
    };
     var [team, setTeam] = useState([]);
     useEffect(() => {
         Axios.get("https://mindmadetech.in/api/team/list")
             .then((res) => setTeam(res.data))
            .catch((err)=>{ return err; })
     }, [setTeam]);
    return (
        <>
            {ticket.reverse().map((tickets) =>
                <div className='ticket-details' key={tickets.ticketsId}>
                    <div className='ticket-details-head'>
                        viewing Support Ticket #{tickets.ticketsId}
                        <div className='ticket-details-head-btn '>
                            <button className='btn2' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
                        <div className='ticket-details-middle-1'>
                            <div className='ticket-details-middle-1-1'>
                                Tickets Details
                                <div className='ticket-details-middle-1-2'>
                                {tickets.Status === "completed" ? <>Done</> : <>{tickets.Status}</>}
                                </div>
                            </div>
                            <div className='ticket-details-middle-1-3'>
                               
                                   
                                        <div className="ticket-status color-green">
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "New" ? <><div className='details-caption'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div></> : <div className='details-caption-strike'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" ? "ticket-status-line width-10 display-1" : "ticket-status-line width-10 display-1 color-green-line"}>
                                        </div>
                                        <div className={tickets.Status === "New" ? "ticket-status-line width-10 display-2" : "ticket-status-line width-10 display-2 color-green-line"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "started" || tickets.Status === "inprogress" || tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "started" ? <div className='details-caption'>Started<div className='details-caption-2'>Updated at<br /> {tickets.Tm_Start_UpdatedOn}</div></div> : <div className='details-caption-strike'>Started<div className='details-caption-2'>Updated at <br />{tickets.Tm_Start_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status-line display-1 width-10" : "ticket-status-line width-10 display-1 color-green-line"}>
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status-line width-10 display-2" : "ticket-status-line width-10 color-green-line display-2"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status" : "ticket-status color-green"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "inprogress" ? <div className='details-caption'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div> : <div className='details-caption-strike'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status-line width-10 display-1 color-green-line" : " ticket-status-line display-1 width-10 "}>
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status-line width-10 display-2 color-green-line" : " ticket-status-line width-10 display-2"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status  color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "completed" || tickets.Status === "Completed" ? <div className='details-caption'>{tickets.Status === "completed" ? <>Done</> : <>{tickets.Status}</>}<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div> : <div className='details-caption-strike'>Completed<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div>}
                                        </div>
                                   
                               
                            </div>
                        </div>
                        <div className='ticket-details-middle-2 row'>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Username
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.Username}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Ticket NO
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.ticketsId}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Project Code
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.Projectcode}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Department
                                </div>
                                <div className='user-label-ticket-details'>
                               <ViewTeam team={team} teamArray={teamarray} /> 
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    DomainName
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.DomainName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='user-profile-ticket-details row'>
                        <div className='user-profile-ticket-details-1 col'>
                            <div className='label-ticket-details'>
                                Description
                            </div>
                            <div className='ticket-input-details' >
                                {tickets.Description}
                            </div>
                        </div>
                        <div className='user-profile-ticket-details-2 col flex'>
                            <div>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='ticket-input-details' >
                                    {tickets.Phonenumber}
                                </div>
                                <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                    {tickets.Cus_CreatedOn}
                                </div>
                            </div>
                           

                        </div>
                        <div className='ticket-details-screenshot col'>
                                <div className='label-ticket-details'>
                                    Screenshot
                                </div>
                                {mimetype === ".png" || mimetype === ".jpg" || mimetype === "jpeg" ?
                                    <Imageviewer
                                        imgdialogbutton={<img src={tickets.Screenshots}  alt="screenshots" width={200} height={100} />}
                                        imgdialogbody={<img className='screeshot-img-viewer' src={tickets.Screenshots} alt="screenshots" />}
                                    /> :
                                    <a href={tickets.Screenshots} target="_blank" rel="noreferrer noopener">View File</a>
                                }
                                <a href={downloadlink}   onClick={()=>downloadimg(tickets.Screenshots)}>download</a>
                            </div>
                    </div>


                </div>
            )}
        </>
    );
}
export default Ticketviewer;