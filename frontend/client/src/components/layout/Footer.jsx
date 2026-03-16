import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-400 py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand & Description */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-white text-lg font-bold tracking-wider mb-6 uppercase">Lost & Found</h2>
          <p className="text-sm leading-relaxed mb-8 max-w-xs">
            Helping people reconnect with their lost belongings since 2025. Our mission is to build a trusted campus community for everyone.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Nitishkumar0517768"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nitish-kumar-03a34a3a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/Nitishkumar05cg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.youtube.com/@coding_by_Nitish"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-all duration-300"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-bold tracking-wider mb-6 uppercase text-sm">Quick Links</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/items" className="hover:text-emerald-500 transition-colors">Browse Items</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h2 className="text-white text-lg font-bold tracking-wider mb-6 uppercase text-sm">Help</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">FAQ</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-emerald-500 transition-colors">Safety Tips</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-white text-lg font-bold tracking-wider mb-6 uppercase text-sm">Newsletter</h2>
          <p className="text-sm mb-6">Subscribe to our newsletter for updates and tips.</p>
          <div className="flex bg-white/5 rounded-lg overflow-hidden p-1 border border-white/10">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none outline-none px-4 py-2 w-full text-white text-sm"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-10 px-6 rounded-md text-xs tracking-wider transition-colors shadow-lg shadow-emerald-500/20">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between text-xs gap-4">
        <p>© 2025 Lost & Found. All rights reserved.</p>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <span className="text-red-500">❤️</span>
          <span>in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
