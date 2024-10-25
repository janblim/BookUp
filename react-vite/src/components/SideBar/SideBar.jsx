import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './SideBar.css'
import { FaRegSmile } from "react-icons/fa";
import { PiHouse } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";





const SideBar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [sideBarClose, setSideBarClose] = useState(false)
    const user = useSelector(state => state.session.user);

    const toggleSubMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        showSubMenu ? setShowSubMenu(false) : setShowSubMenu(true)
        setSideBarClose(false)
      };

    const toggleSidebar = (e) => {
        e.stopPropagation();
        if(sideBarClose){
            setSideBarClose(false)
        }
        else {
            setSideBarClose(true)
            setShowSubMenu(false)
        }
    }

    return (
        <div id='sidebar' className={sideBarClose ? 'sidebar-close' : 'sidebar'}>
            <ul id='menu'>
                <li>
                    <button onClick={(e) => toggleSidebar(e)} id='toggle-btn'>
                        <MdKeyboardDoubleArrowLeft className={ sideBarClose ? 'toggle-btn-rotate' : 'toggle-btn'}/>
                    </button>
                </li>
                <li>
                    <NavLink to='/'><GrHomeRounded className='icon'/>Home</NavLink>
                </li>
                { user && user.id ?
                <>
                    <li>
                        <NavLink to='/friends'><FaRegSmile className='icon'/>Friends</NavLink>
                    </li>
                    <li>
                        <NavLink to='/favorites'><FaRegHeart className='icon'/>Favorites</NavLink>
                    </li>
                </>
                :
                null}
                <li>
                    <button onClick={(e)=>toggleSubMenu(e)} class='dropdown-btn'>
                        <PiBooksBold className='icon'/>
                        <span>Genres</span>
                        <RiArrowDropDownLine className={ showSubMenu ? 'menu-arrow-rotate' : 'menu-arrow'}/>
                    </button>
                        <ul className={ showSubMenu ? 'sub-menu-show': 'sub-menu'}>
                            <div>

                                <li>
                                    <NavLink to='/genres/1'>
                                        Fiction
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/2'>
                                        Science Fiction
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/3'>
                                        History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/4'>
                                        Philosophy
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/5'>
                                        Self Help
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/6'>
                                        Psychology
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres/7'>
                                        Feminism
                                    </NavLink>
                                </li>
                            </div>
                        </ul>
                </li>
                <li>
                    <NavLink to='/about'><FaRegCircleQuestion className='icon'/>About</NavLink>
                </li>
            </ul>
        </div>
    )
}


export default SideBar;
