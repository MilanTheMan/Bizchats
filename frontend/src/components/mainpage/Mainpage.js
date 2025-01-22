import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Header from "../header/Header";



const Mainpage = () =>  {

    //todo: later this will have to be dynamic and not have simon over and over again
    return(
        <div id={"main_page"}>
            <Header/>
            <Navbar/>

            <h1>Welcome to BizChats!</h1>
            <div className={"actual_content"}>
                <div class="class_list">
                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>
                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>
                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>
                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>

                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>

                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>                <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>

                    <div class="listed_class">
                        <img src='https://geology.com/world/world-map.gif'/>
                        <p>Mr. Simon's Geography class</p>
                    </div>
                </div>

                <aside class="events">

                    <h4>Events</h4>

                    <div className={"event_list"}>
                        <div className="event">
                            {/*//implement month, day number, title and desc*/}
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">Febuary</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            {/*//implement month, day number, title and desc*/}
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">Febuary</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                        <div className="event">
                            {/*//implement month, day number, title and desc*/}
                            <div className="date">
                                <p className="day">2</p>
                                <p className="month">Febuary</p>
                            </div>
                            <p className='description'>short description of the assignment or whatever</p>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default Mainpage;