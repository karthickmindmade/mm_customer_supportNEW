import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { withRouter } from "next/router";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import router from "next/router";
import Teamticket from "../tickets/teamticket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dashcard from "../common/dashCard";
import Resentticket from "./resentTickets";
import Piechart from "./piechart";
import Axios from "axios";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Copyrights from "../common/copyRight";
import TeamDashboardLayout from "../common/teamNavbar";
const TeamDashboard = () => {
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState();
  // activetab
  var [activeTab, setActivetab] = useState(" ");
 
  const [teamticket, setteamticket] = useState([]);
  // ticket count, ticket status count for team dashboard
  const [teamassignedcount, setassignedcount] = useState();
  const [teaminprogresscount, setinprogresscount] = useState();
  const [teamstartedcount, setstartedcount] = useState();
  const [teamcompletedcount, setcompletedcount] = useState();
  const [teamteamNotificationcount, setteamNotificationcount] = useState();
  //access for team dashboard
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
  });

  //alert to conform logout
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
        setfinishStatus(true);
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

  

  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard");
  };

  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket');
  };

  // usertab
  const profileTabActive = () => {
    localStorage.setItem('activeTab', 'profile');
  };

   // activetab
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'));
  }, []);
  var [loginTmName, setloginTmName] = useState();
  useEffect(() => {
      setloginTmName(loginTmName = window.localStorage.getItem('tm_name'));
        if (loginTmName !== "" || loginTmName !== undefined || loginTmName !== null) {
          Axios.get(`https://mindmadetech.in/api/tickets/teamtickets/${loginTmName}`)
            .then((res) => {
              setteamticket(res.data);
            })
            .catch((err) => { return err; })
        }
  }, [setteamticket, loginTmName,teamticket]);

  
  // ticket count, ticket status count for team dashboard
  useEffect(() => {
    setassignedcount(teamticket.filter(val => { return val }).map((ticket) => setassignedcount(ticket.Status.length)).length);
    setstartedcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("started") }).map((ticket) => setstartedcount(ticket.Status.length)).length);
    setinprogresscount(teamticket.filter(val => { return val.Status.toLowerCase().includes("inprogress") }).map((ticket) => setinprogresscount(ticket.Status.length)).length);
    setcompletedcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("completed") }).map((ticket) => setcompletedcount(ticket.Status.length)).length);
    setteamNotificationcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("new") }).map((ticket) => setteamNotificationcount(ticket.Status.length)).length);
  }, [teamticket]);

  return (
    <>
      {login === "false" ? <div className="access ">access denied</div> :
        <div>
         <TeamDashboardLayout>
         <div className='main-dash'>
                      <div className='main-dash-sub' >
                        <div className='dash-head'>
                          <h2>Dashboaard</h2>
                        </div>
                        <div className='dash-body'>
                          <div className='dash-cards'>
                            <div className='row'>
                              <Dashcard
                                cardHead="Tickets assigned"
                                cardbody={teamassignedcount}
                                cardfooter="last Ticket no"
                                cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                              />
                              <Dashcard
                                cardHead="Tickets in inprogress"
                                cardbody={teaminprogresscount}
                                cardfooter="last Ticket no"
                                cardIcon={<FontAwesomeIcon icon={faUsers} />}
                              />
                              <Dashcard
                                cardHead="Tickets completed"
                                cardbody={teamcompletedcount}
                                cardfooter="last Ticket no"
                                cardIcon="icon3"
                              />
                            </div>
                          </div>
                          <div className='Resentticket-page'>
                            <Resentticket teamticket={teamticket} />
                            <Piechart
                              newcount={teamteamNotificationcount}
                              started={teamstartedcount}
                              inprogress={teaminprogresscount}
                              completed={teamcompletedcount}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='copyright-com'>
                        <Copyrights />
                      </div>
                    </div>
         </TeamDashboardLayout>
                   
                
        </div>
      }
    </>
  )
}
export default withRouter(TeamDashboard);
