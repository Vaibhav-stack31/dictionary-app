import React from 'react';
import '../styles/Footer.css';
import { IconBrandInstagram, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
const Footer = () => {
    return (
        <footer className='footer-container'>
            <p>Connect with m on: </p>
            <button className='socialMediaButtons'><IconBrandInstagram size={30} /></button>
            <button className="socialMediaButtons"><IconBrandGithub size={30} /></button>
            <button className="socialMediaButtons"><IconBrandLinkedin size={30} /></button>
        </footer>
    )
}

export default Footer;

