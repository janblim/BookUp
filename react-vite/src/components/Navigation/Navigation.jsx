import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";


function Navigation() {
  return (
    <div id='nav-bar'>
      <div>
          <NavLink id='home-button' to="/"> <PiArrowFatLinesUpFill id='up-logo'/> Book<IoMdBook id='book-logo'/>p</NavLink>
      </div>

      <div id='nav-buttons'>

        <span className='button'>
          + Create New Book
        </span>

        <span className='button'>
          <ProfileButton />
        </span>

      </div>
    </div>
  );
}

export default Navigation;
