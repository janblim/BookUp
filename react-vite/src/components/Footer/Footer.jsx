import { Link } from 'react-router-dom';
import './Footer.css'

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
