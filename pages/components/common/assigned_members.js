import React, { useContext,useState,useEffect } from "react";
import { CounterContext } from "../contex/adminProvider";
import Axios from "axios";
export default function AssignedMenber(props){
    const{removeTeammember,designTeamList}=useContext(CounterContext)
    const [team, setTeam] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data))
            .catch((err) => { return err; })
    });
    return(
           <div className="mt-3 row">
           {team.filter(val => {
               for (let i = 0; i <= 20; i++) {
                if (val.teamId === designTeamList[i]) {
                                            return val;
                                        }
                                    }
                                }).map((product) =>
                                    <div className="assignTeam-m me-1 col " key={product.teamId}>
                                        <div>{product.Username}</div> <button className="removeTeammember" onClick={()=>removeTeammember(product.teamId)}>X</button>
                                   </div>
                                )}
        </div>
    )
}