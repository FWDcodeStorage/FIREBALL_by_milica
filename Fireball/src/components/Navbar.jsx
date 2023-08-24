import Home from "./Home";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav className={`flex justify-between items-center py-[1em] mx-[2em] ${
            scrolled ? "bg-black" : "bg-transparent"
          } fixed left-0 right-0 top-0 font-extrabold text-[.8rem] text-white border-b-2 z-10`}>
            <div>
            <Link to="/" className="px-[0.5em]">FIREBALL</Link>
            </div>
            <div className="flex gap-6">
                <Link to="/" className="relative after:content-[''] after:absolute after:left-0 after:block hover:after:w-[1rem] after:h-[2px] after:bg-white uppercase text-[.7rem] text-white">home</Link>
                <Link to="/search" className="relative after:content-[''] after:absolute after:left-0 after:block hover:after:w-[1rem] after:h-[2px] after:bg-white uppercase text-[.7rem] text-white">search</Link>
                <Link to={Home} className="relative after:content-[''] after:absolute after:left-0 after:block hover:after:w-[1rem] after:h-[2px] after:bg-white uppercase text-[.7rem] text-white">blogs</Link>
            </div>
            
        </nav>
    );
}
 
export default Navbar;