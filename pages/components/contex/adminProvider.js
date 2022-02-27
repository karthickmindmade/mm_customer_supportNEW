import {createContext,useState,useEffect} from "react";
import Axios from "axios";
export const CounterContext = createContext();

export default function CounterContextProvider(props){
    const[testing,setTesting]=useState(false)
    const[showvalue,setshowvalue]=useState("")
    const [dialogformopen, setdialogformopen] = useState(false);
    var [tickets, setTickets] = useState([]);
    //notification count
    const [notificationcount, setnotificationcount] = useState();
    const [adminNewcount, setadminNewcount] = useState();
    const [adminStartedcount, setadminStartedcount] = useState();
    const [adminprogresscount, setadminprogresscount] = useState();
    const [adminCompletedcount, setadminCompletedcount] = useState();
    //tickets count 
    let ticketscount = 0;
    ticketscount = tickets.length;
    //team tickets filter function
    var [search1, setSearch1] = useState('');
   
    const[designTeamList,setdesignTeamList]=useState([])
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data))
            .catch((err)=>{ return err; })
    });

     //notification count
    useEffect(() => {
        setnotificationcount(tickets.filter(val => { return val.Notification.toLowerCase().includes("unseen") }).map((ticket) => setnotificationcount(ticket.Notification.length)).length);
        setadminNewcount(tickets.filter(val => { return val.Status.toLowerCase().includes("New".toLowerCase()) }).map((ticket) => setadminNewcount(ticket.Status.length)).length);
        setadminStartedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("started".toLowerCase()) }).map((ticket) => setadminStartedcount(ticket.Status.length)).length);
        setadminprogresscount(tickets.filter(val => { return val.Status.toLowerCase().includes("inprogress".toLowerCase()) }).map((ticket) => setadminprogresscount(ticket.Status.length)).length);
        setadminCompletedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("completed".toLowerCase() )}).map((ticket) => setadminCompletedcount(ticket.Status.length)).length);
    });

    //team tickets filter function
    useEffect(() => {
        setSearch1(window.localStorage.getItem('tm_name'))
    });

    
   function addTeammember(teamId){
       
        setdesignTeamList([...designTeamList,teamId])
      
   
   }
   function removeTeammember(teamId){
    
        setdesignTeamList([...designTeamList].filter((val)=> {if(val!==teamId){ return val }}))
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
   });
   const [usercount, setusercount] = useState();
   const [teamcount, setteamcount] = useState();
   useEffect(() => {
       setusercount(users.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((userd) => setusercount(userd.Status)).length);
       // props.usercountcallback(usercount);
       setteamcount(team.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((teams) => setteamcount(teams.Status)).length);
   });
  

    return(
        <CounterContext.Provider value={{
            showvalue,
            usercount,
            teamcount,
            setshowvalue,
            testing,
            setTesting,
            designTeamList,
            removeTeammember,
            addTeammember,
            setdialogformopen,
            tickets,
            notificationcount,
            ticketscount,
            adminNewcount,
            adminStartedcount,
            adminprogresscount,
            adminCompletedcount,
            dialogformopen
            }}>
            {props.children}
        </CounterContext.Provider>
    )
}
