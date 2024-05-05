import React from 'react';
import './Landing.css';
import Navbar from "../navbar/Navbar";
import Filter from "../mainbar/filter/Filter";
import Posts from "../mainbar/posts/Posts";

export default function Landing() {
    return (
        <div>
            <Navbar/>
            <Filter/>
            <Posts/>
    </div>
    )
}