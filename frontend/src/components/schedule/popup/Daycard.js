import React, {useState} from "react";
import { Rnd } from 'react-rnd';

const Daycard = () => {
    
    // if there's no value it won't appear
    const [titleSpaceColor, setTitleSpaceColor] = useState("#5715d1");
    const [title, setTitle] = useState("No Title Set")

    const [dateHappening, setDateHappening] = useState("2025-01-23"); // date
    const [timeHappening, setTimeHappening] = useState("4:20 pm"); // time
    const [instructor, setInstructor] = useState("Mr. Simon");
    const [room, setRoom] = useState("B32");

    const [description, setDescription] = useState("asd;hsdio;fhasdklfhasdkl;jsdkfjasdkl;fjasdkl;fjsdkl;fjasdkl;fjasdkl;fjasdklfjasdkfjasdkl;fjasdklfjasdkl;fj;asdklfjakl;sdjfkl;asdjf;");
    
    return (
        <Rnd className={"day_card"}>
            <div className={"title_container"}>
                <p>{title}</p>
            </div>
            <div className={"actual_content"}>
                {dateHappening ? (<p>Date: {dateHappening}</p>) : ''} {/*do the same for the rest*/}
                {timeHappening ? (<p>Time: {timeHappening}</p>) : ''}
                {instructor ? (<p>Instructor: {instructor}</p>) : ''}
                {room ? (<p>Room: {room}</p>) : ''}
                {description ? (<p>{description}</p>) : ''}
            </div>

            ``
        </Rnd>
    )   
}

export default Daycard;