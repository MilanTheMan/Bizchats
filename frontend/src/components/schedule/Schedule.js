import React, {useState, useEffect, useRef} from 'react';
import Header from "../header/Header";
import Daycard from "./popup/Daycard";
import ProfileCard from "../profile_card/ProfileCard";

const Schedule = () => {
    /*
    todo: make it so that the calendar defaults to the current month
    and will get the days that are marked with an event, such as when 
    an assignment is due or if there's am exam
    */

    // this will get replaced later
    var sampleSpecialDays = [ // id is just square number
        {
            "id": 2,
            "titleSpaceColor": "red",
            "title": "Assignment 1",
            "theClass": "Math",
            "dateHappening": "2024-12-30",
            "description": "The due date has already passed. Marks have not been given out yet."
        },
        {
            "id": 3,
            "titleSpaceColor": "pink",
            "title": "C23 Math Class Lab",
            "dateHappening": "2024-12-31",
            "timeHappening": "4:00PM",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 4,
            "titleSpaceColor": "yellow",
            "title": "Today",
            "dateHappening": "2025-01-01",
            "description": "Nothing to do today."
        },
        {
            "id": 5,
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-02",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 7,
            "titleSpaceColor": "green",
            "title": "Assignment 2",
            "dateHappening": "2025-01-04",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 10,
            "titleSpaceColor": "pink",
            "title": "C23 Math Class Lab",
            "dateHappening": "2025-01-07",
            "timeHappening": "4:00PM",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 12,
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-09",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 15,
            "titleSpaceColor": "red",
            "title": "Assignment 2",
            "theClass": "Math",
            "dateHappening": "2025-01-12",
            "description": "The due date will be on a Sunday."
        },
        {
            "id": 17,
            "titleSpaceColor": "pink",
            "title": "C23 Math Class Lab",
            "dateHappening": "2025-01-14",
            "timeHappening": "4:00PM",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 19,
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-16",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 24,
            "titleSpaceColor": "pink",
            "title": "C23 Math Class Lab",
            "dateHappening": "2025-01-21",
            "timeHappening": "4:00PM",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 25,
            "titleSpaceColor": "red",
            "title": "Quiz 3",
            "theClass": "Math",
            "dateHappening": "2025-01-22",
            "description": "The due date will be on a Wednesday."
        },
        {
            "id": 26,
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-23",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 31,
            "titleSpaceColor": "pink",
            "title": "C23 Math Class Lab",
            "dateHappening": "2025-01-28",
            "timeHappening": "4:00PM",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "id": 33,
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-30",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
    ]

    const [dayCards, setDaycards] = useState([]);
    function showDayCard(id, titleSpaceColor, title = "No title was set.",  dateHappening, instructor, theClass, room, description){
        if(dateHappening != "no"){
            setDaycards((prevCards) => [
                ...prevCards,
                <Daycard id={id} titleSpaceColor={titleSpaceColor} title={title} dateHappening={dateHappening} instructor={instructor} theClass={theClass} room={room} description={description}/>
            ]);
        }
    }

    function getEarliestEvents(array, number){ //
        let returnArray = []
        for (let i = 0; i < number; i++) {
            returnArray.push(array[i]);
        }

        return returnArray;
    }

    function addToSamples(array){
        let returnArray = [];
        let alreadySet = [];

        for (let i = 0; i < array.length; i++) {
            alreadySet.push(array[i]["id"])
        }

        console.log(alreadySet)

        for (let i = 1; i < 36; i++){
            if (alreadySet.includes(i)) {
                console.log("contains " + i);
                console.log(i);
                returnArray.push(array.find(x => x["id"] === i));
            }
            else{
                console.log("does not contain " + i)
                returnArray.push({
                    "id": i,
                    "titleSpaceColor": "default",
                    "dateHappening": "no",
                })
            }
        }

        return returnArray;
    }

    let earliestEvents = getEarliestEvents(sampleSpecialDays, 5);
    sampleSpecialDays = addToSamples(sampleSpecialDays);

    console.log(earliestEvents)
    console.log(sampleSpecialDays);



    
    return(
        <div id={"schedule"}>
            <div className={"day_card_holder"}>
                {dayCards.map(dayCard => dayCard)}
            </div>

            <h1>Schedule</h1>

            <div id={"schedule_content"}>
                <div id={"calendar"}>
                    <div id={"calendar_day_names"}>
                        <p>Sunday</p>
                        <p>Monday</p>
                        <p>Tuesday</p>
                        <p>Wednesday</p>
                        <p>Thursday</p>
                        <p>Friday</p>
                        <p>Saturday</p>
                    </div>
                    <div id={"calendar_days"}>{/*this will be a 7x5 grid, also every day is a placeholder*/}
                        {sampleSpecialDays.map((day) => (
                            <div className={`calendar_day col_${day.titleSpaceColor}`} onClick={() => {
                                showDayCard(day.id, day.titleSpaceColor, day.title, day.dateHappening, day.instructor, day.theClass, day.room, day.description);
                            }}>
                                <p className={"calendar_day_number"}>{day.dateHappening}</p>
                                <p>{day.title}</p>
                            </div>
                        ))}

                        {/*

                        {sampleSpecialDays.map((day) => (
                            <div className={`calendar_day col_${day.titleSpaceColor}`}>
                                <p className={"calendar_day_number"}>{day.dateHappening}</p>
                                <p>{day.title}</p>
                            </div>
                        ))}
                        */}

                        {/*
                        <div className={"calendar_day col_yellow"}>
                            <p className={"calendar_day_number"}>29</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day col_green"}>
                            <p className={"calendar_day_number"}>30</p>
                            <p>Assignment 1</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>31</p>
                            <p>C23 Math Class Lab</p>
                        </div>
                        <div className={"calendar_day col_blue"}>
                            <p className={"calendar_day_number"}>1</p>
                            <p>Today</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>2</p>
                            <p>C23 Math Class Lecture</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>3</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day col_red"}>
                            <p className={"calendar_day_number"}>4</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_pink"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_pink"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_green"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_yellow"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_blue"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_blue"}>
                            <p className={"calendar_day_number"}>30</p>
                            <p>Assignment 1</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>31</p>
                            <p>C23 Math Class Lab</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>1</p>
                            <p>Today</p>
                        </div>
                        <div className={"calendar_day col_pink"}>
                            <p className={"calendar_day_number"}>2</p>
                            <p>C23 Math Class Lecture</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>3</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day col_red col_pink"}>
                            <p className={"calendar_day_number"}>4</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_red"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_default"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_pink"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day col_green"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>

                        */}

                    </div>
                </div>

                <aside id={"schedule_events"}>
                    <h4>Events</h4>
                    <div id={"schedule_event_list"}>
                        {earliestEvents.map((day) => (
                            <div className={`event col_${day.titleSpaceColor}`} onClick={() => {
                                showDayCard(day.id, day.titleSpaceColor, day.title, day.dateHappening, day.instructor, day.theClass, day.room, day.description);
                            }}>
                                <p>{day.dateHappening}</p>
                                <p>{day.title}</p>
                            </div>
                        ))}

                        {/*
                            <div className={`calendar_day col_${day.titleSpaceColor}`}>
                                <p className={"calendar_day_number"}>{day.dateHappening}</p>
                                <p>{day.title}</p>
                            </div>
                        */}


                        {/*
                        <div className={"event col_green"}>
                            <p>Description</p>
                        </div>
                        <div className={"event col_red"}>
                            <p>Description</p>
                        </div>
                        <div className={"event col_yellow"}>
                            <p>Description</p>
                        </div>
                        <div className={"event col_blue"}>
                            <p>Description</p>
                        </div>
                        <div className={"event col_pink"}>
                            <p>Description</p>
                        </div>
                        */}
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Schedule;

//todo: polish it