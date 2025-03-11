"use client"
import { useState } from "react";
import { Linkedin, Share2} from "lucide-react";
import { Twitter, Facebook, Instagram } from "@/components/icons/customIcons";

interface ProfileProps {
    name: string;
    role: string;
    image: string;
  }

const ProfileCard: React.FC<ProfileProps> = ({ name, role, image }) => {
  const [hover, setHover] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center p-4" 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => { setHover(false); setShowSocial(false); }}>
      {/* Avatar & Hover Effect */}
      <div className="relative">
        <div className={`absolute top-32 left-1/2 transform -translate-x-1/2 w-64 h-32 border-b-8 rounded-b-full transition-all duration-500 ${
        hover ? "border-teal-500" : "border-gray-200"
        } `}/>
        
        <img
          src={image} 
          alt={name}
          className="w-60 h-60 rounded-full object-cover"
        />
        <div 
          className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center" 
          onMouseEnter={() => setShowSocial(true)}
        ></div>
        {/* Share Button */}
        <div 
          className={`absolute w-12 h-12 top-2 left-2 bg-white p-2 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 
            ${showSocial ? "bg-[#00c7c4]" : "bg-white"}`}>
          <Share2 className={`${showSocial ? "text-white" : "text-teal-500"} ml-0.5 mt-0.5`}/>
        </div>

        {/* Social Icons Dropdown */}
        {showSocial && (   
          <div className={`absolute top-4 left-3 flex flex-col gap-2 bg-white shadow-lg p-2 rounded-full transition-all duration-1000 ease-out 
            ${showSocial ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[-20px] scale-95"}`}>
            <Twitter className="text-black cursor-pointer hover:text-[#00c7c4]" />
            <Facebook className="text-black cursor-pointer hover:text-[#00c7c4]" />
            <Instagram className="text-black cursor-pointer hover:text-[#00c7c4]" />
            <Linkedin className="text-black cursor-pointer hover:text-[#00c7c4]"/>
          </div>
        )}
      </div>
      {/* Name & Title */}
      <h2 className="mt-10 text-xl text-black font-semibold">{name}</h2>
      <p className="text-gray-400 font-semibold">{role}</p>
    </div>
  );
};

export default ProfileCard;