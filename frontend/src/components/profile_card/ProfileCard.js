import React, {useState} from "react";
import { Rnd } from 'react-rnd';
import default_pfp from "../../img/defaulticon.png"
import "./style.css"


const ProfileCard = () => {

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
                <img className={"pfp"} src={default_pfp} alt={"the profile picture"}/>
                <h4>Firstname Lastname</h4>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur beatae eius nihil quidem, suscipit. Porro repellat sequi tenetur voluptatem.</p>

            <button className={"close_profile_card"} onClick={closeCard}>X</button>
        </Rnd>
    )
}

export default ProfileCard;