import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../header/Header";

function NotFound(){
    return(
        <div id={"not_found"}>
            <h1>Whoops!</h1>
            <p>page not found</p>
        </div>
    )
}

export default NotFound;