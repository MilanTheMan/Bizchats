import React, {useState, useEffect, useRef} from 'react';
import Header from "../header/Header";
import Daycard from "./popup/Daycard";

const Schedule = () => {
    /*
    todo: make sample data for the calendar

    todo: make it so that the calendar defaults to the current month
    and will get the days that are marked with an event, such as when 
    an assignment is due or if there's am exam
    */

    const sampleSpecialDays = [
        {
            "titleSpaceColor": "red",
            "title": "Assignment 1",
            "theClass": "Math",
            "dateHappening": "2024-12-30",
            "description": "The due date has already passed. Marks have not been given out yet."
        },
        {
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
            "titleSpaceColor": "yellow",
            "title": "Today",
            "dateHappening": "2025-01-01",
            "description": "Nothing to do today."
        },
        {
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-02",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "titleSpaceColor": "green",
            "title": "Assignment 2",
            "dateHappening": "2025-01-04",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
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
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-09",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
            "titleSpaceColor": "red",
            "title": "Assignment 2",
            "theClass": "Math",
            "dateHappening": "2025-01-12",
            "description": "The due date will be on a Sunday."
        },
        {
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
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-16",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
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
            "titleSpaceColor": "red",
            "title": "Quiz 3",
            "theClass": "Math",
            "dateHappening": "2025-01-22",
            "description": "The due date will be on a Wednesday."
        },
        {
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-23",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
        {
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
            "titleSpaceColor": "blue",
            "title": "C23 Math Class Lecture",
            "dateHappening": "2025-01-30",
            "instructor": "Professor McTeacher",
            "theClass": "Math",
            "room": "C23",
            "description": "We will do some stuff what we have learned in the lecture for last week"
        },
    ]



    
    return(
        <div id={"schedule"}>
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
                            <div className={`calendar_day col_{day.titleSpaceColor}`}>
                                <p className={"calendar_day_number"}>{day.dateHappening}</p>
                                <p>{day.title}</p>
                            </div>
                        ))}

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
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Schedule;

//todo: polish it