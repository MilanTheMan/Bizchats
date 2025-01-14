import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Mainpage = () =>  {

    //todo: later this will have to be dynamic and not have simon over and over again
    return(
        <div id={"main_page"}>
            <Navbar/>
            

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

                <aside class="due_dates">
                    <div class="duedate">
                        {/*//implement month, day number, title and desc*/}
                        <div class="date">
                            <p class="day">2</p>
                            <p class="month">Febuary</p>
                        </div>
                        <p className='description'>short description of the assignment or whatever</p>
                    </div>
                    <div class="duedate">
                        {/*//implement month, day number, title and desc*/}
                        <div class="date">
                            <p class="day">2</p>
                            <p class="month">Febuary</p>
                        </div>
                        <p className='description'>short description of the assignment or whatever</p>
                    </div>
                    <div class="duedate">
                        {/*//implement month, day number, title and desc*/}
                        <div class="date">
                            <p class="day">2</p>
                            <p class="month">Febuary</p>
                        </div>
                        <p className='description'>short description of the assignment or whatever</p>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Mainpage;