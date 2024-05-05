import React from 'react'; // Example import
import './Navbar.css';
import Logo from "./logo/Logo";
import Searchbar from "./searchbar/Searchabar";
import Actions from "./actions/Actions"; // Example import with CSS
export default function Navbar() {
    return <div className={"navbar"}>
        <Logo/>
        <Searchbar/>
        <Actions/>


    </div>;
}


