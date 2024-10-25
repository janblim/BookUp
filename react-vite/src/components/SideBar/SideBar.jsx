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
                        <NavLink to='/books/favorites'><FaRegHeart className='icon'/>Favorites</NavLink>
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
                                    <NavLink to='/sorted/1' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Fiction
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/2' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Science Fiction
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/3' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/4' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Philosophy
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/5' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Self Help
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/6' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Psychology
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/7' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Feminism
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/sorted/8' onClick={() => window.scrollTo({top : 0, behavior: "smooth"})}>
                                        Science
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
