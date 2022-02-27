import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import Userissue from "../submits/userissues";
import { withRouter } from "next/router";
import Axios from "axios";
import router from "next/router";
import Userticket from "../tickets/userticket";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import CustomerProfile from "../profile/customerProfile";
import Dashcard from "../common/dashCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Copyrights from "../common/copyRight";
import UserDashboardLayout from "../common/customerNavbar";
const CustomerDashboard = () => {

  const [user, setUser] = useState();
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState();
  // usertab
  var [activeTab, setActivetab] = useState(" ");
  var [tickets, setTickets] = useState([]);
  const [ticketraisedcount, setticketraisedcount] = useState();
  const [raisedinprogresscount, setraisedinprogresscount] = useState();
  const [raisedcompletedcount, setraisedcompletedcount] = useState();

  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
  });

  useEffect(() => {
    setUser(window.localStorage.getItem('clientname'));
  });

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true);
        // your logic
        router.push("/");
        localStorage.setItem('loggedin', false);
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent3 = () => {
    router.push("/");
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('activeTab');
  };

  useEffect(() => {
    setUser(window.localStorage.getItem('user'));
  });

  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard");
  };

  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket');
  };

  const profileTabActive = () => {
    localStorage.setItem('activeTab', 'profile');
  };

  // usertab
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'));
  }, []);
  var [tickets, setTickets] = useState([]);
  useEffect(() => {
    Axios.get(`https://mindmadetech.in/api/tickets/customertickets/${user}`)
      .then((res) => setTickets(res.data))
      .catch((err) => { return err; })
  });

  useEffect(() => {
    setticketraisedcount(tickets.filter(val => { return val }).map((ticket) => setticketraisedcount(ticket.Status.length)).length);
    setraisedinprogresscount(tickets.filter(val => { return val.Status.toLowerCase().includes("inprogress") }).map((ticket) => setraisedinprogresscount(ticket.Status.length)).length);
    setraisedcompletedcount(tickets.filter(val => { return val.Status.includes("Completed") }).map((ticket) => setraisedcompletedcount(ticket.Status.length)).length);
  }, [tickets]);

  return (
    <>
      {login === "false" ? <div className="access ">access denied</div> :
      <UserDashboardLayout>
        <div>
         
         <div className="m-4">
           <div className="row">
             <div className="col"> <Userissue customername={user} /></div>
             <div className="col">
               <div className="customer-cards">
                 <Dashcard
                   cardHead="No of Tickets"
                   cardbody={ticketraisedcount}
                   cardfooter="Rised"
                   cardIcon={<div className="icon-rotation"><FontAwesomeIcon icon={faTicketAlt} /></div>}
                 />
                 <Dashcard
                   cardHead="No of Tickets"
                   cardbody={raisedinprogresscount}
                   cardfooter="InProgress"
                   cardIcon={<div className="icon-rotation"><HourglassBottomIcon /></div>}
                 />
                 <Dashcard
                   cardHead="No of Tickets"
                   cardbody={raisedcompletedcount}
                   cardfooter="Completed"
                   cardIcon={<div className="icon-rotation"><DoneAllIcon /></div>}
                 />
               </div>
             </div>
           </div>
           </div>
           <div className='copyright-com'>
             <Copyrights />
           </div>
     
     
     
</div>
      </UserDashboardLayout>
        
      }
    </>
  )
}
export default withRouter(CustomerDashboard);


