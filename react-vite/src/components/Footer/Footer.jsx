import { Link, NavLink } from 'react-router-dom';
import './Footer.css'
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='left-ftr'>

            </div>
            <div className='right-ftr'>
                <ul>
                    <li className='footer-header'>
                        Jan Lim
                    </li>
                    <li>
                        <Link to={'https://github.com/janblim'}>GitHub</Link>
                    </li>
                    <li>
                        <Link to={'https://www.linkedin.com/in/jan-lim-60859b32/'}>LinkedIn</Link>
                    </li>

                </ul>
                <ul>
                    <ul className='social-media'>
                        <NavLink to={'https://www.instagram.com/appacademyio/'}><FaInstagram className='social'/></NavLink>
                        <NavLink to={'https://www.facebook.com/appacademyio'}><RiFacebookBoxFill className='social'/></NavLink>
                        <NavLink to={'https://x.com/appacademyio'}><BsTwitterX className='social'/></NavLink>
                        <NavLink to={'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran'}><FaYoutube className='social'/></NavLink>
                    </ul>
                </ul>
            </div>

        </footer>
    )
}


export default Footer;