import React, {useState} from "react";
import { Rnd } from 'react-rnd';
import default_pfp from "../../img/defaulticon.png"
import "./style.css"


const ProfileCard = (props) => {
    const [pfp, setPfp] = useState(default_pfp);
    const [user, setUser] = useState(props.user);
    const [descripton, setDescripton] = useState(props.description);

    const [isOpen, setIsOpen] = useState(true);

    function closeCard(){
        setIsOpen(false);
    }

    if (!isOpen){
        return null;
    }

    return(
        <Rnd className={"profile_card"} default={{
            x: 500,
            y: 500,
            width: 320,}}>
            <div className={"pfp_and_name"}>
                <img className={"pfp"} src={pfp} alt={"the profile picture"}/>
                <h4>{user}</h4>
            </div>
            <p>{descripton}</p>

            <button className={"close_profile_card"} onClick={closeCard}>X</button>
        </Rnd>
    )
}

export default ProfileCard;