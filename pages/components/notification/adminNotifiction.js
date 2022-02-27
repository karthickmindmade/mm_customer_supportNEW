import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FormDialog from '../common/dialogsform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
function AdminNotification(props) {
 const[open,setopen]=useState()
    var [tickets, setTickets,] = useState([]);
    const [state, setState] = React.useState({
        right: false
      });
    const openclose=()=>{
        setopen(!open)
    }
      const toggleDrawer = (anchor, open) => (event) => {
      
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data))
            .catch((err) => { return err; })
    }, [setTickets,tickets]);

    function Notificationupdate(ticketsId) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
            return _response;
        })
            .catch((err) => { return err; })
    };


    return (
        <>
          <div>
      <React.Fragment>
        <div onClick={openclose}><div onClick={toggleDrawer("right",!open)}>{props.onclick}</div></div>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div className='notification-body'>
          {tickets.filter(val => {
                    return val.Notification.toLowerCase().includes("unseen")
                }).map((tickets) =>
                    <div className='' key={tickets.ticketsId}>
                        <FormDialog
                            dialogtitle={
                                <div>
                                    <div className='notification-table-row flex' onClick={() => Notificationupdate(tickets.ticketsId, tickets.Notification)}>
                                        <div className='notification-table-left'>
                                            <FontAwesomeIcon icon={faTicketAlt} />
                                        </div>
                                        <div className='notification-table-right'>
                                            <div className='notification-table-right1 flex'>
                                                <div className='width-10'>Ticket No {tickets.ticketsId}</div>
                                                <div className='width-10 ps-2'>{tickets.Username}</div>
                                            </div>
                                            <div className='notification-table-right2'>
                                                {tickets.Cus_CreatedOn}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            dialogbody={
                                <div className='ticket-details'>
                                    <div className='ticket details-title'>Ticket NO {tickets.ticketsId}</div>
                                    <div className='ticket details-name'>
                                        <label className="label">Username</label>
                                        <div className='ticket-input-details' >{tickets.Username}</div>
                                    </div>
                                    <div className='ticket details-no'>
                                        <label className="label">Phonenumber</label>
                                        <div className='ticket-input-details' >{tickets.Phonenumber}</div>
                                    </div>
                                    <div className='ticket details-domain'>
                                        <label className="label">DomainName</label>
                                        <div className='ticket-input-details' >{tickets.DomainName}</div>
                                    </div>
                                    <div className='ticket details-Date'>
                                        <label className="label">Date</label>
                                        <div className='ticket-input-details' > {tickets.Cus_CreatedOn}</div>
                                    </div>
                                    <div className='ticket details-Des'>
                                        <label className="label">Description</label>
                                        <div className='ticket-input-details' > {tickets.Description}</div>
                                    </div>
                                    <div className='ticket details-Status'><label className="label">Status</label>
                                        <div  >Updated at {tickets.statusUpdateTime}</div>
                                        <div className={tickets.Status} > {tickets.Status}</div>
                                    </div>
                                    <div className='ticket details-Team' ><label className="label">Team</label>
                                        <div className='ticket-input-details' > </div></div>
                                    <div className='ticket details-screenshots'><img src={tickets.screenshots} alt="screenshots" height="80vh" width="50%" /></div>
                                </div>
                            }
                        />
                    </div>
                )}
          </div>
        </Drawer>
      </React.Fragment>
    </div>
        </>
    );
}
export default AdminNotification;