import { BiCopyright } from "react-icons/bi"; 
import { SiZalo } from "react-icons/si"; 
import { Link, useNavigate } from "react-router-dom";


// Footer.tsx
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
    <footer className="bg-gray-50 p-6">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between md:space-y-0">
            <div className="flex items-center ">  
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <div className="">
                <p></p>
                <img
                    src={require("../../assets/logo.png")}
                    alt="Store Logo"
                    className="h-14"
                />                
                </div>
            </Link>
                <div>
                <BiCopyright className=" text-gray-600" size={20}/>
                <div className="text-lg font-sans">LapTech</div>
                </div>
            </div> 
            {/* Link và thông tin liên hệ */}
            <div className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left mt-4 md:mt-0">
                <a href="#about" className="text-gray-700 hover:text-blue-600">
                About Us
                </a>
                <a href="#help" className="text-gray-700 hover:text-blue-600">
                Help
                </a>
                <p className="text-gray-700">Hotline: 0123 456 789</p>
                <p className="text-gray-700">Tư vấn: 0123 456 789</p>
            </div>
        </div>

      {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8 text-gray-700">
        <a href="#instagram" className="hover:text-blue-600">
            <FaInstagram size={26} />
        </a>
        <a href="#facebook" className="hover:text-blue-600">
            <FaFacebook size={26} />
        </a>
        <a href="#zalo" className="hover:text-blue-600">
            <SiZalo size={26}/>
        </a>
        <a href="#twitter" className="hover:text-blue-600">
            <FaTwitter size={26} />
        </a>
        <a href="#tiktok" className="hover:text-blue-600">
            <FaTiktok size={26} />
        </a>
        </div>
    </footer>
    );
};

export default Footer;
