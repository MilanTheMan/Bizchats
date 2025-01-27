import React, {useState} from "react";
import { Rnd } from 'react-rnd';

const Daycard = () => {
    
    // if there's no value it won't appear
    const [titleSpaceColor, setTitleSpaceColor] = useState("#5715d1");
    const [title, setTitle] = useState("No Title Set")

    const [dateHappening, setDateHappening] = useState(); // date
    const [timeHappening, setTimeHappening] = useState(); // time
    const [instructor, setInstructor] = useState();
    const [room, setRoom] = useState();

    const [description, setDescription] = useState();

    const html = (
        <div>



        </div>
    )

    function detailConstructor(){

    }


    detailConstructor();

    
    return (
        <div className={"day_card"}>
            <div className={"title_container"}>
                <p>{title}</p>
            </div>
            <div className={"actual_content"}>
                {dateHappening ? (<p>Happening on {dateHappening}</p>) : ''} {/*do the same for the rest*/}
            </div>
        </div>
    )   
}

export default Daycard;