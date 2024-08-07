import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='px-4 md:px-12 py-4'>
        <div className='text-white text-base font-semibold flex justify-center items-center gap-2'>
            <p className=''>Obycodez55 &copy; 2024</p>
            <a target='_blank' href="https://github.com/Obycodez55" className="p-1"><FaGithub /></a>
            <a target='_blank' href="https://www.linkedin.com/in/adebayo-obikoya-557b0626a/" className="p-1"><FaLinkedin /></a>
            <a target='_blank' href="https://x.com/obikoya_adebayo" className="p-1"><FaXTwitter /></a>
            <a target='_blank' href="https://obycodez.vercel.app/" className="p-1"><CgWebsite /></a>
            </div>
    </div>
  )
}

export default Footer