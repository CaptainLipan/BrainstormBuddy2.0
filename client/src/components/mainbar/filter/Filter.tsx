import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';

type FilterOption = 'newReleases' | 'trending';
type ReleaseType = 'Latest Releases' | 'Oldest Releases';

export default function Filter() {
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>('newReleases');
    const [releaseType, setReleaseType] = useState<ReleaseType>('Latest Releases');
    const [showDropdown, setShowDropdown] = useState(false);
    const [hoveredReleaseType, setHoveredReleaseType] = useState<ReleaseType | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false); // Close the dropdown if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFilterClick = (filter: FilterOption) => {
        setSelectedFilter(filter);
    };

    const handleDropdownToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const selectReleaseType = (type: ReleaseType) => {
        setReleaseType(type);
        setShowDropdown(false);
    };

    const handleMouseEnter = (type: ReleaseType) => {
        setHoveredReleaseType(type);
    };

    const handleMouseLeave = () => {
        setHoveredReleaseType(null);
    };

    return (
        <div className="filter-container">
            <button
                className={`filter-button ${selectedFilter === 'newReleases' ? 'active' : ''}`}
                onClick={() => handleFilterClick('newReleases')}
            >
                <AccessTimeIcon />
                {hoveredReleaseType || releaseType}
                <ArrowDropDownIcon onClick={handleDropdownToggle} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                {showDropdown && (
                    <div className="dropdown-menu" ref={dropdownRef}>
                        <div className="dropdown-item"
                             onMouseEnter={() => handleMouseEnter('Latest Releases')}
                             onMouseLeave={handleMouseLeave}
                             onClick={() => selectReleaseType('Latest Releases')}>
                            Latest Releases
                        </div>
                        <div className="dropdown-item"
                             onMouseEnter={() => handleMouseEnter('Oldest Releases')}
                             onMouseLeave={handleMouseLeave}
                             onClick={() => selectReleaseType('Oldest Releases')}>
                            Oldest Releases
                        </div>
                    </div>
                )}
            </button>
            <button
                className={`filter-button ${selectedFilter === 'trending' ? 'active' : ''}`}
                onClick={() => handleFilterClick('trending')}
            >
                <WhatshotIcon />
                Trending
            </button>
        </div>
    );
}
