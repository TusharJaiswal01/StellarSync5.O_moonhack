







// export default Navbar

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const features = [
    { name: "Membership", path: "membership" },
    { name: "Collaboration", path: "collaboration" },
    { name: "Leaderboard", path: "leaderboard" },
    { name: "Event Manager", path: "event-manager" },
    { name: "Fund Manager", path: "fund-manager" }
  ];
  

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{ zIndex: 50 }}
      id="nav"
      className="fixed top-0 left-0 w-full bg-transparent z-50 shadow-lg backdrop-blur-lg p-4"
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between">
        <div className="text-white font-bold text-2xl">
          <Link href="/">TechnoX(AI)</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="hidden md:flex gap-12">
          {[
            { name: "Home", path: "#" },
            { name: "About", path:"#about" },
          ].map((menu, idx) => (
            <Link key={idx} href={menu.path} className="text-white text-lg font-mediumf  hover:text-blue-300 transition">
              {menu.name}
            </Link>
          ))}

          <div className="relative">
            <button
           
              className="text-white text-lg hover:text-blue-300 transition flex items-center "
            >
              Features
              {
                dropdownOpen ?  <MdOutlineKeyboardArrowUp className="text-2xl text-white"    onClick={() => setDropdownOpen(!dropdownOpen)}/> 
                : <MdOutlineKeyboardArrowDown className="text-2xl text-white"    onClick={() => setDropdownOpen(!dropdownOpen)}/> 
              }
             
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40  shadow-lg rounded-md bg-gray-800 ">
            {features.map((feature, idx) => (
            <Link
           key={idx}
           href={`/features/${feature.path}`}
           className="block px-4 py-2 text-white hover:bg-blue-300 transition"
           onClick={() => setDropdownOpen(false)}
           >
           {feature.name}
             </Link>
           ))}
              </div>
            )}
          </div>

          <Link href="#contact" className="text-white text-lg hover:text-blue-300 transition">
            Contact
          </Link>
        </div>
      </div>

      <div
        className={`absolute left-0 top-[60px] w-full bg-black/80 transition-all ${
          menuOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {[
            { name: "Home", path: "/" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Collaboration", path: "/collaboration" },
            { name: "Automated Report", path: "/automatedreport" },
            { name: "Contact", path: "/contact" },
          ].map((menu, idx) => (
            <Link
              key={idx}
              href={menu.path}
              className="text-white text-lg py-2 hover:text-blue-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="fixed top-0 z-50 w-full bg-gradient-to-br from-purple-900 via-gray-900 to-black shadow-md">
//       <div className=" mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
//           <span className="p-2 bg-white/10 rounded-xl">CM</span>
//           <span>ClubManager</span>
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex space-x-6">
//           {[
//             { name: "Home", path: "/" },
//             { name: "Dashboard", path: "http://localhost:5173/" },
//             { name: "Collaboration", path: "/collaboration" },
//             { name: "Automated Report", path: "/automatedreport" },
//             { name: "Contact", path: "/contact" },
//           ].map((menu, idx) => (
//             <Link
//               key={idx}
//               href={menu.path}
//               className="text-white font-medium text-lg hover:text-blue-300 transition"
//             >
//               {menu.name}
//             </Link>
//           ))}
//         </nav>

//         {/* CTA Buttons */}
//         <div className="hidden md:flex gap-3">
//           <Link href="/login">
//             <button className="px-4 py-2 text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 transition">
//               Log in
//             </button>
//           </Link>
//           <Link href="/register">
//             <button className="px-4 py-2 text-white bg-purple-700 rounded-lg shadow-md hover:bg-purple-800 transition">
//               Register
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black/80 backdrop-blur-md absolute top-16 left-0 w-full p-6 text-center">
//           {[
//             { name: "Home", path: "/" },
//             { name: "Dashboard", path: "/dashboard" },
//             { name: "Automated Report", path: "/automatedreport" },
//             { name: "Collaboration", path: "/collaboration" },
//             { name: "Contact", path: "/contact" },
//           ].map((menu, idx) => (
//             <Link
//               key={idx}
//               href={menu.path}
//               className="block py-2 text-white text-lg transition hover:text-blue-300"
//             >
//               {menu.name}
//             </Link>
//           ))}
//           <div className="mt-4">
//             <Link href="/login">
//               <button className="w-full py-2 text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 transition">
//                 Log in
//               </button>
//             </Link>
//             <Link href="/register">
//               <button className="w-full mt-2 py-2 text-white bg-purple-700 rounded-lg shadow-md hover:bg-purple-800 transition">
//                 Register
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }