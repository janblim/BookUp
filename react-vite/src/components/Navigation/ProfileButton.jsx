import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const goToProfile = (e) => {
    e.stopPropagation();
    window.scrollTo(0, 0)
    navigate(`/profile/${user.id}`)
}

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    window.scrollTo(0, 0);
    navigate('/');
    closeMenu();
  };

  return (
    <>
      <button id='profile-button' onClick={toggleMenu}>

        {user ? (
            <img className='user-pic' src={user.picture} alt={user.username}/>
        ) : (
            <FaUserCircle id='fa-user-circle'/>
        )
      }


      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <div>
              <li id='visit-profile' onClick={(e) => goToProfile(e)}>{user.username}</li>
              <li id='email'>{user.email}</li>
              <li id='logout-button'>
                <button onClick={logout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div className='menu-dropdown'>
              <div>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                  />
              </div>
              <div>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                  />
              </div>
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
