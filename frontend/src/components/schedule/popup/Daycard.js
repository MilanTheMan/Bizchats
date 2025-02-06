import React, {useState} from "react";
import { Rnd } from 'react-rnd';

const Daycard = (props) => {
    
    // if there's no value it won't appear
    const [titleSpaceColor, setTitleSpaceColor] = useState(props.titleSpaceColor);
    const [title, setTitle] = useState(props.title)

    const [dateHappening, setDateHappening] = useState(props.dateHappening); // date
    const [timeHappening, setTimeHappening] = useState(props.timeHappening); // time
    const [instructor, setInstructor] = useState(props.instructor);
    const [theClass, setTheClass] = useState(props.theClass);
    const [room, setRoom] = useState(props.room);


    const [description, setDescription] = useState(props.description);

    const [isOpen, setIsOpen] = useState(true);

    function closeCard(){
        setIsOpen(false);
    }

    if (!isOpen){
        return null;
    }

    return (
        <Rnd className={"day_card"}
             default={{
                 x: 100,
                 y: 100,
                 width: 320,

             }}>
            <div className={`title_container col_${titleSpaceColor}`}>
                <p>{title}</p>
            </div>
            <div className={"actual_content"}>
                {theClass ? (<p>Class: {theClass}</p>) : ''}
                {dateHappening ? (<p>Date: {dateHappening}</p>) : ''}
                {timeHappening ? (<p>Time: {timeHappening}</p>) : ''}
                {instructor ? (<p>Instructor: {instructor}</p>) : ''}
                {room ? (<p>Room: {room}</p>) : ''}
                {description ? (<p>{description}</p>) : ''}
            </div>

            <button className={"close_day_card"} onClick={closeCard}>X</button>
        </Rnd>
    )
}

export default Daycard;