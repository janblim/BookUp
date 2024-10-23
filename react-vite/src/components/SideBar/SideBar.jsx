import { Link, NavLink } from 'react-router-dom';
import './SideBar.css'
import { FaRegSmile } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";





const SideBar = () => {
    return (
        <div id='sidebar'>
            <ul id='menu'>
                <li>
                    <button onClick={(e) => toggleSidebar(e)} id='toggle-btn'>
                        <IoMenu />
                    </button>
                </li>
                <li>
                    <GrHomeRounded />
                    <span className='bar-item'>Home</span>
                </li>
                <li>
                    <FaRegSmile />
                    <span className='bar-item'>Friends</span>
                </li>
                <li>
                    <FaRegHeart />
                    <span className='bar-item'>Favorites</span>
                </li>
                <li>
                    <button>
                        <PiBooksBold />
                        <span className='bar-item'>Genres</span>
                        <RiArrowDropDownLine />
                    </button>
                        <ul class='sub-menu'>
                            <div>
                                <li>Fiction</li>
                                <li>Science Fiction</li>
                                <li>History</li>
                                <li>Philosophy</li>
                                <li>Self Help</li>
                                <li>Psychology</li>
                                <li>Feminism</li>
                            </div>
                        </ul>
                </li>
                <li>
                    <FaRegCircleQuestion />
                    <span className='bar-item'>About</span>
                </li>
            </ul>
        </div>
    )
}


export default SideBar;
