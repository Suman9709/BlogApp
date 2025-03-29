import React from 'react'
import gmail from "../Components/ImgAssets/gmail.svg"
import instagram from "../Components/ImgAssets/instagram.svg"
import linkedin from "../Components/ImgAssets/linkedin.svg"

const Footer = () => {
    return (
        <div className='w-full flex flex-col justify-between items-center h-36 p-4 text-black z-10 bg-white shadow-2xl absolute'>

            <div className='flex justify-between w-full'>
                <div>
                    <h1 className='font-semibold text-2xl'>ExpressInk</h1>
                </div>
                <div className='flex gap-2'>
                    <img src={gmail} alt="" width="40" />
                    <img src={instagram} alt="" width="40" />
                    <img src={linkedin} alt="" width="40" />
                </div>
            </div>
            <div className='w-full justify-between flex items-baseline'>
                <div className='flex gap-4'>
                    <span>© 2025 Blogs</span>
                    <span>Privacy</span>
                    <span>Cookies</span>
                </div>
                <div className='flex '>
                    <ul className='flex gap-4 list-none'>
                        <li>Jobs</li>
                        <li>Freelance</li>
                        <li>Designer</li>
                        <li>Tags</li>
                        <li>Place</li>
                        <li>Resource</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer