import React, {useState} from "react";
import { Rnd } from 'react-rnd';

const Daycard = () => {
    
    // if there's no value it won't appear
    const [titleSpaceColor, setTitleSpaceColor] = useState("#5715d1");
    const [title, setTitle] = useState("No Title Set")

    const [dateHappening, setDateHappening] = useState("2025-01-23"); // date
    const [timeHappening, setTimeHappening] = useState("4:20 pm"); // time
    const [instructor, setInstructor] = useState("Mr. Simon");
    const [theClass, setTheClass] = useState("Sample");
    const [room, setRoom] = useState("B32");


    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus dolorum excepturi expedita id itaque labore molestias officiis tempore totam?");

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
            <div className={"title_container"}>
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