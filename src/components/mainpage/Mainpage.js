import React, {useState, useEffect, useRef} from 'react';
import {Outlet, Link} from 'react-router-dom';

const Mainpage = () =>  {
    

    //todo: lateer this will have to be dynamic and not have simon over and over again
    return(
        <section id={"main_page"}>
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
                    //implement month, day number, title and desc
                </div>
            </aside>
        </section>
    )
}

export default Mainpage;