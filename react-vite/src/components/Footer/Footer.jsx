import { Link, NavLink } from 'react-router-dom';
import './Footer.css'
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className='footer'>

                <div className='footer-header'>
                    Jan Lim ©
                </div>
                <div>
                    <Link className='jan-links' to={'https://github.com/janblim'}>GitHub</Link>
                </div>
                <div>
                    <Link className='jan-links' to={'https://www.linkedin.com/in/jan-lim-60859b32/'}>LinkedIn</Link>
                </div>

        </footer>
    )
}


export default Footer;
