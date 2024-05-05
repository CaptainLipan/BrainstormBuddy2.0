import React from 'react'; // Example import
import './Searchbar.css'; // Example import with CSS
import SearchIcon from '@mui/icons-material/Search';

export  default function Searchbar() {
    return <div className="searchbar">
        <label htmlFor="searchabar">
            <SearchIcon/>

        </label>
       <input id="searchabar" type="text" placeholder="Search"/>

</div>
    ;
}
