import React, {useState, useEffect, useRef} from 'react';

const Schedule = () => {
    /*
    todo: make it so that the calendar defaults to the current month
    and will get the days that are marked with an event, such as when 
    an assignment is due or if there's am exam
    */
    
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
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>29</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>30</p>
                            <p>Assignment 1</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>31</p>
                            <p>C23 Math Class Lab</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>1</p>
                            <p>Today</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>2</p>
                            <p>C23 Math Class Lecture</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>3</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>4</p>
                            <p></p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 2</p>
                        </div>
                        <div className={"calendar_day"}>
                            <p className={"calendar_day_number"}>5</p>
                            <p>Start Assignment 3</p>
                        </div>
                    </div>
                </div>

                <aside id={"schedule_events"}>
                    <h4>Events</h4>
                    <div id={"schedule_event_list"}>
                        <div className={"event red"}>
                            <p>Description</p>
                        </div>
                        <div className={"event green"}>
                            <p>Description</p>
                        </div>
                        <div className={"event blue"}>
                            <p>Description</p>
                        </div>
                        <div className={"event yellow"}>
                            <p>Description</p>
                        </div>
                        <div className={"event pink"}>
                            <p>Description</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Schedule;

//todo: add the sidebar that shows you the upcoming events