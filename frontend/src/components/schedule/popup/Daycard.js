import React, {useState} from "react";
import { Rnd } from 'react-rnd';

const Daycard = () => {
    
    // if there's no value it won't appear
    const [titleSpaceColor, setTitleSpaceColor] = useState("#5715d1");
    const [dateHappening, setDateHappening] = useState(); // date
    const [timeHappening, setTimeHappening] = useState(); // date
    const [instructor, setInstructor] = useState();
    const [room, setRoom] = useState();

    const [description, setDescription] = useState();

    
    
    
    
    return (
        <div className={"day_card"}>
            <div className={"title_container"}>
                <p>dfasdfasdfasdfasdf</p>
            </div>
        </div>
    )   
}

export default Daycard;