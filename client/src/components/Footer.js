import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, AppleIcon, PlayIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">TehWiz</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base leading-relaxed">
              Pakistan's leading B2B e-commerce platform connecting businesses with trusted suppliers. 
              Find quality products, competitive prices, and reliable suppliers across Pakistan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Sports & Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download */}
        <div className="mt-8 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-2">Download TehWiz App</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">Get the best deals on your mobile device</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  <AppleIcon className="h-5 w-5" />
                  <span>App Store</span>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  <PlayIcon className="h-5 w-5" />
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2024 TehWiz. All rights reserved. | 
            Developed by <span className="text-blue-400 font-semibold">Saifullah Nazir</span> | 
            Made in Pakistan 🇵🇰
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Connecting Pakistani businesses with quality suppliers since 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 