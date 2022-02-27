import React, { useContext,useState,useEffect } from "react";

import Axios from "axios";
export default function ViewTeam(props){
    const {teamArray,team}=props
    
    const [newarray,setnewarray]=useState([])
    useEffect(()=>{
       
        setnewarray(teamArray.map((product)=>[...newarray,product.teamId] )) 
    },[setnewarray,teamArray])
  
    return(
        <div className="">{team!==undefined ?<> {team.filter(val => { 
            for (let i = 0; i <= 20; i++) {
           return val.teamId.toString().includes(newarray[i])
            } 
        }).map((product) =>
                                <div className=" " key={product.teamId}>
                                    <div>{product.Username},</div>
                               </div>
                            )}</>:<></>}
       
     </div>
    )
}