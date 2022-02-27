import React, { useEffect, useState ,useContext} from 'react';
import { CounterContext } from '../../contex/adminProvider';
import Axios from "axios";
export default function DesignTeamList(props) {
 
  const { addTeammember } = useContext(CounterContext);
const{selectedteam,team}=props


  return (
      <div>
        {selectedteam==="x" ? <div className='text-midle'>SELECT Team</div>:<> {team===undefined ? <></>:<>  {team.filter(val => {
             return val.Team.toLowerCase().includes(selectedteam.toLowerCase())
           }).map((teams) =>
        <div className='flex team-list-input' key={teams.teamId}>
        <button className='team-assign-list'  onClick={()=>addTeammember(teams.teamId)}>{teams.Username}</button>
        </div>
         )}</>
        } </>}
      
      </div>
  );
}