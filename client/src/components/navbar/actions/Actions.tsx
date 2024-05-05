import React from 'react';
import './Actions.css';
import Button from "../../button/Button"; // Make sure the path is correct
import PersonIcon from '@mui/icons-material/Person';
import { ArrowDropDown } from "@mui/icons-material";

export default function Actions() {
    return (
        <div className="actions">
            <Button label="Log In"/>
            <Button primary label="Sign Up"/>
            <div className="profile">
                <PersonIcon className="hoverable"/>
                <ArrowDropDown className="hoverable"/>
            </div>
        </div>
    );
}
