import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

export default function Navbar(){


    return(
        <div>
            <Link to={"/"}>
                hello from navbar
            </Link>
            <Link to={"/tic-tac-toe"}>
                play tic tac toe
            </Link>
        </div>
       
    )
}