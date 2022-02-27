// import React,{ useState } from 'react';
// import { styled } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
// const drawerWidth = 190;
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(9)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );
// export default function Dashboard(props){

//   const { children } = props;
//   const [open, setOpen] = useState(false);
//   const [shownotification, setshowNotification] = useState(false)

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
  
//   function notificationset() {
//     setshowNotification(!shownotification);
//   };

//   return (
   
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <AppBar position="fixed" open={open}>
//           <Toolbar
//             sx={{
//               pr: '24px', // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: '36px',
//                 ...(open && { display: 'none' }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             {props.navcontent}
//             {props.shownotification}
           
//             <a onClick={props.logout} className="text-white">Logout</a>
//             {props.menuBar}
          
//           </Toolbar>
//         </AppBar>
//         <div className="d-flex align-items-start">
//           <Drawer variant="permanent" open={open}>
//             <Toolbar
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//                 px: [1],
//               }}
//             >
//               <IconButton onClick={toggleDrawer}>
//                 <ChevronLeftIcon />
//               </IconButton>
//             </Toolbar>
//             <Divider />
//             <List>
//               <div>
                
//                 <div className="nav flex-column nav-pills silebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                   <button className={props.dashActive} onClick={props.DashTabActive} id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-dash" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"> <ListItem button>
//                     <ListItemIcon>
//                       <DashboardIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Dashboard" />
//                   </ListItem>
//                   </button>

//                   {props.sidenavcontent}
//                   <button className={props.ticketActive} id="v-pills-settings-tab" onClick={props.TicketTabActive} data-bs-toggle="pill" data-bs-target="#v-pills-tickets" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><ListItem button>
//                     <ListItemIcon>
//                       <FontAwesomeIcon icon={faTicketAlt} />
//                     </ListItemIcon>
//                     <ListItemText primary="Ticket" />
//                   </ListItem>
//                   </button>
//                 </div>
//               </div>
//             </List>
//             <Divider />
//           </Drawer>
//         </div>
//         <Box
//           component="main"
//           sx={{
//             backgroundColor: (theme) =>
//               theme.palette.mode === 'light'
//                 ? theme.palette.grey[100]
//                 : theme.palette.grey[900],
//             flexGrow: 1,
//             height: '100vh',
//             overflow: 'auto',
//           }}
//         >
//           <Toolbar />
//           {children}
//         </Box>
//       </Box>

    
//   );
// }