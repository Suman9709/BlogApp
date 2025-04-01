import React from 'react';
import gmail from "../Components/ImgAssets/gmail.svg";
import instagram from "../Components/ImgAssets/instagram.svg";
import linkedin from "../Components/ImgAssets/linkedin.svg";

const Footer = () => {
    return (
        <div className='w-full flex flex-col items-center h-auto p-4 text-black z-10 bg-white shadow-2xl relative md:h-36'>
            {/* Top Section */}
            <div className='flex flex-col md:flex-row justify-between items-center w-full text-center md:text-left'>
                <h1 className='font-semibold text-2xl'>ExpressInk</h1>
                <div className='flex gap-3 mt-2 md:mt-0'>
                    <img src={gmail} alt="Gmail" className='w-8 h-8' />
                    <img src={instagram} alt="Instagram" className='w-8 h-8' />
                    <img src={linkedin} alt="LinkedIn" className='w-8 h-8' />
                </div>
            </div>
            {/* Bottom Section */}
            <div className='w-full flex flex-col md:flex-row justify-between items-center mt-4 text-sm'>
                <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
                    <span>© 2025 Blogs</span>
                    <span>Privacy</span>
                    <span>Cookies</span>
                </div>
                <ul className='flex flex-wrap gap-4 justify-center mt-2 md:mt-0'>
                    <li>Jobs</li>
                    <li>Freelance</li>
                    <li>Designer</li>
                    <li>Tags</li>
                    <li>Place</li>
                    <li>Resource</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;