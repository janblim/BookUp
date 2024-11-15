import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateBookModal from "../CreateBookModal/CreateBookModal";


function Navigation() {
  const user = useSelector( state => state.session.user)

  return (
    <div id='nav-bar'>
      <div>
          <NavLink id='home-button' to="/"> <PiArrowFatLinesUpFill id='up-logo'/>
          Book<IoMdBook id='book-logo'/>p</NavLink>
      </div>

      <div id='nav-buttons'>

        {user ?
        <span id='create-book'>
          <OpenModalButton
          modalComponent={<CreateBookModal/>}
          buttonText='+ Create New Book'
          />
        </span>
        :
        null}
        <span className='button'>
          <ProfileButton />
        </span>

      </div>
    </div>
  );
}

export default Navigation;
