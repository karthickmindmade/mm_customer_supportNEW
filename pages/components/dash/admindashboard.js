import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from 'next/router';
import Dashcard from '../common/dashCard';
import Resentticket from './resentTickets';
import Copyrights from '../common/copyRight';
import { CounterContext } from '../contex/adminProvider';
import Piechart from './piechart';
import Axios from 'axios';
import DashboardLayout from '../common/adminNavbar';
const AdminDashboard = () => {

  const { tickets, notificationcount, ticketscount, adminNewcount, adminStartedcount, adminprogresscount, adminCompletedcount } = useContext(CounterContext);
  const router = useRouter();
 
  
  // getactivetab
  const [activeTab, setActivetab] = useState();
  // usercount
 
   //team members count
 

  // cannot access page without login
  const [login, setLogin] = useState();
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
  },[]);

 
  // getactivetab
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'));
  }, []);
  // usercount
  
  //team members count
  const handleCallback4 = (childData) => {
    setteamcount(childData);
  }
  var [team, setTeam] = useState([]);
  useEffect(() => {
      Axios.get("https://mindmadetech.in/api/team/list")
          .then((res) => setTeam(res.data))
         .catch((err)=>{ return err; })
  }, [setTeam]);
  var [users, setUsers] = useState([]);
  useEffect(() => {
      Axios.get("https://mindmadetech.in/api/customer/list")
          .then((res) => {
              setUsers(res.data);
          }).catch((err)=>{ return err; })
  },[]);
  const [usercount, setusercount] = useState();
  const [teamcount, setteamcount] = useState();
  useEffect(() => {
      setusercount(users.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((userd) => setusercount(userd.Status)).length);
      // props.usercountcallback(usercount);
      setteamcount(team.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((teams) => setteamcount(teams.Status)).length);
  },[]);
 
  return (
    <>
      {login === "false" ? <div className="access ">access denied</div> :
                  <DashboardLayout >
                    <div className='main-dash'>
                      <div className='main-dash-sub' >
                        <div className='dash-head'>
                          <h2>Dashboaard</h2>
                        </div>
                        <div className='dash-body'>
                          <div className='dash-cards'>
                            <div className='row'>
                              <Dashcard
                                cardHead="No of Tickets"
                                cardbody={ticketscount}
                                cardfooter="Rised"
                                cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                              />
                              <Dashcard
                                cardHead="No of users"
                                cardbody={usercount}
                                cardfooter="Active"
                                cardIcon={<FontAwesomeIcon icon={faUser} />}
                              />
                              <Dashcard
                                cardHead="No of Team members"
                                cardbody={teamcount}
                                cardfooter="Active"
                                cardIcon={<FontAwesomeIcon icon={faUsers} />}
                              />
                            </div>
                          </div>
                          <div className='Resentticket-page'>
                            <Resentticket tickets={tickets} />
                            <Piechart
                              newcount={adminNewcount}
                              started={adminStartedcount}
                              inprogress={adminprogresscount}
                              completed={adminCompletedcount}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='copyright-com'>
                        <Copyrights />
                      </div>
                    </div>
                  </DashboardLayout>
                    
                 
      }
    </>
  )
}
export default AdminDashboard;