import React from 'react';
import logo from '../../assets/logo/bike-zone-2.png'
import { Clock, Phone } from 'lucide-react';

const TopBanner: React.FC = () => {
  return (
    <div className="bg-flower-100 text-black dark:text-white py-1">
      <div className="max-w-7xl px-[5%] mx-auto flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto "
          />        
        </div>

        {/* Right side - Contact Info */}
        <div className="flex items-center space-x-4 text-sm">
          <div>
            <p className='flex'><Phone className='w-[16px] justify-center items-center me-1'/><span className='mt-[2px]'>Call us</span></p>
            <p className="font-semibold">+880188076466</p>
          </div>

          <div>
            <p className='flex'><Clock className='w-[16px] justify-center items-center me-1'/><span className='mt-[2px]'>Opening Hours</span></p>
            <p className="font-semibold">Sun-Thur: 7:00 - 17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
